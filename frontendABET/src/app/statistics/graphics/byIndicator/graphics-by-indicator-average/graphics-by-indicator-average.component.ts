import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatRadioChange } from '@angular/material';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Chart, HIGHCHARTS_MODULES, ChartModule, ɵa, ɵb, MapChart, StockChart } from 'angular-highcharts';

import { ViewCompleteGrade } from './../../../statistics/entities/viewCompleteGrade';
import { Course } from '../../../../statistics/statistics/entities/course';
import { UploadService } from './../../../../uploadData/uploadData/uploadData.service';
import { GraphicsService } from '../../graphics.service';
import { Indicator } from '../../../statistics/entities/indicator';

import { GradesIndicatorsClasification } from './classes/gradesIndicatorsClasificationClass';
import { CourseBars } from './classes/CourseBarsClass';
import { GradesIndicatorsAvg } from './classes/GradesIndicatorsAvgClass';

@Component({
  selector: 'app-graphics-by-indicator-average',
  templateUrl: './graphics-by-indicator-average.component.html',
  styleUrls: ['./graphics-by-indicator-average.component.css']
})
export class GraphicsByIndicatorAverageComponent implements OnInit {

  selected: string;
  filter: any;

  isGraphic = true;
  courseCod = null;

  arrayRadioButtons = [];
  labelPosition = 'bar-graphic';
  completeGradesList: ViewCompleteGrade[];
  indicatorList: Indicator[];
  indicatorSelected: Indicator;
  
  currentEvent:MatRadioChange;
  
  controlIndicator: FormControl;
  filteredOptionsForIndicator: Observable<string[]>;

  emptyString = " ";
  flagGrades = false;

  
  arrayPeriods; //Almacena todos los periodos que estaran en el eje x de las graficas
  gradesIndicatorsAvg; //Objeto que almacena y calcula los promedios de notas
  gradesIndicatorsClasification; //Objeto que almacena y calcula el porcentaje de notas
  courseBars; //Objeto que almacena y calcula el promedio de notas por asignaturas dado un periodo


  //chart: Highcharts.ChartObject;
  chart: Object;
  constructor(private graphicsService: GraphicsService, private uploadService: UploadService) {
   
    this.controlIndicator = new FormControl();
    // this.graphicsService.changeMessage(this.completeGradesList);
    
    this.completeGradesList = [];
    this.arrayPeriods=[];
    this.gradesIndicatorsAvg = new GradesIndicatorsAvg();
    this.gradesIndicatorsClasification = new GradesIndicatorsClasification();
    this.courseBars = new CourseBars();

    this.currentEvent=null;
    this.arrayRadioButtons = ['bar-graphic', 'percent-graphic', 'multiple-bar-graphic'];

  }

  radioChange(event: MatRadioChange) {
    this.currentEvent = event;

    if (event.value == 'bar-graphic') {
      this.paintGraphic(Array.from(Array.from(this.arrayPeriods)), 1);
    } else if (event.value == 'percent-graphic') {
      this.paintGraphic(Array.from(Array.from(this.arrayPeriods)), 2);
    } else if (event.value == 'multiple-bar-graphic') {
      this.paintGraphic(Array.from(Array.from(this.arrayPeriods)), 3);
    }

  }

  ngOnInit() {

    this.uploadService.getIndicatorsByParams()
      .subscribe(
        rs => this.indicatorList = rs,
        er => console.log(er),
        () => {
          console.log(this.indicatorList);
          //Filtra los indicadores que aparecen en el formulario para el campo Indicador
          //Nota: propio de Angular Material
          this.filteredOptionsForIndicator = this.controlIndicator.valueChanges
            .pipe(
              startWith(''),
              map(val => this.filterIndicators(val))
            );
        })
  }

