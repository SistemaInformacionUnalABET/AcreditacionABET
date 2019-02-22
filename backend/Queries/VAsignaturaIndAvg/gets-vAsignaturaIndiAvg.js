
var connection = require('../../connection');

function MethodsDB() {

    this.selectQuery = function (queryParams, response) {
        
        var id_course = queryParams.id_course ? queryParams.id_course : null
        
        connection.obtain(function (er, cn) {

            cn.query('select * from v_asignatura_ind_avg where' +

                ' (id_asignatura = ' + id_course + ' or ' + id_course + ' is NULL )  ORDER BY periodo ASC, identificador_indicador ASC',
                function (error, result) {
                    cn.release();
                    if (error) {
                        response.send({ state: 'Error search by query params view asignatura indicador avg' })
                    } else {
                        response.send(result);
                    }
                })
        })
    }

}

module.exports = new MethodsDB();