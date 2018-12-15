var connection = require('../../connection');

function MethodsDB() {
/*
    this.selectAll = function(response){
        connection.obtain(function(er, cn){
            cn.query('select * from indicadores', 
                function(){
                    cn.release();
                    if (error) {
                        response.send({ state: 'Error search by query params' })
                    } else {
                        response.send(result);
                    }
                })
        })
    }
*/
    this.selectQuery = function (queryParams,response) {
        var id=queryParams.id?queryParams.id:null
        var goal=queryParams.goal?queryParams.goal:null
        var identificator=queryParams.identificator?queryParams.identificator:null
        var name=queryParams.name?queryParams.name:null
        var description=queryParams.description?queryParams.description:null
        connection.obtain(function (er, cn) {
            cn.query('select * from indicadores where (id_indicador = '+id+' or '+id+' is NULL ) AND ' + 
            '(id_meta = '+goal+' or '+goal+' is NULL ) AND ' +
            '(identificador_indicador = '+identificator+' or '+identificator+' is NULL ) AND ' +
            '(nombre_indicador = '+name+' or '+name+' is NULL ) AND ' +
            '(descripcion = '+description+' or '+description+' is NULL )',
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