var db = require('../../Queries/VAsignaturaIndAvg/gets-vAsignaturaIndiAvg');

function http() {
    this.configure = function (app) {

        app.get('/vAsignaturaIndAvg/', function (request, response) {
            db.selectQuery(request.query, response);

        })
 
    }
}

module.exports = new http();