export class IndicatorsBars{

    //              | 2017-II   |   2018_I
    //-------------------------------------
    //indicador1   | promedio      promedio
    //indicador2   | promedio      promedio
    //indicador3   | promedio      promedio

    private indicatorMatrixAVG; //{ "key":indicador, "elements":["key":201X-X,"promedioNotas"]  }

    private arrayPeriods;

    constructor(){
        this.indicatorMatrixAVG = new Map();
        this.arrayPeriods = [];
    }

    setArrayPeriods(array){
       
        this.arrayPeriods = array;
        this.indicatorMatrixAVG = new Map();
    }

    addGrade(period:string, indicator:string, avg:number){
        //agrega los periodos a la matriz para un nuevo indicador
        if(this.indicatorMatrixAVG.get(indicator) == null){   
            this.indicatorMatrixAVG.set(indicator,new Map());            

            this.arrayPeriods.forEach(p => {
                this.indicatorMatrixAVG.get(indicator).set(p, 0);            
            });    
        }

        if(this.indicatorMatrixAVG.get(indicator).get(period) == 0){
            this.indicatorMatrixAVG.get(indicator).set(period,avg);
        } 
    }

    getSeries(){
        
        var series = []
        var keys = Array.from(this.indicatorMatrixAVG.keys());

        keys.forEach(k => {            
            series.push({
                name: k,
                data: Array.from(this.indicatorMatrixAVG.get(k).values())
              });              
        });
  
        return series;
    }



}