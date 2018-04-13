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
        var name=queryParams.name?queryParams.name:null
        var description=queryParams.description?queryParams.description:null
        var id_eval=queryParams.id_eval?queryParams.id_eval:null

        connection.obtain(function (er, cn) {
            cn.query('select * from actividades where (id_actividad = '+id+' or '+id+' is NULL ) AND ' + 
            '(nombre_actividad = '+name+' or '+name+' is NULL ) AND ' +
            ' (descripcion = '+description+' or '+description+' is NULL ) AND (id_evaluacion = '+id_eval+' or '+id_eval+' is NULL )',
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