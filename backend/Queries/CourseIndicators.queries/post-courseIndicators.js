var connection = require('../../connection');

function MethodsDB() {

    this.insert = function (datas, response) {
        connection.obtain(function (er, cn) {            
            cn.query('insert into asignatura_indicador set ?', datas, function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error insert asignatura_indicador' });
                } else {
                    response.send({ state: 'Ok' })
                }
            })

        }
        )
    }

}

module.exports = new MethodsDB();