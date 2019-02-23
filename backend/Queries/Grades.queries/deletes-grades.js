var connection = require('../../connection');

function MethodsDB() {

    this.delete = function (list, response) {
        connection.obtain(function (er, cn) {           
             
            cn.query('DELETE from calificaciones WHERE id_calificacion IN ('+list['list']+')', function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error delete calificaciones' });
                } else {
                    response.send({ state: 'Ok' })
                }
            }) 

        }
        )
    }

}

module.exports = new MethodsDB();