  paintGraphic(arrayX: any, type: number) {

    if (type == 1) {
      this.chart = new Chart({
        chart: {
          type: 'column'
        },

        plotOptions: {
          column: {
            colorByPoint: true,
            showInLegend: false
          }  
        },
        title: {
          text: 'Gráfica de barras',
        },

        subtitle: {
          text: 'Promedios de las calificaciones sobre 5.0',
        },

        xAxis: {
          categories: arrayX,

        },

        yAxis: {
          title:{
            text: 'Promedios de calificaciones',
          }
        },

        series: [{
          type: 'column',
          data: this.gradesIndicatorsAvg.getArrayAvg()
        }],

      });

    } else if (type == 2) {

      this.chart = new Chart({
        chart: {
          type: 'column'
        },
        title: {
          text: 'Desempeño de los estudiantes'
        },
        xAxis: {
          categories: arrayX
        },
        yAxis: {
          min: 0,
          title: {
            text: '% Total de estudiantes evaluados'
          },
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: 'bold',
              color: 'gray'
            }
          }
        },
        legend: {
          align: 'right',
          x: -30,
          verticalAlign: 'top',
          y: 25,
          floating: true,
          backgroundColor: 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
        },
        tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: true,
              color: 'white'
            }
          }
        },
        series: [{
          name: 'Ejemplar',
          data: this.gradesIndicatorsClasification.getPercentages("ejemplar")
        }, {
          name: 'Satisfactorio',
          data: this.gradesIndicatorsClasification.getPercentages("satisfactorio")
        }, {
          name: 'Desarrollado',
          data: this.gradesIndicatorsClasification.getPercentages("desarrollado")
        }, {
          name: 'Insatisfactorio',
          data: this.gradesIndicatorsClasification.getPercentages("insatisfactorio")
        }]
      });

    } else if (type == 3) {

      this.chart = new Chart({

        chart: {
          type: 'column'
        },

        title: {
          text: 'Multi barras de promedios de calificaciones'
        },

        subtitle: {
          text: 'promedios de calificaciones'
        },

        legend: {
          align: 'right',
          verticalAlign: 'middle',
          layout: 'vertical'
        },

        xAxis: {
          categories: ['2017-1', '2017-2', '2018-1'],
          labels: {
            x: -10
          }
        },

        yAxis: {
          allowDecimals: false,
          title: {
            text: 'Amount'
          }
        },
/*
        series: [{
          name: 'Indicador 1',
          data: [1, 4, 3]
        }, {
          name: 'Indicador 2',
          data: [6, 4, 2]
        }, {
          name: 'Indicador 3',
          data: [8, 4, 3]
        }],*/
        series:
        this.courseBars.getSeries()
      ,

      });

    }

  }

  //Filtro de campo Indicador
  //Nota: Propio de Angular Material
  filterIndicators(val): any[] {
    return this.indicatorList.filter(element =>
      (String(element.identificador_indicador).toLowerCase() + " " + String(element.nombre_indicador).toLowerCase()).indexOf(val.toLowerCase()) !== -1);
  }

  saveIndicatorSelected(value) {

    // var stringId = value.split(" ")[0];
    var stringCode = value.split(" ")[0];

    // this.courseCod = stringId;

    this.indicatorSelected = this.indicatorList.find(indicator => indicator.identificador_indicador === stringCode);

    this.courseCod = this.indicatorSelected.id_indicador;
    

    this.getViewElements();
  }

  getViewElements() {
    this.graphicsService.getViewCompleteGradesByParams(null, null, this.indicatorSelected.id_indicador)
      .subscribe(
        rs => this.completeGradesList = rs,
        er => console.log(er),
        () => {

          if (this.completeGradesList.length > 0) {
            console.log(this.completeGradesList);
            
            this.calculate();
            this.flagGrades = true;
            // this.graphicsService.changeMessage(this.completeGradesList);

            //el grafico que se refresque si ya se habia seleccionado una opción en el radio boton previamente
            if(this.currentEvent!=null)
              this.radioChange(this.currentEvent);            

            

          } else {
            this.flagGrades = false;
          }
        }
      );
  }

  calculate() {
    
    //calculo de los elementos del ejeX para las graficas
    this.arrayPeriods = [];
    this.arrayPeriods = this.calculateArrayX();

    this.gradesIndicatorsAvg.setArrayPeriods(this.arrayPeriods);
    this.gradesIndicatorsClasification.setArrayPeriods(this.arrayPeriods);
    this.courseBars.setArrayPeriods(this.arrayPeriods);

    this.completeGradesList.forEach(element => {

      //// Calculo para la grafica1
      //Calcula los promedios de las notas por cada periodo 
      this.gradesIndicatorsAvg.addGrade(element.periodo, element.calificacion);  

      //// Calculo para la grafica2
      //Calcula la clasicación de las notas por cada periodo
      this.gradesIndicatorsClasification.addGrade(element.periodo, element.calificacion);  

      //// Calculo para la grafica3
      //calcula los promedios de las asignaturas por periodo
      this.courseBars.addGrade(element.periodo, element.identificador_indicador, element.calificacion);

    });
    
  }

  calculateArrayX(){
    
    var arr=[];
    this.completeGradesList.forEach(element => {
      if( arr.indexOf(element.periodo ) == -1){          
        arr.push(element.periodo);
      }
    });
 
    return arr;
  }

  printTypeGraphic(typeGraphic: String) {
    if (typeGraphic == 'bar-graphic') {
      console.log("grafica 1");

    } else {
      console.log("ES OTRA GRAFICA");

    }
  }

}

