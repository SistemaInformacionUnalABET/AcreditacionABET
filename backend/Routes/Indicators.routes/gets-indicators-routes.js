var db = require('../../Queries/Indicators.queries/gets-indicators');

function http() {
    this.configure = function (app) {
        /*
        app.get('/indicators/', function (request, response) {
             db.selectAll(response);
         })
        */
        app.get('/indicators/', function (request, response) {            
            db.selectQuery(request.query, response);
        })
    }
}

module.exports = new http();