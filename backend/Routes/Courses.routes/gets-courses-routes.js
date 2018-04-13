var db = require('../../Queries/Courses.queries/gets-courses');

function http() {
    this.configure = function (app) {

        app.get('/courses/', function (request, response) {
            db.selectAll(response);
        })

    }
}

module.exports = new http();