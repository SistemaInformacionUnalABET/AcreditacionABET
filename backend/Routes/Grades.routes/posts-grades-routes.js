var db = require('../../Queries/Grades.queries/posts-grades');

function http() {
    this.configure = function (app) {

        app.post('/grades/', function (request, response) {
            db.insert(request.body, response);
        })

    }
}

module.exports = new http();