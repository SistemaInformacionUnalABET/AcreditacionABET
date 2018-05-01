var db = require('../../Queries/StudentGroup.queries/posts-studentsGroup');

function http() {
    this.configure = function (app) {

        app.post('/studentGroups/', function (request, response) {
            db.insert(request.body, response);
        })

    }
}

module.exports = new http();