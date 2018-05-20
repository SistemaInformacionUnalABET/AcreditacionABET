var db = require('../../Queries/VGradesComplete/gets-vCompleteGrades');

function http() {
    this.configure = function (app) {

        app.get('/vCompleteGrades/', function (request, response) {
            db.selectQuery(request.query, response);

        })
 
    }
}

module.exports = new http();