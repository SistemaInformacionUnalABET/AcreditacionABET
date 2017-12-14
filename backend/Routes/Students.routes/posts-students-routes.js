var db = require('../../Queries/Students.queries/posts-students');

function http() {
    this.configure = function (app) {

        app.post('/estudiantes/', function (request, response) {
            db.insert(request.body, response);
        })



    }
}

module.exports = new http();