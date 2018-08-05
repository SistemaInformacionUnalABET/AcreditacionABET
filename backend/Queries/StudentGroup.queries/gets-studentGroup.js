var connection = require('../../connection');

function MethodsDB() {

    this.selectQuery = function (queryParams,response) {
        var id=queryParams.id?queryParams.id:null
        var id_group=queryParams.id_group?queryParams.id_group:null
        var id_student=queryParams.id_student?queryParams.id_student:null
        var id_course=queryParams.id_course?queryParams.id_course:null
        var period = queryParams.period?queryParams.period:null
        connection.obtain(function (er, cn) {
            cn.query('select * from estudiante_grupo where (id_estudiante_grupo = '+id+' or '+id+' is NULL ) AND ' + 
            '(id_grupo = '+id_group+' or '+id_group+' is NULL ) AND ' +
            '(id_estudiante = '+id_student+' or '+id_student+' is NULL ) AND ' +
            '(id_asignatura = '+id_course+' or '+id_course+' is NULL ) AND' +
            '(periodo = '+period+' or '+period+' is NULL )',
                function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error search by query params estudiante_grupo' })
                } else {
                    response.send(result);
                }
            })
        })
    }

}

module.exports = new MethodsDB();