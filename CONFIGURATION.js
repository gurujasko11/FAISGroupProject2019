var mysql = require('mysql');
dbconn = mysql.createConnection({
	user: 'root',
	password: '12345',
	database: 'Zespolowe'
});
dbconn.connect();

ENABLE_REGISTER_ADMIN_ROUTE = true; //true to enable
