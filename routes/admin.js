var express = require('express');
var router = express.Router();
var passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
var indexModule = require('./index');
var authenticationModule = require('./authentication');
var authenticatedAdminOnly = authenticationModule.authenticatedAdminOnly;
var notAuthenticatedOnly = authenticationModule.notAuthenticatedOnly;
var getPageVariable = indexModule.getPageVariable;


function handleError(req, res, err, redirectTo)
{
    if(err)
    {
        console.log(err);
        req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
        res.redirect(redirectTo);
        return 1;
    }
    return undefined;
}

function handleEmptySet(req, res, rows, errMessage, redirectTo)
{
    if(!rows.length)
    {
        req.flash('FLASH_MSG', ['ERROR', errMessage]);
        res.redirect(redirectTo);
        return 1;
    }
    return undefined;
}

function handleDupEntry(req, res, err, errMsg, redirectTo)
{
    if(err && err.errno == 1062)
    {
        req.flash('FLASH_MSG', ['ERROR', errMsg]);
        res.redirect(redirectTo);
        return 1;
    }
    return undefined;
}

function handleReferenceError(req, res, err, errMsg, redirectTo)
{
    if(err && err.errno == 1451)
    {
        req.flash('FLASH_MSG', ['ERROR', errMsg]);
        res.redirect(redirectTo);
        return 1;
    }
    return undefined;
}

router.get('/login', notAuthenticatedOnly, function(req,res)
{
    res.render('admin/login', { page: getPageVariable(req), title: 'Zaloguj jako admin', flash_messages: req.flash("FLASH_MSG") });
});

router.post('/login', notAuthenticatedOnly, 
    passport.authenticate('admin', {
        failureRedirect: '/admin/login',
        failureFlash: true
    }),
    function (req, res, next) {
        req.flash('FLASH_MSG', ['SUCCESS', 'Zalogowano admina pomyślnie']);
        res.redirect('/admin');
    }
);

if(ENABLE_REGISTER_ADMIN_ROUTE && ENABLE_REGISTER_ADMIN_ROUTE === true)
{
    router.get('/register', notAuthenticatedOnly, function(req,res)
    {
        res.render('admin/register', { page: getPageVariable(req), title: 'Zarejestruj admina', flash_messages: req.flash("FLASH_MSG") });
    });
    router.post('/register', notAuthenticatedOnly, function (req, res, next) {
        var password = req.body.password.replace("'", "''");
        var email = req.body.email.replace("'", "''");
        dbconn.query('SELECT * FROM Admin where email = \'' + email + '\'', function(err, rows)
        {
            if(err)
            {
                console.log(err);
                req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
                return res.redirect('/admin/register');
            }
            if(rows.length)
            {
                req.flash('FLASH_MSG', ['ERROR', 'Ten adres e-mail jest już zajęty']);
                return res.redirect('/admin/register');
            }
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                {
                    if(err)
                    {
                        console.log(err);
                        req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
                        return res.redirect('/admin/register');
                    }
                    dbconn.query('insert into Admin(email, haslo) values (\'' + email + "', '" + hash + "')", function(err, rows)
                    {
                        if(err)
                        {
                            console.log(err);
                            req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
                            return res.redirect('/admin/register');
                        }
                        req.flash('FLASH_MSG', ['SUCCESS', 'Zarejestrowano pomyślnie']);
                        return res.redirect('/admin/login');
                    });
                }});
            });
        });
    });
}

router.get('/', authenticatedAdminOnly, function(req,res)
{
    res.redirect('/');
});

router.get('/teams', authenticatedAdminOnly, function(req, res)
{
    dbconn.query('SELECT * FROM Druzyny', function(err, rows)
    {
        if(err)
        {
            console.log(err);
            req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
            return res.render('admin/teams', { page: getPageVariable(req), title: 'Drużyny', flash_messages: req.flash("FLASH_MSG"), teams: undefined });
        }
        return res.render('admin/teams', { page: getPageVariable(req), title: 'Drużyny', flash_messages: req.flash("FLASH_MSG"), teams: rows });
    });
});

router.get('/teams/edit/:id', authenticatedAdminOnly, function(req, res)
{
    dbconn.query('SELECT * FROM Druzyny where id_druzyny=' + req.params.id, function(err, rows)
    {
        if(err)
        {
            console.log(err);
            req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
            return res.redirect('/admin/teams');
        }
        if(!rows.length)
        {
            req.flash('FLASH_MSG', ['ERROR', 'Nie znaleziono podanej drużyny']);
            return res.redirect('/admin/teams');
        }
        return res.render('admin/team_edit', { page: getPageVariable(req), title: 'Drużyna', flash_messages: req.flash("FLASH_MSG"), details: rows[0] });
    });
});

