var db = require('../../Queries/Goals.queries/gets-goals');

function http() {
    this.configure = function (app) {

        app.get('/goals/', function (request, response) {
            console.log("Despues del pegarle a la ruta goals");

            db.selectAll(response);
        })

    }
}

module.exports = new http();