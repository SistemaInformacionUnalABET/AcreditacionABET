var db = require('../../Queries/Indicators.queries/posts-indicators');

function http() {
    this.configure = function (app) {

        app.post('/indicadores/', function (request, response) {
            db.insert(request.body, response);
        })

    }
}

module.exports = new http();