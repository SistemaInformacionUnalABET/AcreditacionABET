var db = require('../../Queries/Authentication.queries/login-authentication');

function http() {
    this.configure = function (app) {

        app.post('/auth/login/', function (request, response) {
          db.login(request.body, response);
        })
       

    }
}

module.exports = new http();