router.post('/teams/edit/:id', authenticatedAdminOnly, function(req, res)
{
    if(!req.body.name)
    {
        console.log(err);
        req.flash('FLASH_MSG', ['ERROR', 'Nie podano nazwy drużyny']);
        return res.redirect('/admin/teams/edit/' + req.params.id);
    }
    dbconn.query('UPDATE Druzyny set nazwa_druzyny=\'' + req.body.name.replace("'", "''") + "' where id_druzyny=" + req.params.id, function(err, rows)
    {
        if(handleDupEntry(req, res, err, 'Przepraszamy, ta drużyna już istnieje, nazwy drużyn muszą być unikalne', '/admin/teams/edit/' + req.params.id)) return;
        if(err)
        {
            console.log(err);
            req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
            return res.redirect('/admin/teams/edit/' + req.params.id);
        }
        req.flash("FLASH_MSG", ["SUCCESS", "Zmieniono nazwę drużyny pomyślnie"]);
        return res.redirect("/admin/teams");
    });
});

router.get('/teams/delete/:id', authenticatedAdminOnly, function(req, res)
{
    dbconn.query('SELECT * FROM Druzyny where id_druzyny=' + req.params.id, function(err, rows)
    {
        if(err)
        {
            console.log(err);
            req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
            return res.redirect('/admin/teams');
        }
        if(!rows.length)
        {
            req.flash('FLASH_MSG', ['ERROR', 'Podana drużyna nie istnieje']);
            return res.redirect('/admin/teams');
        }
        dbconn.query('DELETE FROM Druzyny where id_druzyny=' + req.params.id, function(err, rows)
        {
            if(handleReferenceError(req, res, err, 'Ta drużyna jest używana w meczach, usuń najpierw wszystkie mecze wykorzystujące tą drużynę', '/admin/teams')) return;
            if(err)
            {
                console.log(err);
                req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
                return res.redirect('/admin/teams');
            }
            req.flash('FLASH_MSG', ['SUCCESS', 'Usunięto drużynę pomyślnie']);
            return res.redirect('/admin/teams');
        });
    });
});

router.get('/teams/add', authenticatedAdminOnly, function(req, res)
{
    return res.render('admin/team_add', { page: getPageVariable(req), title: 'Drużyny', flash_messages: req.flash("FLASH_MSG") });
});

router.post('/teams/add', authenticatedAdminOnly, function(req, res)
{
    if(!req.body.name)
    {
        console.log(err);
        req.flash('FLASH_MSG', ['ERROR', 'Nie podano nazwy drużyny']);
        return res.redirect('/admin/teams/add');
    }
    dbconn.query('INSERT INTO Druzyny(nazwa_druzyny) VALUES (\'' + req.body.name.replace("'", "''") + "');", function(err, rows)
    {
        if(handleDupEntry(req, res, err, 'Przepraszamy, ta drużyna z tą nazwą już istnieje, nazwy drużyn muszą być unikalne', '/admin/teams')) return;
        if(err)
        {
            console.log(err);
            req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
            return res.redirect('/admin/teams');
        }
        req.flash('FLASH_MSG', ['SUCCESS', 'Dodano drużynę pomyślnie']);
        return res.redirect('/admin/teams');
    });
});

router.get('/users', authenticatedAdminOnly, function(req, res)
{
    dbconn.query("SELECT * FROM Uzytkownicy", function(err, rows)
    {
        if(err)
        {
            console.log(err);
            req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
            return res.render('admin/users', { page: getPageVariable(req), title: 'Użytkownicy', flash_messages: req.flash("FLASH_MSG"), users: undefined });
        }
        return res.render('admin/users', { page: getPageVariable(req), title: 'Użytkownicy', flash_messages: req.flash("FLASH_MSG"), users: rows });
    });
});

router.get('/user/edit/:id', authenticatedAdminOnly, function(req, res)
{
    dbconn.query("SELECT * FROM Uzytkownicy WHERE id_uzytkownika=" + req.params.id, function(err, rows)
    {
        if(err)
        {
            console.log(err);
            req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
            return res.redirect('/admin/users');
        }
        if(!rows.length)
        {
            req.flash('FLASH_MSG', ['ERROR', 'Nie znaleziono podanego użytkownika w bazie']);
            return res.redirect('/admin/users');
        }
        return res.render('admin/user_edit', { page: getPageVariable(req), title: 'Użytkownik', flash_messages: req.flash("FLASH_MSG"), user_data: rows[0] });
    });
});

