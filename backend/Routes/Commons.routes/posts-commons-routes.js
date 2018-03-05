var db = require('../../Queries/Commons.queries/posts-comunes');

function http() {
    this.configure = function (app) {

        app.post('/comunes/', function (request, response) {
            db.insert(request.body, response);
        })

    }
}

module.exports = new http();