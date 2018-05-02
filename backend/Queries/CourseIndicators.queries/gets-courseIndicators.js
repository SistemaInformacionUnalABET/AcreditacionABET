var connection = require('../../connection');

function MethodsDB() {

    this.selectQuery = function (queryParams,response) {
        var id=queryParams.id?queryParams.id:null
        var id_course=queryParams.id_course?queryParams.id_course:null
        var id_indicator=queryParams.id_indicator?queryParams.id_indicator:null
        connection.obtain(function (er, cn) {
            cn.query('select * from asignatura_indicador where (id_asignatura_indicador = '+id+' or '+id+' is NULL ) AND ' + 
            '(id_asignatura = '+id_course+' or '+id_course+' is NULL ) AND ' +
            '(id_indicador = '+id_indicator+' or '+id_indicator+' is NULL )',
                function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error search by query params asignatura_indicador' })
                } else {
                    response.send(result);
                }
            })
        })
    }

}

module.exports = new MethodsDB();