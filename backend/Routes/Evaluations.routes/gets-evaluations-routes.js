var db = require('../../Queries/Evaluations.queries/gets-evaluations');

function http() {
    this.configure = function (app) {

        app.get('/evaluations/', function (request, response) {
            db.selectQuery(request.query, response);
        })

    }
}

module.exports = new http();