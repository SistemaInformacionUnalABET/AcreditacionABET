var db = require('../../Queries/VAsignaturaAvg/gets-vAsignaturaAvg');

function http() {
    this.configure = function (app) {

        app.get('/vAsignaturaAvg/', function (request, response) {
            db.selectQuery(request.query, response);

        })
 
    }
}

module.exports = new http();