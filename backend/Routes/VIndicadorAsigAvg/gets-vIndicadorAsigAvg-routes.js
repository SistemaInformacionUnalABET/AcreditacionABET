var db = require('../../Queries/vIndicadorAsigAvg/gets-vIndicadorAsigAvg');

function http() {
    this.configure = function (app) {

        app.get('/vIndicadorAsigAvg/', function (request, response) {
            db.selectQuery(request.query, response);

        })
 
    }
}

module.exports = new http();