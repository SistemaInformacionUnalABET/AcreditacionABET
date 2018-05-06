var connection = require('../../connection');

function MethodsDB() {


    // this.selectAll = function (response) {
    //     connection.obtain(function (er, cn) {
    //         cn.query('select * from metas', function (error, result) {
    //             console.log("Despues de query");
    //             cn.release();
    //             if (error) {
    //                 response.send({ state: 'Error in select meta' })
    //             } else {
    //                 response.send(result);
    //             }
    //         })
    //     })
    // }


    this.selectQuery = function (queryParams,response) {
        var id=queryParams.id?queryParams.id:null
        var type=queryParams.type?queryParams.type:null
        var id_asig_ind=queryParams.id_asig_ind?queryParams.id_asig_ind:null

        connection.obtain(function (er, cn) {
            cn.query('select * from evaluaciones where (id_evaluacion = '+id+' or '+id+' is NULL ) AND ' + 
            '(tipo_evaluacion = '+type+' or '+type+' is NULL ) AND ' +
            '(id_asignatura_indicador = '+id_asig_ind+' or '+id_asig_ind+' is NULL )',
                function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error search by query params Evaluations' })
                } else {
                    response.send(result);
                }
            })
        })
    }

}

module.exports = new MethodsDB();