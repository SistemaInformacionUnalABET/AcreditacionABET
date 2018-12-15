var connection = require('../../connection');

function MethodsDB() {

    /*
    this.selectAll = function (response) {

        connection.obtain(function (er, cn) {
            cn.query('select * from asignaturas', function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error' })
                } else {
                    response.send(result);
                }
            })
        })
    }
*/
    this.selectQuery = function (queryParams,response) {
        
        var id=queryParams.id?queryParams.id:null
        var code=queryParams.code?queryParams.code:null
        var name=queryParams.name?queryParams.name:null
        var description=queryParams.description?queryParams.description:null

        connection.obtain(function (er, cn) {
            cn.query('select * from asignaturas where ' +
            '(id_asignatura = '+id+' or '+id+' is NULL ) AND ' + 
            '(codigo = '+code+' or '+code+' is NULL ) AND ' +
            '(nombre_asignatura = '+name+' or '+name+' is NULL ) AND ' +
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