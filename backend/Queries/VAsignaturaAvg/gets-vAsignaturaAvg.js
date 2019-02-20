
var connection = require('../../connection');

function MethodsDB() {

    this.selectQuery = function (queryParams, response) {
        
        var id_grade = queryParams.id_grade ? queryParams.id_grade : null
        
        connection.obtain(function (er, cn) {

            cn.query('select * from v_asignatura_avg where' +

                ' (id_asignatura = ' + id_grade + ' or ' + id_grade + ' is NULL )',
                function (error, result) {
                    cn.release();
                    if (error) {
                        response.send({ state: 'Error search by query params view asignatura avg' })
                    } else {
                        response.send(result);
                    }
                })
        })
    }

}

module.exports = new MethodsDB();