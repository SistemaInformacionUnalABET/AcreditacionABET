var db = require('../../Queries/CourseIndicators.queries/post-courseIndicators');

function http() {
    this.configure = function (app) {

        app.post('/courseIndicators/', function (request, response) {
            db.insert(request.body, response);
        })

    }
}

module.exports = new http();