router.post('/user/edit/:id', authenticatedAdminOnly, function(req, res)
{
    var telephone = req.body.telephone.replace("'", "''");
    var password = req.body.password.replace("'", "''");
    var email = req.body.email.replace("'", "''");
    var first_name = req.body.first_name.replace("'", "''");
    var last_name = req.body.last_name.replace("'", "''");
    
    dbconn.query("SELECT * FROM Uzytkownicy where id_uzytkownika=" + req.params.id, function(err, rows)
    {
        if(err)
        {
            console.log(err);
            req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
            return res.redirect('/admin/users');
        }
        if(!rows.length)
        {
            req.flash('FLASH_MSG', ['ERROR', 'Nie znaleziono podanego użytkownika w bazie']);
            return res.redirect('/admin/users');
        }
        if(rows[0].email == email) email = '';

        if(password)
        {
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                {
                    if(handleDupEntry(req, res, err, 'Przepraszamy, ten adres e-mail jest już zajęty', '/admin/user/edit/' + req.params.id)) return;
                    if(err)
                    {
                        console.log(err);
                        req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
                        return res.redirect('/admin/users');
                    }
                    var updatedString = generateSQLString(password, first_name, last_name, email, telephone);
                    if(updatedString == '') {
                        req.flash('FLASH_MSG', ['INFO', 'Brak zmian']);
                        res.redirect('/admin/user/edit/' + req.params.id);
                    }
                    var query = "update Uzytkownicy set " + updatedString + " where id_uzytkownika=" + req.params.id;
                    dbconn.query(query, function(err, rows)
                    {
                        if(err)
                        {
                            console.log(err);
                            req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
                            return res.redirect('/admin/users');
                        }
                        req.flash('FLASH_MSG', ['SUCCESS', 'Zmieniono dane pomyślnie']);
                        return res.redirect('/admin/users');
                    });
                }});
            });
        } else {
            var updatedString = generateSQLString(password, first_name, last_name, email, telephone);
            if(updatedString == '') {
                req.flash('FLASH_MSG', ['INFO', 'Brak zmian']);
                res.redirect('/admin/user/edit/' + req.params.id);
            }
            var query = "update Uzytkownicy set " + updatedString + " where id_uzytkownika=" + req.params.id;
            dbconn.query(query, function(err, rows)
            {
                if(handleDupEntry(req, res, err, 'Przepraszamy, ten adres e-mail jest już zajęty', '/admin/user/edit/' + req.params.id)) return;
                if(err)
                {
                    console.log(err);
                    req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
                    return res.redirect('/admin/users');
                }
                req.flash('FLASH_MSG', ['SUCCESS', 'Zmieniono dane pomyślnie']);
                return res.redirect('/admin/users');
            });
        }
    }); 
});

router.post('/user/delete/:id', authenticatedAdminOnly, function(req, res)
{
    dbconn.query('SELECT * FROM Uzytkownicy where id_uzytkownika=' + req.params.id, function(err, rows)
    {
        if(err)
        {
            console.log(err);
            req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
            return res.redirect('/admin/users');
        }
        if(!rows.length)
        {
            req.flash('FLASH_MSG', ['ERROR', 'Podany użytkownik nie istnieje']);
            return res.redirect('/admin/users');
        }
        dbconn.query('DELETE FROM Uzytkownicy where id_uzytkownika=' + req.params.id, function(err, rows)
        {
            if(err)
            {
                console.log(err);
                req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
                return res.redirect('/admin/users');
            }
            req.flash('FLASH_MSG', ['SUCCESS', 'Usunięto użytkownika pomyślnie']);
            return res.redirect('/admin/users');
        });
    });
});

router.get('/user/activate/:id', authenticatedAdminOnly, function(req, res)
{
    dbconn.query("UPDATE Uzytkownicy SET status='activated' WHERE id_uzytkownika=" + req.params.id, function(err, rows)
    {
        if(err)
        {
            console.log(err);
            req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
            return res.redirect('/admin/user/edit/' + req.params.id);
        }
        req.flash('FLASH_MSG', ['SUCCESS', 'Pomyślnie aktywowano konto użytkownika']);
        return res.redirect('/admin/user/edit/' + req.params.id);
    });
});

router.get('/bars', authenticatedAdminOnly, function(req, res)
{
    dbconn.query('SELECT * FROM Bary', function(err, rows)
    {
        if(err)
        {
            console.log(err);
            req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
            return res.render('admin/bars', { page: getPageVariable(req), title: 'Bary', flash_messages: req.flash("FLASH_MSG"), bars: undefined });
        }
        return res.render('admin/bars', { page: getPageVariable(req), title: 'Bary', flash_messages: req.flash("FLASH_MSG"), bars: rows });
    });
});

