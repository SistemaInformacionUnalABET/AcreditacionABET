var db = require('../../Queries/Groups.queries/gets-groups');

function http() {
    this.configure = function (app) {


        app.get('/groups/', function (request, response) {
            db.selectQuery(request.query, response);
        })

    }
}

module.exports = new http();