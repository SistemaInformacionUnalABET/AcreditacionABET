var connection = require('../connection');
var SqlString = require('sqlstring');


var csv = require("csvtojson");
var csvjson = require("csvjson");

function http() {
    this.configure = function (app) {

        let fs = require('fs');
        var datos;
        var subject = [];
        var bandera = true;

        var options = {
            delimiter: ';', // optional
            quote: '"' // optional
        };

        fs.readFile('./reporte.csv', { encoding: 'utf8' }, (err, data) => {
            if (err) {
                console.log('error: ', err);
            } else {
                var result = csvjson.toObject(data, options);
                datos = result;
                console.log(result[1].nota); //Converted json object from csv data

                //////
                //Insertandolo en la bd el nombre de la asignatura
                console.log("lo que para query ", datos[0].asignatura);



                connection.obtain(function (er, cn) {


                    //Select all asignaturas
                    cn.query('SELECT comunes.nombre FROM comunes INNER JOIN asignaturas ON ' +
                        'comunes.id_comun=asignaturas.id_comun WHERE comunes.id_comun=asignaturas.id_comun', function (error, result) {
                            if (error) {
                                response.send({ nombresDeAsignatura: 'Error' })
                            } else {


                                console.log("DAtos excel", datos);
                                console.log("Result query select", result);



                                for (let i = 0; i < datos.length; i++) {
                                    bandera = true;
                                    for (let k = 0; k < result.length; k++) {

                                        // SELECT  FROM comunes ORDER BY id_comun DESC LIMIT 1', function (error, result) {
                                        //     if (error) {
                                        //         response.send({ state2: 'Error' })
                                        //     } else {

                                        if (datos[i].asignatura === result[k].nombre) {

                                            bandera = false;
                                            // console.log("i.asignatura y result", i.asignatura , result[k].nombre);
                                            // subject.push(result[k].nombre);
                                        }
                                    }

                                    if (bandera) {
                                        subject.push(datos[i].asignatura)
                                    }

                                }
                                for (i of subject) {
                                    console.log("EL SUBJECT: ", subject);
                                    cn.query('insert into comunes set nombre=' + SqlString.escape(i), function (error, result) {
                                        if (error) {
                                            console.log("ERRORRRR insertando nombre en comunes");
                                        } else {
                                            console.log("Insertado bien en comunes");
                                            //////
                                            //consultando el ultimo id de comunes
                                            cn.query('SELECT id_comun FROM comunes ORDER BY id_comun DESC LIMIT 1', function (error, result) {
                                                if (error) {
                                                    console.log("ERRORRRR consultando el ultimo");
                                                } else {
                                                    console.log("Consultado el ultimo", result);
                                                    var id_comunS = parseInt(result[0].id_comun)
                                                    console.log("var id ", typeof(id_comunS))
                                                    //////
                                                    //Insertandolo en la bd el id de la asignatura en asignatura

                                                    cn.query('insert into asignaturas set id_comun='+id_comunS+'', function (error, result) {
                                                        if (error) {
                                                            console.log("ERRORRRR insertando en asignatura");
                                                        } else {
                                                            console.log("Insertado el id de la asignatura");
                                                        }
                                                    });

                                                }
                                            });

                                        }
                                    });
                                }


                                cn.release();
                            }
                        })

                })



                ///////
                //Insertandolo en la bd el nombre de la asignatura

            }
        });


        // fs.readFile('./notas.csv', 'utf-8', (err, data) => {
        //     if (err) {
        //         console.log('error: ', err);
        //     } else {
        //         datos = data;
        //         console.log(data);

        //         console.log("los datos");

        //         // Convert a csv file with csvtojson
        //         // csv()
        //         //     .fromFile("./notas.csv")
        //         //     .on("json", function (jsonArrayObj) { //when parse finished, result will be emitted here.
        //         //         console.log("JSON FILE");
        //         //         console.log(jsonArrayObj);
        //         //     })



        //         console.log(datos);

        //     }
        // });

    }
}

module.exports = new http();


// http.createServer(function(req, res){

// }).listen(9090);


// fs.readFile('archivo.txt', 'utf-8', (err, data) => {
//   if(err) {
//     console.log('error: ', err);
//   } else {
//     console.log(data);
//   }
// });


