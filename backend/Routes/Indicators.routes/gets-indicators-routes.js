var db = require('../../Queries/Indicators.queries/gets-indicators');

function http() {
    this.configure = function (app) {

        app.get('/indicadores/', function (request, response) {
            db.selectAll(response);
        })

        app.get('/indicadores/:id/',function(request, response){
            db.selectById(request.params.id, response);
        })

        app.get('/indicadores/meta/:id_meta/',function(request, response){
            db.selectByIdMeta(request.params.id_meta, response);
        })

        app.get('/indicadores/comun/:id_comun/',function(request, response){
            db.selectByIdComun(request.params.id_comun, response);
        })

    }
}

module.exports = new http();