router.get('/bar/edit/:id', authenticatedAdminOnly, function(req, res)
{
    dbconn.query("SELECT * FROM Bary WHERE id_baru=" + req.params.id, function(err, rows)
    {
        if(handleError(req, res, err, 'admin/bars')) return;
        if(handleEmptySet(req, res, rows, 'Nie znaleziono podanego bara w bazie', '/admin/bars')) return;
        return res.render('admin/bar_edit', { page: getPageVariable(req), title: 'Bar', flash_messages: req.flash("FLASH_MSG"), bar_data: rows[0] });
    });
});

router.post('/bar/edit/:id', authenticatedAdminOnly, function(req, res)
{
    var bar_id = req.params.id.replace("'", "''");
    var bar_name = req.body.bar_name.replace("'", "''");
    var telephone = req.body.telephone.replace("'", "''");
    var city = req.body.city.replace("'", "''");
    var street = req.body.street.replace("'", "''");
    var building_number = req.body.building_number.replace("'", "''");
    var local_number = req.body.local_number.replace("'", "''");
    var password = req.body.password.replace("'", "''");
    var email = req.body.email.replace("'", "''");
    

    validateCityInDB(city).then(function (value) {
        updateBarInDB(bar_id, password, bar_name, telephone, city, street, building_number, local_number, email, res, req);
    }, (reason) => { //dodanie miasta sie nie powiodlo
        console.log("[/bar/edit/:id.validateCityInDB] SQL_ERROR: " + reason);
        req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
        res.redirect('/admin/bar/edit/' + bar_id);
        return;
    });
});


function validateCityInDB(city) {
    return new Promise(function (resolve, reject) {
        dbconn.query("select * from Miasta where miasto = '" + city + "'", function (err, rows) {
            if (err) {
                console.log("[validateCityInDB] query: " + "select * from Miasta where miasto = '" + city + "'" + "\n --> ERR: " + err);
                reject(err);
                return;
            }
            if (!rows.length) {
                dbconn.query("insert into Miasta (miasto) values ('" + city + "')", function (err, rows) {
                    if (err) {
                        console.log("[validateCityInDB] query: " + "insert into Miasta (miasto) values ('" + city + "')" + "\n --> ERR: " + err);
                        reject(err);
                    }
                });
            }
            resolve();
        });
    });
}

function updateBarInDB(bar_id, password, bar_name, telephone, city, street, building_number, local_number, email, res, req) {
    const saltRounds = 10;
    if(password)
    {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                dbconn.query('SELECT * FROM Bary WHERE id_baru = ' + bar_id, function(err, rows)
                {
                    if(handleDupEntry(req, res, err, 'Przepraszamy, ten adres e-mail jest już zajęty', '/admin/bar/edit/' + bar_id)) return;
                    if(handleError(req, res, err, '/admin/bars')) return;
                    if(handleEmptySet(req, res, rows, 'Nie znaleziono podanego baru', '/admin/bars')) return;
                    var generatedSQLString = generateSQLStringUpdateBary(
                        {"id_baru": bar_id, "nazwa_baru": bar_name, "telefon": telephone, "miasto": city, "ulica": street, "numer_budynku": building_number, "numer_lokalu": local_number, "haslo": hash, "email": email}, 
                        rows[0]);
                    if(generatedSQLString == '') {
                        req.flash('FLASH_MSG', ['INFO', 'Brak zmian']);
                        return res.redirect('/admin/bar/edit/' + bar_id);
                    }
                    var query = "UPDATE Bary SET " + generatedSQLString + " WHERE id_baru = " + bar_id;
                    dbconn.query(query, function (err, rows) {
                        if(handleError(req, res, err, '/admin/bar/edit/'+bar_id)) return;
                        req.flash('FLASH_MSG', ['SUCCESS', 'Pomyślnie zmieniono dane']);
                        res.redirect('/admin/bar/edit/' + bar_id);
                    });
                });
            });
        });
    }
    else
    {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                dbconn.query('SELECT * FROM Bary WHERE id_baru = ' + bar_id, function(err, rows)
                {
                    if(handleDupEntry(req, res, err, 'Przepraszamy, ten adres e-mail jest już zajęty', '/admin/bar/edit/' + bar_id)) return;
                    if(handleError(req, res, err, '/admin/bars')) return;
                    if(handleEmptySet(req, res, rows, 'Nie znaleziono podanego baru', '/admin/bars')) return;
                    var generatedSQLString = generateSQLStringUpdateBary(
                        {"id_baru": bar_id, "nazwa_baru": bar_name, "telefon": telephone, "miasto": city, "ulica": street, "numer_budynku": building_number, "numer_lokalu": local_number, "haslo": "", "email": email}, 
                        rows[0]);
                    if(generatedSQLString == '') {
                        req.flash('FLASH_MSG', ['INFO', 'Brak zmian']);
                        return res.redirect('/admin/bar/edit/' + bar_id);
                    }
                    var query = "UPDATE Bary SET " + generatedSQLString + " WHERE id_baru = " + bar_id;
                    dbconn.query(query, function (err, rows) {
                        if(handleError(req, res, err, '/admin/bar/edit/'+bar_id)) return;
                        req.flash('FLASH_MSG', ['SUCCESS', 'Pomyślnie zmieniono dane']);
                        res.redirect('/admin/bar/edit/' + bar_id);
                    });
                });
            });
        });
    }
}

