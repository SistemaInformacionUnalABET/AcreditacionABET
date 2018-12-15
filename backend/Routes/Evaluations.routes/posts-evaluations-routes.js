var db = require('../../Queries/Evaluations.queries/posts-evaluations');

function http() {
    this.configure = function (app) {

        app.post('/evaluations/', function (request, response) {
            db.insert(request.body, response);
        })

    }
}

module.exports = new http();