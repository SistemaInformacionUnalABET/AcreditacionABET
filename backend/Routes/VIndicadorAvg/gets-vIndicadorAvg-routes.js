var db = require('../../Queries/VIndicadorAvg/gets-vIndicadorAvg');

function http() {
    this.configure = function (app) {

        app.get('/vIndicadorAvg/', function (request, response) {
            db.selectQuery(request.query, response);

        })
 
    }
}

module.exports = new http();