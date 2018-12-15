var connection = require('../../connection');
var jwt = require('jsonwebtoken');

function MethodsDB() {

    this.login = function (datas, response) {
        connection.obtain(function (er, cn) {
            console.log( datas.user, datas.pass);
            cn.query('select * from usuarios where usuario=? and clave=?', [datas.user, datas.pass], function (error, result) {
                cn.release();
                if (error) {
                    response.send('Error haciendo la consulta a la tabla usuarios');
                } else {
                    if (result.length == 0) {
                        console.log("errorAuth");
                        response.send('userNoFound');
                    }else{
                        var token = jwt.sign({
                            user: datas.user,
                            rol: 'admin'
                        },'secreto', {expiresIn: '36000s'});
                        console.log("AUTENTICADO");
                        response.send(token);

                    }
                }
            })
        }
        )
    }

}

module.exports = new MethodsDB();