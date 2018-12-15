var connection = require('../../connection');

function MethodsDB() {

    this.insert = function (datas, response) {
        connection.obtain(function (er, cn) {
            cn.query('insert into comunes set ?', datas, function(error, result){
                cn.release();
                if(error){
                    response.send({estado: 'Error'});

                }else{
                    response.send({estado: 'ok'});
                }
            })

        })
    }
}
module.exports = new MethodsDB();