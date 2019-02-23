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





}

module.exports = new MethodsDB();