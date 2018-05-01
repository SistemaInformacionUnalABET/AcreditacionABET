var db = require('../../Queries/Students.queries/gets-students');

function http() {
    this.configure = function (app) {

        app.get('/students/', function (request, response) {
            db.selectQuery(request.query, response);
            // console.log("CLASE ",db.getPol(3, 4).alto)
        })
 

        // app.get('/estudiantes/id/',function(request, response){
        //     db.selectById(request.query, response);
        // })

        // app.get('/estudiantes/doc/:document/',function(request, response){
        //     db.selectByDocument(request.params.document, response);
        // })

        // app.get('/estudiantes/email/:email/',function(request, response){
        //     db.selectByEmail(request.params.email, response);
        // })

        // app.get('/estudiantes/name/:name/',function(request, response){
        //     db.selectByName(request.params.name, response);
        // })
    }
}

module.exports = new http();