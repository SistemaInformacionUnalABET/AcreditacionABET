var db = require('../../Queries/Students.queries/posts-students');

function http() {
    this.configure = function (app) {

        app.post('/students/', function (request, response) {
            db.insert(request.body, response);
        })

    }
}

module.exports = new http();