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
        var description=queryParams.description?queryParams.description:null
        var id_evaluation=queryParams.id_eval?queryParams.id_eval:null

        connection.obtain(function (er, cn) {
            cn.query('select * from actividades where (id_actividad = '+id+' or '+id+' is NULL ) AND ' + 
            '(tipo_actividad = '+type+' or '+type+' is NULL ) AND ' +
            ' (descripcion = '+description+' or '+description+' is NULL ) AND (id_evaluacion = '+id_evaluation+' or '+id_evaluation+' is NULL )',
                function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error search by query params activities' })
                } else {
                    response.send(result);
                }
            })
        })
    }

}

module.exports = new MethodsDB();