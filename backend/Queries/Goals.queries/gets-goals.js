var connection = require('../../connection');

function MethodsDB() {


    this.selectAll = function (response) {
        connection.obtain(function (er, cn) {
            cn.query('select * from metas', function (error, result) {
                console.log("Despues de query");
                cn.release();
                if (error) {
                    response.send({ state: 'Error in select meta' })
                } else {
                    response.send(result);
                }
            })
        })
    }

}

module.exports = new MethodsDB();