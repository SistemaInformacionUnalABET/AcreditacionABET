var db = require('../../Queries/Evaluations.queries/gets-evaluations');

function http() {
    this.configure = function (app) {

        // app.get('/goals/', function (request, response) {
        //     //console.log("Despues del pegarle a la ruta goals");
        //     db.selectAll(response);
        // })

        app.get('/evaluations/', function (request, response) {
            db.selectQuery(request.query, response);
        })

    }
}

module.exports = new http();