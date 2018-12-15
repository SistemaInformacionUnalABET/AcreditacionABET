var connection = require('../../connection');

function MethodsDB() {

    this.selectQuery = function (queryParams,response) {
        var period=queryParams.period?queryParams.period:null
        var id_indicator=queryParams.id_indicator?queryParams.id_indicator:null
        var id_course=queryParams.id_course?queryParams.id_course:null
        var id_group=queryParams.id_group?queryParams.id_group:null
        var evaluation_type=queryParams.evaluation_type?queryParams.evaluation_type:null
        var activity_type=queryParams.activity_type?queryParams.activity_type:null
        
        var document=queryParams.document?queryParams.document:null
        var name=queryParams.name?queryParams.name:null
        var email=queryParams.name?queryParams.name:null
        var grade=queryParams.grade?queryParams.grade:null
        var observation=queryParams.observation?queryParams.observation:null
        var url_evidence=queryParams.url_evidence?queryParams.url_evidence:null

        connection.obtain(function (er, cn) {

            cn.query('select * from v_verificacion_datos where'+

            ' (periodo = '+period+' or '+period+' is NULL ) AND ' +
            ' (id_indicador = '+id_indicator+' or '+id_indicator+' is NULL ) AND ' +
            ' (id_asignatura = '+id_course+' or '+id_course+' is NULL ) AND ' + 
            ' (id_grupo = '+id_group+' or '+id_group+' is NULL ) AND ' + 
            ' (tipo_evaluacion = '+evaluation_type+' or '+evaluation_type+' is NULL ) AND ' +
            ' (tipo_actividad = '+activity_type+' or '+activity_type+' is NULL ) AND ' +
            ' (documento = '+document+' or '+document+' is NULL ) AND ' +
            ' (nombre = '+name+' or '+name+' is NULL ) AND ' +
            ' (email = '+email+' or '+email+' is NULL ) AND ' +
            ' (calificacion = '+grade+' or '+grade+' is NULL ) AND ' +
            ' (observacion = '+observation+' or '+observation+' is NULL ) AND ' +
            ' (evidencia_url = '+url_evidence+' or '+url_evidence+' is NULL )',

                function (error, result) {
                cn.release();
                if (error) {
                    response.send({ state: 'Error search by query params view vericacion datos' })
                } else {
                    response.send(result);
                }
            })
        })
    }

}

module.exports = new MethodsDB();