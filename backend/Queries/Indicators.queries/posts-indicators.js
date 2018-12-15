var connection = require('../../connection');

function MethodsDB() {

    this.insert = function (datas, response) {
        connection.obtain(function (er, cn) {
            cn.query('insert into indicadores set ?', datas, function(error, result){
                cn.release();
                if(error){
                    response.send({estado: 'Error'});

                }else{
                    response.send({estado: 'ok'});
                }
            })




            // cn.query('insert into comunes set ?', datas.comun, function (error, result) {
            //     if (error) {
            //         response.send({ state1: 'Error' });
            //     } else {
            //         console.log("Lo que viene --> ", datas.comun);

            //         cn.query('SELECT id_comun FROM comunes ORDER BY id_comun DESC LIMIT 1', function (error, result) {
            //             if (error) {
            //                 response.send({ state2: 'Error' })
            //             } else {
            //                 console.log("RESULT", result[0].id_comun);
            //                 var id_comunS = parseInt(result[0].id_comun);
            //                 var id_metaS = parseInt(datas.meta.id_meta);
                            
            //                 cn.query('insert into indicadores set id_indicador=null, id_meta='+id_metaS+', id_comun='+id_comunS+'', function (error, result) {
            //                     cn.release();
            //                     if (error) {
            //                         response.send({ state3: 'Error' });
            //                     } else {
            //                         response.send({ state: 'Ok' })
            //                     }
            //                 })

            //             }
            //         })

            //     }

            // })
        })
    }
}
module.exports = new MethodsDB();