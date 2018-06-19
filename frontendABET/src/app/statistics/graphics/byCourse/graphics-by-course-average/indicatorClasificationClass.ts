export class IndicatorClasification{

    //almacena las cantidades de notas en una matriz fila:clasificacion, columna:periodo
    //Ejemplo:
    //                  2017-I 2017-II
    //ejemplar          10      20
    //satisfactorio     20      20
    //desarrollado      30      30
    //insatisfactorio   40      30
    
    private countMatrix = new Map();

    //almacena porcentajes en una matriz fila:clasificacion, columna:periodo
    //Ejemplo:
    //                  2017-I 2017-II
    //ejemplar          10      20
    //satisfactorio     20      20
    //desarrollado      30      30
    //insatisfactorio   40      30

    private percentageMatrix = new Map();

    constructor(){

        this.percentageMatrix.set("ejemplar", new Map());
        this.percentageMatrix.set("satisfactorio", new Map());
        this.percentageMatrix.set("desarrollado", new Map());
        this.percentageMatrix.set("insatisfactorio", new Map());

        this.countMatrix.set("ejemplar", new Map());
        this.countMatrix.set("satisfactorio", new Map())
        this.countMatrix.set("desarrollado", new Map())
        this.countMatrix.set("insatisfactorio", new Map())
       
    }

    addGrade(period:string, grade:number){

        var clasification = this.calculateClasification(grade);
        this.updateCountMatrix(clasification, period);
        this.updatePercentageCount(period);
    }

    updateCountMatrix(clasification, period){


        if(this.countMatrix.get(clasification).get(period)){
            var newCount = this.countMatrix.get(clasification).get(period) + 1;
            this.countMatrix.get(clasification).set(period, newCount);
        }else{
            this.countMatrix.get(clasification).set(period, 1);
        }
    }
    updatePercentageCount(period){
        var exemplaryCount = 0;
        var satisfactoryCount = 0;
        var deveolpedCount = 0;
        var unsatisfactoryCount = 0;
        var totalCount = 0;

        exemplaryCount = this.countMatrix.get("ejemplar").get(period);
        satisfactoryCount = this.countMatrix.get("satisfactorio").get(period);
        deveolpedCount = this.countMatrix.get("desarrollado").get(period);
        unsatisfactoryCount = this.countMatrix.get("insatisfactorio").get(period);

        totalCount = exemplaryCount + satisfactoryCount + deveolpedCount + unsatisfactoryCount;

        this.percentageMatrix.get("ejemplar").set(period, (exemplaryCount*100)/totalCount);
        this.percentageMatrix.get("satisfactorio").set(period, (satisfactoryCount*100)/totalCount);
        this.percentageMatrix.get("desarrollado").set(period, (deveolpedCount*100)/totalCount);
        this.percentageMatrix.get("insatisfactorio").set(period, (unsatisfactoryCount*100)/totalCount);
    }

    calculateClasification(grade: number){
        
        if(5 >= grade && grade > 4){
            return "ejemplar";
        }
        if(4 >= grade && grade > 3 ){
            return "satisfactorio";
        }
        if(3 >= grade && grade > 2){
            return "desarrollado";
        }
        if(2 >= grade && grade >= 0){
            return "insatisfactorio";
        }
    
      }

      getPercentages(clasification){
        console.log(clasification);
          console.log(this.percentageMatrix.get(clasification));
          
        return Array.from(this.percentageMatrix.get(clasification));
      }



}