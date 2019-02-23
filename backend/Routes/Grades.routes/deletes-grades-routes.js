var db = require('../../Queries/Grades.queries/deletes-grades');

function http() {
    this.configure = function (app) {

        app.delete('/gradeList/', function (request, response) {
            db.delete(request.query, response);
        })
 
    }
}

module.exports = new http();