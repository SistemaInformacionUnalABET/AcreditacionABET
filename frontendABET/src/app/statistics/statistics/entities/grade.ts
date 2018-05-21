export class Grade{
    constructor(
        public id_calificacion: number,
        public id_estudiante_grupo: number,
        public id_actividad: number,
        public calificacion: number,
        public descripcion_calificacion: string,
        public fecha_creacion: string,
        public fecha_modificacion: string,
        public observacion: string,
        public evidencia_url: string
    ){}
}