var db = require('../../Queries/Students.queries/deletes-students');

function http() {
    this.configure = function (app) {

        app.delete('/estudiantes/:id/', function (request, response) {
            db.delete(request.params.id, response);
        })

    }
}

module.exports = new http();