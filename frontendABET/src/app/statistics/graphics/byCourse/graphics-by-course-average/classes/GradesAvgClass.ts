export class GradesAvg{

    private indicatorsAVG; //guarda los promedios de las notas (Key: 20XX-X, Value: promedio)
    private indicatorsGradesCount; //guarda la cantidad de notas por año (Key: 20XX-X, Value: cantidad de notas)
    private arrayPeriods;

    constructor(){
        this.indicatorsAVG = new Map();
        this.indicatorsGradesCount = new Map();
    }

    setArrayPeriods(array){
        this.arrayPeriods = array;

        this.indicatorsAVG = new Map();
        this.indicatorsGradesCount = new Map();
        
        this.arrayPeriods.forEach(p => {
            this.indicatorsAVG.set(p, 0);            
            this.indicatorsGradesCount.set(p, 0);            
        });    
    }

    addGrade(period, calification){
      if (this.indicatorsAVG.get(period)==0) { 
        this.indicatorsAVG.set(period, calification);
        this.indicatorsGradesCount.set(period, 1);
      } else {
        var newAvg = ((this.indicatorsAVG.get(period) * this.indicatorsGradesCount.get(period)) + calification) / (this.indicatorsGradesCount.get(period) + 1)
        this.indicatorsAVG.set(period, newAvg);
        this.indicatorsGradesCount.set(period, this.indicatorsGradesCount.get(period) + 1);
        
      }     
    }

    getArrayAvg(){
        console.log(this.indicatorsAVG);
        return Array.from(this.indicatorsAVG.values());
    }
}