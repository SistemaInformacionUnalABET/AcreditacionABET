var connection = require('../../connection');

function MethodsDB() {

    this.delete = function (list, response) {
        connection.obtain(function (er, cn) {           
             
            cn.query('DELETE from estudiante_grupo WHERE id_estudiante_grupo IN (' + list['list'] + ')', function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error delete studiante grupo' });
                } else {
                    response.send({ state: 'Ok' })
                }
            }) 

        }
        )
    }

}