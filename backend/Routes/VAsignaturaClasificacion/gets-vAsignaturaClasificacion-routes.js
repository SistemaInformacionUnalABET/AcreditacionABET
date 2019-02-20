var db = require('../../Queries/VAsignaturaClasificacion/gets-vAsignaturaClasificacion');

function http() {
    this.configure = function (app) {

        app.get('/vAsignaturaClasificacion/', function (request, response) {
            db.selectQuery(request.query, response);

        })
 
    }
}

module.exports = new http();