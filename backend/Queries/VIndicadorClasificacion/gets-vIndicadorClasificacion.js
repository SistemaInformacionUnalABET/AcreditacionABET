
var connection = require('../../connection');

function MethodsDB() {

    this.selectQuery = function (queryParams, response) {
        
        var id_indicator = queryParams.id_indicator ? queryParams.id_indicator : null
        
        connection.obtain(function (er, cn) {

            cn.query('select * from v_indicador_clasificacion where' +

                ' (id_indicador = ' + id_indicator + ' or ' + id_indicator + ' is NULL ) ORDER BY periodo',
                function (error, result) {
                    cn.release();
                    if (error) {
                        response.send({ state: 'Error search by query params view indicador clasificacion' })
                    } else {
                        response.send(result);
                    }
                })
        })
    }

}

module.exports = new MethodsDB();