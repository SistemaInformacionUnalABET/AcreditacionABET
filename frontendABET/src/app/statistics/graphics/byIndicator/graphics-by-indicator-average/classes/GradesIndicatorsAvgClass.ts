export class GradesIndicatorsAvg{

    private arrayAVG; //guarda los promedios de las notas (Key: 20XX-X, Value: promedio)
    private arrayGradesCount; //guarda la cantidad de notas por periodo (Key: 20XX-X, Value: cantidad de notas)
    private arrayPeriods; 

    constructor(){
        this.arrayAVG = new Map();
        this.arrayGradesCount = new Map();
    }

    setArrayPeriods(array){
        this.arrayPeriods = array;

        this.arrayAVG = new Map();
        this.arrayGradesCount = new Map();

        this.arrayPeriods.forEach(p => {
            this.arrayAVG.set(p, 0);            
            this.arrayGradesCount.set(p, 0);            
        });    
    }

    addGrade(period, calification){
      if (this.arrayAVG.get(period)==0) { 
        this.arrayAVG.set(period, calification);
        this.arrayGradesCount.set(period, 1);
      } else {
        var newAvg = ((this.arrayAVG.get(period) * this.arrayGradesCount.get(period)) + calification) / (this.arrayGradesCount.get(period) + 1)
        this.arrayAVG.set(period, Math.round(newAvg*100)/100);
        this.arrayGradesCount.set(period, this.arrayGradesCount.get(period) + 1);
      }     
    }

    getArrayAvg(){
        console.log(">>>>>  obteniendo ArrayAvg", Array.from(this.arrayAVG.values()));
        return Array.from(this.arrayAVG.values());
    }

}