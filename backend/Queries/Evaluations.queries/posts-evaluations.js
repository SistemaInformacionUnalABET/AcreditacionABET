var connection = require('../../connection');

function MethodsDB() {

    this.insert = function (datas, response) {
        connection.obtain(function (er, cn) {            
            cn.query('insert into evaluaciones set ?', datas, function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error insert evaluations' });
                } else {
                    response.send({ state: 'Ok' })
                }
            })

        }
        )
    }

}

module.exports = new MethodsDB();