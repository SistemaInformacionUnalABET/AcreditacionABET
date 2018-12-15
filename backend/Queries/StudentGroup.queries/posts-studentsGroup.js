var connection = require('../../connection');

function MethodsDB() {

    this.insert = function (datas, response) {
        connection.obtain(function (er, cn) {            
            cn.query('insert into estudiante_grupo set ?', datas, function (error, result) {
                console.log(">>>>>> Datas:", datas);
                
                cn.release();
                if (error) {
                    response.send({ error: 'Error insert student group' });
                } else {
                    response.send({ message: 'Ok' })
                }
            })

        }
        )
    }

}

module.exports = new MethodsDB();