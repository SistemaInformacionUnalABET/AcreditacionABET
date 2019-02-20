var db = require('../../Queries/VIndicadorClasificacion/gets-vIndicadorClasificacion');

function http() {
    this.configure = function (app) {

        app.get('/vIndicadorClasificacion/', function (request, response) {
            db.selectQuery(request.query, response);

        })
 
    }
}

module.exports = new http();