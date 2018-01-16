var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

var connection = require('./connection');
//Methods Gets
var routesGetsStudents = require('./Routes/Students.routes/gets-students-routes');
var routesGetsIndicators = require('./Routes/Indicators.routes/gets-indicators-routes');
var routesGetsVGrades = require('./Routes/Grades.routes/gets-grades-routes');

//Methods Posts
var routesPostsStudents = require('./Routes/Students.routes/posts-students-routes');
var routesPostsIndicators = require('./Routes/Indicators.routes/posts-indicators-routers');

//Methods Puts
var routesPutsStudents = require('./Routes/Students.routes/puts-students-routes');

//Methods Delete
var routesDeletesStudents = require('./Routes/Students.routes/deletes-students-routes');


///LA PRUEBA LECTURA>
//lectura 
var routesLectura = require('./Business/read-files');

//////PRUEBA


//Iniciar la conexion con la bd mysql
connection.start();

//Methods Gets
routesGetsStudents.configure(app);
routesGetsIndicators.configure(app);
routesGetsVGrades.configure(app);

//Methods Pots
routesPostsStudents.configure(app);
routesPostsIndicators.configure(app);


//Methods Puts
routesPutsStudents.configure(app);

//Methods Deletes
routesDeletesStudents.configure(app);


///PRUEBA>
////LEER
routesLectura.configure(app);
///PRUEBA>
////LEER

var server = app.listen(8000, function(){
    console.log("Escuchando en el puerto ", server.address().port);
})