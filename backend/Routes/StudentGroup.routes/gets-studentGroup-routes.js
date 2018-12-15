var db = require('../../Queries/StudentGroup.queries/gets-studentGroup');

function http() {
    this.configure = function (app) {

        app.get('/studentGroups/', function (request, response) {
            db.selectQuery(request.query, response);

        })
 
    }
}

module.exports = new http();