router.post('/bar/delete/:id', authenticatedAdminOnly, function(req, res)
{
    dbconn.query('SELECT * FROM Bary where id_baru=' + req.params.id, function(err, rows)
    {
        if(err)
        {
            console.log(err);
            req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
            return res.redirect('/admin/bars');
        }
        if(!rows.length)
        {
            req.flash('FLASH_MSG', ['ERROR', 'Podany bar nie istnieje']);
            return res.redirect('/admin/bars');
        }
        dbconn.query('DELETE FROM Bary where id_baru=' + req.params.id, function(err, rows)
        {
            if(handleReferenceError(req, res, err, 'Usunięcie się nie powiodło, ponieważ bar rozgrywa mecze, wpierw usuń wszystkie mecze z baru', '/admin/bars')) return;
            if(err)
            {
                console.log(err);
                req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
                return res.redirect('/admin/users');
            }
            req.flash('FLASH_MSG', ['SUCCESS', 'Usunięto użytkownika pomyślnie']);
            return res.redirect('/admin/users');
        });
    });
});

router.get('/bar/activate/:id', authenticatedAdminOnly, function(req, res)
{
    dbconn.query("UPDATE Bary SET status='activated' WHERE id_baru=" + req.params.id, function(err, rows)
    {
        if(handleError(req, res, err, '/admin/bar/edit/' + req.params.id)) return;
        req.flash('FLASH_MSG', ['SUCCESS', 'Pomyślnie aktywowano konto użytkownika']);
        return res.redirect('/admin/bar/edit/' + req.params.id);
    });
});



function generateSQLString(password, first_name, last_name, email, telephone) {
    var query = '';
    if (password != '') query += " haslo='" + password + "'";
    if (first_name != '') query += sqlCommaHelper(query) + " imie='" + first_name + "'";
    if (last_name != '') query += sqlCommaHelper(query) + " nazwisko='" + last_name + "'";
    if (email != '') query += sqlCommaHelper(query) + " email='" + email + "'";
    if (telephone != '') query += sqlCommaHelper(query) + " telefon='" + telephone + "'";
    return query;
}

function generateSQLStringUpdateBary(newData, oldData)
{
    //{"id_baru": bar_id, "nazwa_baru": bar_name, "telefon": telephone, "miasto": city, "ulica": street, "numer_budynku": building_number, "numer_lokalu": local_number, "haslo": password, "email": email}, 
    var query = "";
    if(oldData.nazwa_baru != newData.nazwa_baru) query += " nazwa_baru='" + newData.nazwa_baru + "' ";
    if(oldData.telefon != newData.telefon) query += sqlCommaHelper(query) + " telefon='" + newData.telefon + "' ";
    if(oldData.miasto != newData.miasto) query += sqlCommaHelper(query) + " miasto='" + newData.miasto + "' ";
    if(oldData.ulica != newData.ulica) query += sqlCommaHelper(query) + " ulica='" + newData.ulica + "' ";
    if(oldData.numer_budynku != newData.numer_budynku) query += sqlCommaHelper(query) + " numer_budynku='" + newData.numer_budynku + "' ";
    if(oldData.numer_lokalu != newData.numer_lokalu) query += sqlCommaHelper(query) + " numer_lokalu='" + newData.numer_lokalu + "' ";
    if(newData.haslo != "") query += sqlCommaHelper(query) + " haslo='" + newData.haslo + "' ";
    if(oldData.email != newData.email) query += sqlCommaHelper(query) + " email='" + newData.email + "' ";
    return query;
}

function sqlCommaHelper(query) {
    if (query == '') return '';
    return ',';
}

module.exports = router;