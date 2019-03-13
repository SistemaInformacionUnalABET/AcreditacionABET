export class ViewCompleteGrade{

    constructor( 
        public id_asignatura: number,
        public codigo: number,
        public numero_grupo: number,
        public id_indicador: number,
        public identificador_indicador:string,
        public tipo_evaluacion:string,
        public tipo_actividad:string,
        public documento:string,
        public calificacion:number,
        public descripcion_calificacion:string,
        public periodo:string,
        public fecha_creacion:string,
        public fecha_modificacion:string,
        public observacion:string,
        public evidencia_url:string)
    {    
    }
}