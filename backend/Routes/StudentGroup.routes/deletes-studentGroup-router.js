var db = require('../../Queries/StudentGroup.queries/deletes-studentGroup');

function http() {
    this.configure = function (app) {

        app.delete('/studentGroupList/', function (request, response) {
            db.delete(request.query, response);
        })
    }
}

module.exports = new http();