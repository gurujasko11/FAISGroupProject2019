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
        return res.render('admin/team_edit', { page: getPageVariable(req), title: 'Drużyny', flash_messages: req.flash("FLASH_MSG"), details: rows[0] });
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
    return res.render('admin/team_add', { page: getPageVariable(req), title: 'Drużyny', flash_messages: req.flash("FLASH_MSG"), teams: undefined });
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
        if(err)
        {
            console.log(err);
            req.flash('FLASH_MSG', ['ERROR', 'Przepraszamy, wystąpił błąd po stronie serwera']);
            return res.render('admin/teams', { page: getPageVariable(req), title: 'Drużyny', flash_messages: req.flash("FLASH_MSG"), teams: undefined });
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
        return res.render('admin/user_edit', { page: getPageVariable(req), title: 'Użytkownicy', flash_messages: req.flash("FLASH_MSG"), user_data: rows[0] });
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




function generateSQLString(password, first_name, last_name, email, telephone) {
    var query = '';
    if (password != '') query += " haslo='" + password + "'";
    if (first_name != '') query += sqlCommaHelper(query) + " imie='" + first_name + "'";
    if (last_name != '') query += sqlCommaHelper(query) + " nazwisko='" + last_name + "'";
    if (email != '') query += sqlCommaHelper(query) + " email='" + email + "'";
    if (telephone != '') query += sqlCommaHelper(query) + " telefon='" + telephone + "'";
    return query;
}

function sqlCommaHelper(query) {
    if (query == '') return '';
    return ',';
}

module.exports = router;