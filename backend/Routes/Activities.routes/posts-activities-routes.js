var db = require('../../Queries/Activities.queries/posts-activities');

function http() {
    this.configure = function (app) {

        app.post('/activities/', function (request, response) {
            db.insert(request.body, response);
        })

    }
}

module.exports = new http();