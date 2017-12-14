var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

var connection = require('./connection');
//Methods Gets
var routesGetsStudents = require('./Routes/Students.routes/gets-students-routes');
var routesGetsIndicators = require('./Routes/Indicators.routes/gets-indicators-routes');

//Methods Posts
var routesPostsStudents = require('./Routes/Students.routes/posts-students-routes');

//Methods Puts
var routesPutsStudents = require('./Routes/Students.routes/puts-students-routes');

//Iniciar la conexion con la bd mysql
connection.start();

//Methods Gets
routesGetsStudents.configure(app);
routesGetsIndicators.configure(app);

//Methods Pots
routesPostsStudents.configure(app);

//Methods Puts
routesPutsStudents.configure(app);


var server = app.listen(8000, function(){
    console.log("Escuchando en el puerto ", server.address().port);
})