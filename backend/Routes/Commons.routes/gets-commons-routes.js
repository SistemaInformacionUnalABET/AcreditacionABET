var db = require('../../Queries/Commons.queries/gets-commons');

function http() {
    this.configure = function (app) {

        app.get('/comunes/', function (request, response) {
            db.selectLastId(response);
        })

    }
}

module.exports = new http();