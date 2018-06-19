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
        console.log(">>>>  la nota que llega");
        console.log(period, grade);
        
        var clasification = this.calculateClasification(grade);

        this.updateCountMatrix(clasification, period);
        this.updatePercentageCount(period);

        console.log(">>>>> las tablas que actualiza");
        console.log(this.percentageMatrix);
        console.log(this.countMatrix);

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
        var developedCount = 0;
        var unsatisfactoryCount = 0;
        var totalCount = 0;
        
        
        if(this.countMatrix.get("ejemplar").get(period) == null){
            this.countMatrix.get("ejemplar").set(period, 0);
            this.percentageMatrix.get("ejemplar").set(period, 0)
        }

        if(this.countMatrix.get("satisfactorio").get(period) == null){
            this.countMatrix.get("satisfactorio").set(period, 0);
            this.percentageMatrix.get("satisfactorio").set(period, 0)
        }

        if(this.countMatrix.get("desarrollado").get(period) == null){
            this.countMatrix.get("desarrollado").set(period, 0);
            this.percentageMatrix.get("desarrollado").set(period, 0)
        }

        if(this.countMatrix.get("insatisfactorio").get(period) == null){
            this.countMatrix.get("insatisfactorio").set(period, 0);
            this.percentageMatrix.get("insatisfactorio").set(period, 0)
        }

        exemplaryCount = this.countMatrix.get("ejemplar").get(period);
        satisfactoryCount = this.countMatrix.get("satisfactorio").get(period);
        developedCount = this.countMatrix.get("desarrollado").get(period);
        unsatisfactoryCount = this.countMatrix.get("insatisfactorio").get(period);

        totalCount = exemplaryCount + satisfactoryCount + developedCount + unsatisfactoryCount;

        var exemplaryPercentage = (exemplaryCount*100)/totalCount;
        var satisfactoryPercentage = (satisfactoryCount*100)/totalCount;
        var developedPercentage = (developedCount*100)/totalCount;
        var unsatisfactoryPercentage = (unsatisfactoryCount*100)/totalCount;
        
        
        this.percentageMatrix.get("ejemplar").set(period, Math.round(exemplaryPercentage*100)/100);
        this.percentageMatrix.get("satisfactorio").set(period, Math.round(satisfactoryPercentage*100)/100);
        this.percentageMatrix.get("desarrollado").set(period, Math.round(developedPercentage*100)/100);
        this.percentageMatrix.get("insatisfactorio").set(period, Math.round(unsatisfactoryPercentage*100)/100);
    }

    calculateClasification(grade: number){
        
        if(5 >= grade && grade >= 4){
            return "ejemplar";
        }
        if(4 > grade && grade >= 3 ){
            return "satisfactorio";
        }
        if(3 > grade && grade >= 2){
            return "desarrollado";
        }
        if(2 > grade && grade >= 0){
            return "insatisfactorio";
        }
    
      }

      getPercentages(clasification){
        console.log(clasification);
          console.log(this.percentageMatrix.get(clasification));
          
        return Array.from(this.percentageMatrix.get(clasification));
      }



}