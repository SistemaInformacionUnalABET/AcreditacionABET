var connection = require('../../connection');

function MethodsDB() {

    this.delete = function (list, response) {
        connection.obtain(function (er, cn) {           
             
            cn.query('delete from estudiante_grupo where id_estudiante_grupo NOT IN (select id_estudiante_grupo from calificaciones);', function (error, result) {
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

module.exports = new MethodsDB();