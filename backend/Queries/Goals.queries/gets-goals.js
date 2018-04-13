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
        var identificator=queryParams.identificator?queryParams.identificator:null
        var name=queryParams.name?queryParams.name:null
        var description=queryParams.description?queryParams.description:null

        connection.obtain(function (er, cn) {
            cn.query('select * from metas where (id_meta = '+id+' or '+id+' is NULL ) AND ' + 
            '(identificador_meta = '+identificator+' or '+identificator+' is NULL ) AND ' +
            ' (nombre_meta = '+name+' or '+name+' is NULL ) AND (descripcion = '+description+' or '+description+' is NULL )',
                function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error search by query params' })
                } else {
                    response.send(result);
                }
            })
        })
    }

}

module.exports = new MethodsDB();