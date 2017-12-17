var connetion = require('../../connection');

function MethodsDB() {


    this.selectAll = function (response) {
        connetion.obtain(function (er, cn) {
            cn.query('select * from v_calificaciones_evaluacion_indicador', function (error, result) {
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