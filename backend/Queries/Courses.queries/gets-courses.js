var connection = require('../../connection');

function MethodsDB() {

    this.selectAll = function (response) {

        connection.obtain(function (er, cn) {
            cn.query('select * from asignaturas', function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error' })
                } else {
                    response.send(result);
                }
            })
        })
    }

}

module.exports = new MethodsDB();