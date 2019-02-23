export class ViewIndicatorClasification {
    constructor( 
        public id_indicator: number,
        public periodo: string,
        public total_notas: number,
        public ejemplar: number,
        public satisfactorio: number,
        public desarrollado: number,
        public insatisfactorio: number,
        )
    {    
    }
}