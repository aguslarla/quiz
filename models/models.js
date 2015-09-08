var path = require('path');

// Postgres DATABASE_URL 	= postgres:/user:passwd@host:port/database
// Variable DATABASE_URL en HEROKU ---> postgres://esjqhcdsxqtkfv:ZqMDnGeas-6892wrpl-JFXhwez@ec2-54-217-202-108.eu-west-1.compute.amazonaws.com:5432/drtgkmjqh71so
// SQLite DATABASE_URL		= sqlite://:@:/
//var url= process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
/*var DB_name	= 	(url[6]|null);
var user	=	(url[2]||null);
var pwd		=	(url[3]||null);
var protocol=	(url[1]||null);
var dialect	=	(url[1]||null);
var port	=	(url[5]||null);
var host	=	(url[4]||null);

/*var DB_name	= 	"drtgkmjqh71so";				 
var user	=	"esjqhcdsxqtkfv";				 
var pwd		=	"ZqMDnGeas-6892wrpl-JFXhwez";				 
var protocol=	"postgres";
var dialect	=	"postgres";
var port	=	5432;
var host	=	"ec2-54-217-202-108.eu-west-1.compute.amazonaws.com";
	*/			 

var storage	=	"quiz.sqlite";
console.log("models.js storage "+storage);

// Carga modelo ORM
console.log("Require sequelize");
var Sequelize = require('sequelize');

// Usar BD Sqlite o Postgres
/*var sequelize = new Sequelize(DB_name, user, pwd, {dialect : dialect,
													protocol: protocol,
													port: port,
													host: host,
													storage: storage, // sólo SQLite (.env)
													omitNull: true}); // sólo Postgres
*/
var sequelize = new Sequelize(null, null, null, {dialect : "sqlite",
							storage: "quiz.sqlite"}); // sólo Postgres


// Importar la definición de la tabla Quiz en 'quiz.js'
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);
exports.Quiz = Quiz;

console.log("models.js Aqui llega 1");
// sequelize.sync crea e inicializa la tabla, en este caso de "preguntas", en la BD.
/*sequelize.sync().success(function(){
	console.log("models.js Aqui llega 2");
	//success ejecuta el manejador una vez creada
	Quiz.count().success(function (count){
		// Se inicializa sólo si está vacía
		if (count === 0){
			Quiz.create({pregunta: 'Capital de Italia', 
						respuesta: 'Roma'});
			Quiz.create({pregunta: 'Capital de Portugal', 
						respuesta: 'Lisboa'})
			.then(function(){console.log("base de datos inicializada")});
		};
	});
});
*/
sequelize.sync().then(function(){
	console.log("models.js Aqui llega 2");
	//success ejecuta el manejador una vez creada
	Quiz.count().then(function (count){
		// Se inicializa sólo si está vacía
		if (count === 0){
			Quiz.create({pregunta: 'Capital de Italia', 
						respuesta: 'Roma'});
			Quiz.create({pregunta: 'Capital de Portugal', 
						respuesta: 'Lisboa'})
			.then(function(){console.log("base de datos inicializada")});
		};
	});
});
