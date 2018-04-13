var db = require('../../Queries/grades.queries/gets-grades');

function http() {
    this.configure = function (app) {

        
        app.get('/v_calificaciones_evaluacion_indicador/', function (request, response) {
            //db.selectAll(response);
        })
        
    }
}

module.exports = new http();