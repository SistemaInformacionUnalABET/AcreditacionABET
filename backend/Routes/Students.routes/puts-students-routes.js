var db = require('../../Queries/Students.queries/puts-students');

function http() {
    this.configure = function (app) {

        app.put('/estudiantes/', function (request, response) {
            db.update(request.body, response);
        })

    }
}

module.exports = new http();