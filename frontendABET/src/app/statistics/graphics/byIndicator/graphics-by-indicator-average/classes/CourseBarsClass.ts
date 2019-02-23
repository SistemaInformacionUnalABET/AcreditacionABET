export class CourseBars{

    //              | 2017-II   |   2018_I
    //-------------------------------------
    //course1   | promedio      promedio
    //course2   | promedio      promedio
    //course3   | promedio      promedio

    private courseMatrixAVG; //{ "key":indicador, "elements":["key":201X-X,"promedioNotas"]  }

    private arrayPeriods;

    constructor(){
        this.courseMatrixAVG = new Map();
        this.arrayPeriods = [];
    }

    setArrayPeriods(array){
        this.arrayPeriods = array;
        this.courseMatrixAVG = new Map();        
    }

    addGrade(period:string, course:string, grade:number){
        
        //agrega los periodos a la matriz para un nuevo curso
        if(this.courseMatrixAVG.get(course) == null){   
            this.courseMatrixAVG.set(course,new Map());            
            
            this.arrayPeriods.forEach(p => {
                this.courseMatrixAVG.get(course).set(p, 0);                        
            });    
        }

        if(this.courseMatrixAVG.get(course).get(period) == 0){
            this.courseMatrixAVG.get(course).set(period,grade);            
        } 
    }

    getSeries(){
        
        var series = []
        var keys = Array.from(this.courseMatrixAVG.keys());

        keys.forEach(k => {            
            series.push({
                name: k,
                data: Array.from(this.courseMatrixAVG.get(k).values())
              });              
        });
  
        return series;
    }



}