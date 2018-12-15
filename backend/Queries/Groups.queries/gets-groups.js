var connection = require('../../connection');

function MethodsDB() {

    this.selectQuery = function (queryParams,response) {
        var id=queryParams.id?queryParams.id:null
        var id_course=queryParams.id_course?queryParams.id_course:null
        var number_group=queryParams.number_group?queryParams.number_group:null

        connection.obtain(function (er, cn) {
            cn.query('select * from grupos where (id_grupo = '+id+' or '+id+' is NULL ) AND ' + 
            '(id_asignatura = '+id_course+' or '+id_course+' is NULL ) AND ' +
            '(numero_grupo = '+number_group+' or '+number_group+' is NULL ) ORDER BY numero_grupo',
                function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error search by query params Groups' })
                } else {
                    response.send(result);
                }
            })
        })
    }

}

module.exports = new MethodsDB();