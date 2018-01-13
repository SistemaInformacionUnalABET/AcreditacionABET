var connection = require('../../connection');

function MethodsDB() {

    // class Poligono {
    //     constructor(alto, ancho) {
    //         this.alto = alto;
    //         this.ancho = ancho;
    //     }
    // }

    this.selectAll = function (queryParams,response) {
        var id=queryParams.id?queryParams.id:null
        var document=queryParams.document?queryParams.document:null
        var email=queryParams.email?queryParams.email:null
        connection.obtain(function (er, cn) {
            cn.query('select * from estudiantes where (id_estudiante = '+id+' or '+id+' is NULL ) AND ' + 
            '(documento = '+document+' or '+document+' is NULL ) AND (email = '+email+' or '+email+' is NULL )',
                function (error, result) {
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
        // connection.obtain(function (er, cn) {
        //     cn.query('select * from estudiantes where id_estudiante=?', id,
        //      function (error, result) {
        //         cn.release();
        //         if (error) {
        //             response.send({ state: 'Error' })
        //         } else {
        //             response.send(result);
        //         }
        //     })
        // })
        console.log("    /////   QUERY PARAMS \n ")
        console.log(id.nombre)
    }

    this.selectByDocument = function (document, response) {
        connection.obtain(function (er, cn) {
            cn.query('select * from estudiantes where documento=?', document, function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error' })
                } else {
                    response.send(result);
                }
            })
        })
    }

    this.selectByEmail = function (email, response) {
        connection.obtain(function (er, cn) {
            cn.query('select * from estudiantes where email=?', email, function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error' })
                } else {
                    response.send(result);
                }
            })
        })
    }

    this.selectByName = function (name, response) {
        connection.obtain(function (er, cn) {
            cn.query('select * from estudiantes where nombre_completo=?', name, function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error' })
                } else {
                    response.send(result);
                }
            })
        })
    }

    // this.getPol = function(alto1, ancho1){
    //     return new Poligono(alto1, ancho1)
    // }

}

module.exports = new MethodsDB();