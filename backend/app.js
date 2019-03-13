var express = require('express');
var bodyparser = require('body-parser');

//Para autenticación con token
var expressjwt = require('express-jwt');
var cors = require('cors');

var app = express();
app.use(cors());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


//Usar la libreria cors

app.use(expressjwt({ secret: 'secreto' })
    .unless({
        path: [
            '/auth/login'
        ]
    }));

var connection = require('./connection');

//Methods Gets
var routesGetsStudents = require('./Routes/Students.routes/gets-students-routes');
var routesGetsIndicators = require('./Routes/Indicators.routes/gets-indicators-routes');
var routesGetsCourses = require('./Routes/Courses.routes/gets-courses-routes');
var routesGetsGoals = require('./Routes/Goals.routes/gets-goals-routes');
var routesGetsEvaluations = require('./Routes/Evaluations.routes/gets-evaluations-routes');
var routesGetsActivities = require('./Routes/Activities.routes/gets-activities-routes');
var routesGetsGroups = require('./Routes/Groups.routes/gets-groups-routes');
var routesGetsStudentGroups = require('./Routes/StudentGroup.routes/gets-studentGroup-routes');
var routesGetsCourseIndicators = require('./Routes/CourseIndicator.routes/gets-CourseIndicators-routes');
var routesGetsGrades = require('./Routes/Grades.routes/gets-grades-routes');

var routesGetsVAsignaturaAvg = require('./Routes/VAsignaturaAvg/gets-vAsignaturaAvg-routes');
var routesGetsVAsignaturaClasificacion = require('./Routes/VAsignaturaClasificacion/gets-vAsignaturaClasificacion-routes');
var routesGetsVAsignaturaIndAvg = require('./Routes/VAsignaturaIndAvg/gets-vAsignaturaIndAvg-routes');
var routesGetsVIndicadorAvg = require('./Routes/VIndicadorAvg/gets-vIndicadorAvg-routes');
var routesGetsVIndicadorClasificacion = require('./Routes/VIndicadorClasificacion/gets-vIndicadorClasificacion-routes');
var routesGetsVIndicadorAsigAvg = require('./Routes/VIndicadorAsigAvg/gets-vIndicadorAsigAvg-routes');

var routesGetsVCompleteGrades = require('./Routes/VCompleteGrades/gets-vCompleteGrades-routes');
var routesGetsVDataVerification = require('./Routes/VDataVerification/gets-vDataVerification-routes');

//Authentication with token jwt
var routesLoginAuthentication = require('./Routes/Authentication.routes/login-authentication-routes')



//Methods Posts
var routesPostsStudents = require('./Routes/Students.routes/posts-students-routes');
var routesPostsStudentGroups = require('./Routes/StudentGroup.routes/posts-studentGroup-routes');
var routesPostsCourseIndicators = require('./Routes/CourseIndicator.routes/post-courseIndicators-routes');
var routesPostsEvaluations = require('./Routes/Evaluations.routes/posts-evaluations-routes');
var routesPostsActivities = require('./Routes/Activities.routes/posts-activities-routes');
var routesPostsGrades = require('./Routes/Grades.routes/posts-grades-routes');

//Methods Deletes

var routesDeleteGrades = require('./Routes/Grades.routes/deletes-grades-routes');
var routesDeleteStudentGroup = require('./Routes/StudentGroup.routes/deletes-studentGroup-router');


//Permisos de acceso al servidor manuales
// var cors = require('./cors');
// app.use(cors.permisos);


//Iniciar la conexion con la bd mysql
connection.start();
var routesLoginAuthentication = require('./Routes/Authentication.routes/login-authentication-routes')

//Methods Gets
routesGetsStudents.configure(app);
routesGetsIndicators.configure(app);
routesGetsCourses.configure(app);
routesGetsGoals.configure(app);
routesGetsEvaluations.configure(app);
routesGetsActivities.configure(app);
routesGetsGroups.configure(app);
routesGetsStudentGroups.configure(app);
routesGetsCourseIndicators.configure(app);
routesGetsGrades.configure(app);

routesGetsVAsignaturaAvg.configure(app);
routesGetsVAsignaturaClasificacion.configure(app);
routesGetsVAsignaturaIndAvg.configure(app);

routesGetsVIndicadorAvg.configure(app);
routesGetsVIndicadorClasificacion.configure(app);
routesGetsVIndicadorAsigAvg.configure(app);

routesGetsVCompleteGrades.configure(app);
routesGetsVDataVerification.configure(app);

// //Methods Pots
routesPostsStudents.configure(app);
routesPostsStudentGroups.configure(app);
routesPostsCourseIndicators.configure(app);
routesPostsEvaluations.configure(app);
routesPostsActivities.configure(app);
routesPostsGrades.configure(app);

//Methos Delete
routesDeleteGrades.configure(app);
routesDeleteStudentGroup.configure(app);

//Authentication with token jwt
routesLoginAuthentication.configure(app);


var server = app.listen(8077, function () {
    console.log("OK   begin with ", server.address().port);

})

