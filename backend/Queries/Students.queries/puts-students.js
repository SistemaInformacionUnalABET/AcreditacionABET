var connection = require('../../connection');

function MethodsDB() {

    this.update = function (datas, response) {
        connection.obtain(function (er, cn) {
            cn.query('update estudiantes set ? where id_estudiante = ?', [datas, datas.id_estudiante], function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error' });
                } else {
                    response.send({ state: 'Ok' })
                }
            })

        }
        )
    }

}

module.exports = new MethodsDB();