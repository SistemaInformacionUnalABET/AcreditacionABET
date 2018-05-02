var db = require('../../Queries/CourseIndicators.queries/gets-courseIndicators');

function http() {
    this.configure = function (app) {

        app.get('/courseIndicators/', function (request, response) {
            db.selectQuery(request.query, response);

        })
 
    }
}

module.exports = new http();