export class IndicatorsBars{
    //         | indicador1 | indicador2
    //-------------------------------------
    //2017-I   | promedio      promedio
    //2017-II  | promedio      promedio
    //2018-I   | promedio      promedio


    private indicatorMatrixAVG; //{ "key":201X-X, "elements":["key":indicador,"promedioNotas"]  }


    constructor(){
        this.indicatorMatrixAVG = new Map();
        
    }


    addGrade(period:string, indicador:string, grade:number){
    
        if(this.indicatorMatrixAVG.get(period) == null){
            this.indicatorMatrixAVG.set(period,new Map());            
        }

        if(this.indicatorMatrixAVG.get(period).get(indicador) == null){
            //OJO revisar esto 
            this.indicatorMatrixAVG.get(period).set(indicador,0);
        }
        //  OJO revisar esto
        var currentAvg = this.indicatorMatrixAVG.get(period).get(indicador);
        //  OJO revisar esto
        var newAvg = this.calculateNewAvg();        
        //  OJO revisar esto
        this.indicatorMatrixAVG.get(period).set(indicador,newAvg);
    
    }

    calculateNewAvg(){

    }
}