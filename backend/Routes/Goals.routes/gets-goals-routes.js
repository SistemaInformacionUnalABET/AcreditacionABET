var db = require('../../Queries/Goals.queries/gets-goals');

function http() {
    this.configure = function (app) {


        app.get('/goals/', function (request, response) {
            db.selectQuery(request.query, response);
        })
    }
}

module.exports = new http();