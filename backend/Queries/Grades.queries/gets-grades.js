var connetion = require('../../connection');

function MethodsDB() {
    var deficient = [];
    var insufficient = [];
    var acceptable = [];
    var outstanding = [];
    var excellent = [];

    this.selectAll = function (response) {
        connetion.obtain(function (er, cn) {
            cn.query('select * from v_calificaciones_evaluacion_indicador', function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error' })
                } else {
                    response.send(result);
                    for (let grade of result) {
                        if (grade.calificacion <= 0.9) {
                            deficient.push(grade.calificacion);
                        } else if (grade.calificacion >= 1.0 && grade.calificacion <= 2.9) {
                            insufficient.push(grade.calificacion);
                        } else if (grade.calificacion >= 3.0 && grade.calificacion <= 3.9) {
                            acceptable.push(grade.calificacion);
                        } else if (grade.calificacion >= 4.0 && grade.calificacion <= 4.5) {
                            outstanding.push(grade.calificacion);
                        } else if (grade.calificacion >= 4.6) {
                            excellent.push(grade.calificacion);
                        }

                    }
                    console.log("cantidad de notas --> ", result.length);
                    console.log("deficiente --> ", deficient, "porcentaje = ", ((deficient.length / result.length)*100).toFixed(3), "%");
                    console.log("insuficiente --> ", insufficient, "porcentaje = ", ((insufficient.length / result.length)*100).toFixed(3), "%");
                    console.log("aceptable --> ", acceptable, "porcentaje = ", ((acceptable.length / result.length)*100).toFixed(3), "%");
                    console.log("sobreslaiente --> ", outstanding, "porcentaje = ", ((outstanding.length / result.length)*100).toFixed(3), "%");
                    console.log("execelente --> ", excellent, "porcentaje = ", ((excellent.length / result.length)*100).toFixed(3), "%");
                }
            })
        })

    }


}

module.exports = new MethodsDB();