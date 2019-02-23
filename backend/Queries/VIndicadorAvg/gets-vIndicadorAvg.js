
var connection = require('../../connection');

function MethodsDB() {

    this.selectQuery = function (queryParams, response) {
        
        var id_indicator = queryParams.id_indicator ? queryParams.id_indicator : null
        
        connection.obtain(function (er, cn) {

            cn.query('select * from v_indicador_avg where' +

                ' (id_indicador = ' + id_indicator + ' or ' + id_indicator + ' is NULL ) ORDER BY periodo ASC',
                function (error, result) {
                    cn.release();
                    if (error) {
                        response.send({ state: 'Error search by query params view indicador avg' })
                    } else {
                        response.send(result);
                    }
                })
        })
    }

}

module.exports = new MethodsDB();