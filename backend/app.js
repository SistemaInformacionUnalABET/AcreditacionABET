var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

var connection = require('./connection');

//Methods Gets
var routesGetsStudents = require('./Routes/Students.routes/gets-students-routes');
var routesGetsIndicators = require('./Routes/Indicators.routes/gets-indicators-routes');
var routesGetsCourses =  require('./Routes/Courses.routes/gets-courses-routes');
var routesGetsGoals = require('./Routes/Goals.routes/gets-goals-routes');
var routesGetsEvaluations = require('./Routes/Evaluations.routes/gets-evaluations-routes');
var routesGetsActivities = require('./Routes/Activities.routes/gets-activities-routes');
var routesGetsGroups = require('./Routes/Groups.routes/gets-groups-routes');
var routesGetsStudentGroups = require('./Routes/StudentGroup.routes/gets-studentGroup-routes');
var routesGetsCourseIndicators = require('./Routes/CourseIndicator.routes/gets-CourseIndicators-routes');
var routesGetsGrades = require('./Routes/Grades.routes/gets-grades-routes');

var routesGetsVCompleteGrades = require('./Routes/VCompleteGrades/gets-vCompleteGrades-routes');
var routesGetsVDataVerification = require('./Routes/vDataVerification/gets-vDataVerification-routes');





//Methods Posts
var routesPostsStudents = require('./Routes/Students.routes/posts-students-routes');
var routesPostsStudentGroups = require('./Routes/StudentGroup.routes/posts-studentGroup-routes');
var routesPostsCourseIndicators = require('./Routes/CourseIndicator.routes/post-courseIndicators-routes');
var routesPostsEvaluations = require('./Routes/Evaluations.routes/posts-evaluations-routes');
var routesPostsActivities = require('./Routes/Activities.routes/posts-activities-routes');
var routesPostsGrades = require('./Routes/Grades.routes/posts-grades-routes');


// var routesPostsIndicators = require('./Routes/Indicators.routes/posts-indicators-routers');
// var routesPostsCommons = require('./Routes/Commons.routes/posts-commons-routes');


//Methods Puts
// var routesPutsStudents = require('./Routes/Students.routes/puts-students-routes');

//Methods Delete
// var routesDeletesStudents = require('./Routes/Students.routes/deletes-students-routes');


///LA PRUEBA LECTURA>
//lectura 
//**var routesLectura = require('./Business/read-files');

//////PRUEBA



var cors = require('./cors');

app.use(cors.permisos);


//Iniciar la conexion con la bd mysql
connection.start();

//Methods Gets
routesGetsStudents.configure(app);
routesGetsIndicators.configure(app);
routesGetsCourses.configure(app);
// routesGetsVGrades.configure(app);
// routesGetsCommons.configure(app);
routesGetsGoals.configure(app);
routesGetsEvaluations.configure(app);
routesGetsActivities.configure(app);
routesGetsGroups.configure(app);
routesGetsStudentGroups.configure(app);
routesGetsCourseIndicators.configure(app);
routesGetsGrades.configure(app);

routesGetsVCompleteGrades.configure(app);
routesGetsVDataVerification.configure(app);


//Methods Pots
routesPostsStudents.configure(app);
routesPostsStudentGroups.configure(app);
routesPostsCourseIndicators.configure(app);
routesPostsEvaluations.configure(app);
routesPostsActivities.configure(app);
routesPostsGrades.configure(app);


// routesPostsIndicators.configure(app);
// routesPostsCommons.configure(app);

//Methods Puts
// routesPutsStudents.configure(app);

//Methods Deletes
// routesDeletesStudents.configure(app);


///PRUEBA>
////LEER
//***routesLectura.configure(app);
///PRUEBA>
////LEER

var server = app.listen(8000, function(){
    console.log("Escuchando en el puerto ", server.address().port);
})