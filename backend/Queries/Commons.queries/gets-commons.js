var connetion = require('../../connection');

function MethodsDB() {


    this.selectAll = function (response) {
        connetion.obtain(function (er, cn) {
            cn.query('select * from comunes', function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error' })
                } else {
                    response.send(result);
                }
            })
        })
    }

    this.selectLastId = function (response) {
        connetion.obtain(function (er, cn) {
            cn.query('select max(id_comun) from comunes', function (error, result) {
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