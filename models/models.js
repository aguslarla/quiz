var path = require('path');

// Postgres DATABASE_URL 	= postgres:/user:passwd@host:port/database
// SQLite DATABASE_URL		= sqlite://:@:/
var url= process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name	= 	(url[6]||null);
var user	=	(url[2]||null);
var pwd		=	(url[3]||null);
var protocol=	(url[1]||null);
var dialect	=	(url[1]||null);
var port	=	(url[5]||null);
var host	=	(url[4]||null);
var storage	=	process.env.DATABASE_STORAGE;

// Carga modelo ORM
var Sequelize = require('sequelize');

// Usar BD Sqlite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, {dialect : dialect
													,protocol: protocol
													,port: port
													,host: host
													,storage: storage // sólo SQLite (.env)
													,omitNull: true}); // sólo Postgres



// Importar la definición de la tabla Quiz en 'quiz.js'
var Quiz = Sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz;

// sequelize.sync crea e inicializa la tabla, en este caso de "preguntas", en la BD.
sequelize.sync().success(function(){
	//success ejecuta el manejador una vez creada
	Quiz.count().success(function (count){
		// Se inicializa sólo si está vacía
		if (count === 0){
			Quiz.create({pregunta: 'Capital de Italia', 
						respuesta: 'Roma'});
			 Quiz.create({pregunta: 'Capital de Portugal', 
						respuesta: 'Lisboa'});
		};
	});
});
