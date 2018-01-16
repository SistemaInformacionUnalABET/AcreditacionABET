var connection = require('../connection');
var SqlString = require('sqlstring');


var csv = require("csvtojson");
var csvjson = require("csvjson");

function http() {
    this.configure = function (app) {

        let fs = require('fs');
        var datos;

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

                for (let i of datos) {

                    connection.obtain(function (er, cn) {
                        cn.query('insert into comunes set nombre=' + SqlString.escape(i.asignatura), function (error, result) {
                            cn.release();
                            if (error) {
                                console.log("ERRORRRR");
                            } else {
                                console.log("Insertado bien");

                            }
                        })
                    })

                }

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


