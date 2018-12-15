var connection = require('../../connection');

function MethodsDB() {

    this.delete = function (id, response) {
        connection.obtain(function (er, cn) {
            cn.query('delete from estudiantes where id_estudiante = ?', id, function (error, result) {
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