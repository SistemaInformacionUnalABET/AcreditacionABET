var connection = require('../../connection');

function MethodsDB() {

    this.selectQuery = function (queryParams,response) {
        var id_course=queryParams.id_course?queryParams.id_course:null
        var group_number=queryParams.group_number?queryParams.group_number:null
        var id_indicator=queryParams.id_indicator?queryParams.id_indicator:null
        var indicator_identificator=queryParams.indicator_identificator?queryParams.indicator_identificator:null
        var evaluation_type=queryParams.evaluation_type?queryParams.evaluation_type:null
        var activity_type=queryParams.activity_type?queryParams.activity_type:null
        var document=queryParams.document?queryParams.document:null

        var grade=queryParams.grade?queryParams.grade:null
        var description=queryParams.description?queryParams.description:null
        var creation_date=queryParams.creation_date?queryParams.creation_date:null
        var modify_date=queryParams.modify_date?queryParams.modify_date:null
        var period=queryParams.period?queryParams.period:null
        var observation=queryParams.observation?queryParams.observation:null
        var url_evidence=queryParams.url_evidence?queryParams.url_evidence:null

        connection.obtain(function (er, cn) {
            cn.query('select * from v_calificaciones_completas where (id_asignatura = '+id_course+' or '+id_course+' is NULL ) AND ' + 
            '(numero_grupo = '+group_number+' or '+group_number+' is NULL ) AND ' +
            ' (id_indicador = '+id_indicator+' or '+id_indicator+' is NULL ) AND ' +
            ' (identificador_indicador = '+indicator_identificator+' or '+indicator_identificator+' is NULL ) AND ' +
            ' (tipo_evaluacion = '+evaluation_type+' or '+evaluation_type+' is NULL ) AND ' +
            ' (tipo_actividad = '+activity_type+' or '+activity_type+' is NULL ) AND ' +
            ' (documento = '+document+' or '+document+' is NULL ) AND ' +

            ' (calificacion = '+grade+' or '+grade+' is NULL ) AND ' +
            ' (descripcion_calificacion = '+description+' or '+description+' is NULL ) AND ' +
            ' (fecha_creacion = '+creation_date+' or '+creation_date+' is NULL ) AND ' +
            ' (fecha_modificacion = '+modify_date+' or '+modify_date+' is NULL ) AND ' +
            ' (periodo = '+period+' or '+period+' is NULL ) AND ' +
            ' (observacion = '+observation+' or '+observation+' is NULL ) AND ' +
            '(evidencia_url = '+url_evidence+' or '+url_evidence+' is NULL )',
                function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error search by query params view grades complete' })
                } else {
                    response.send(result);
                }
            })
        })
    }



    // var deficient = [];
    // var insufficient = [];
    // var acceptable = [];
    // var outstanding = [];
    // var excellent = [];

    // this.selectAll = function (response) {
    //     connetion.obtain(function (er, cn) {
    //         cn.query('select * from v_calificaciones_evaluacion_indicador', function (error, result) {
    //             cn.release();
    //             if (error) {
    //                 response.send({ state: 'Error' })
    //             } else {
    //                 response.send(result);
    //                 for (let grade of result) {
    //                     if (grade.calificacion <= 0.9) {
    //                         deficient.push(grade.calificacion);
    //                     } else if (grade.calificacion >= 1.0 && grade.calificacion <= 2.9) {
    //                         insufficient.push(grade.calificacion);
    //                     } else if (grade.calificacion >= 3.0 && grade.calificacion <= 3.9) {
    //                         acceptable.push(grade.calificacion);
    //                     } else if (grade.calificacion >= 4.0 && grade.calificacion <= 4.5) {
    //                         outstanding.push(grade.calificacion);
    //                     } else if (grade.calificacion >= 4.6) {
    //                         excellent.push(grade.calificacion);
    //                     }

    //                 }
    //                 console.log("cantidad de notas --> ", result.length);
    //                 console.log("deficiente --> ", deficient, "porcentaje = ", ((deficient.length / result.length)*100).toFixed(3), "%");
    //                 console.log("insuficiente --> ", insufficient, "porcentaje = ", ((insufficient.length / result.length)*100).toFixed(3), "%");
    //                 console.log("aceptable --> ", acceptable, "porcentaje = ", ((acceptable.length / result.length)*100).toFixed(3), "%");
    //                 console.log("sobresaliente --> ", outstanding, "porcentaje = ", ((outstanding.length / result.length)*100).toFixed(3), "%");
    //                 console.log("excelente --> ", excellent, "porcentaje = ", ((excellent.length / result.length)*100).toFixed(3), "%");
    //             }
    //         })
    //     })

    // }


}

module.exports = new MethodsDB();