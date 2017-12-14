var connetion = require('../../connection');

function MethodsDB() {


    this.selectAll = function (response) {
        connetion.obtain(function (er, cn) {
            cn.query('select * from indicadores', function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error' })
                } else {
                    response.send(result);
                }
            })
        })
    }

    this.selectById = function (id, response) {
        connetion.obtain(function (er, cn) {
            cn.query('select * from indicadores where id_indicador=?', id, function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error' })
                } else {
                    response.send(result);
                }
            })
        })
    }

    this.selectByIdMeta = function (id_meta, response) {
        connetion.obtain(function (er, cn) {
            cn.query('select * from indicadores where id_meta=?', id_meta, function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error' })
                } else {
                    response.send(result);
                }
            })
        })
    }

    this.selectByIdComun = function (id_comun, response) {
        connetion.obtain(function (er, cn) {
            cn.query('select * from indicadores where id_comun=?', id_comun, function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error' })
                } else {
                    response.send(result);
                }
            })
        })
    }

}

module.exports = new MethodsDB();