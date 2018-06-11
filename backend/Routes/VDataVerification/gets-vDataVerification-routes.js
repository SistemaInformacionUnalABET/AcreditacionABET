var db = require('../../Queries/VDataVerification/gets-vDataVerification');

function http() {
    this.configure = function (app) {

        app.get('/vDataVerification/', function (request, response) {
            db.selectQuery(request.query, response);

        })
 
    }
}

module.exports = new http();