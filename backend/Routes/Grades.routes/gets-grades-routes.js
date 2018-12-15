var db = require('../../Queries/Grades.queries/gets-grades');

function http() {
    this.configure = function (app) {

        app.get('/grades/', function (request, response) {
            db.selectQuery(request.query, response);

        })
 
    }
}

module.exports = new http();