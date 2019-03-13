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


import { CourseBars } from './classes/CourseBarsClass';
import { ViewIndicatorAvg } from '../../../statistics/entities/viewIndicatorAvg';
import { ViewIndicatorClasification } from '../../../statistics/entities/viewIndicatorClasification';
import { ViewIndicatorCourseAvg } from '../../../statistics/entities/ViewIndicatorCourseAvg';

@Component({
  selector: 'app-graphics-by-indicator-average',
  templateUrl: './graphics-by-indicator-average.component.html',
  styleUrls: ['./graphics-by-indicator-average.component.css']
})
export class GraphicsByIndicatorAverageComponent implements OnInit {

  selected: string;
  filter: any;
  isGraphic = true;
  indicatorId = null;
  arrayRadioButtons = [];
  labelPosition = 'bar-graphic';
  vIndicatorAvgList: ViewIndicatorAvg[];
  vIndicatorClasificationList: ViewIndicatorClasification[];
  vIndicatorCourseAvgList: ViewIndicatorCourseAvg[];

  indicatorList: Indicator[];
  indicatorSelected: Indicator;

  currentEvent: MatRadioChange;
  controlIndicator: FormControl;
  filteredOptionsForCourse: Observable<string[]>;

  emptyString = " ";
  flagGrades = false;
  arrayPeriods1 = []; //Almacena todos los periodos que estaran en el eje x de la grafica1
  courseAvg = []; //Almacena los valores que estaran en el eje y de la grafica1
  arrayPeriods2 = []; //Almacena todos los periodos que estaran en el eje x de la grafica2
  percentageMatrix: any; //Mapa que almacena los porcentajes que se muestran el eje Y de la grafica2
  arrayPeriods3 = []; //Almacena todos los periodos que estaran en el eje x de la grafica3

  courseBars: CourseBars; //Objeto que almacena y calcula el promedio de notas por asignatura dado un indicador


  //chart: Highcharts.ChartObject;
  chart: Object;
  constructor(private graphicsService: GraphicsService, private uploadService: UploadService) {
   
    this.courseBars = new CourseBars();

    this.controlIndicator = new FormControl();
    this.currentEvent = null;
    this.arrayRadioButtons = ['Barras', 'Porcentajes', 'Barras múltiples'];

    this.percentageMatrix = new Map();

    this.percentageMatrix.set("ejemplar", []);
    this.percentageMatrix.set("satisfactorio", []);
    this.percentageMatrix.set("desarrollado", []);
    this.percentageMatrix.set("insatisfactorio", []);
  }

  radioChange(event: MatRadioChange) {
    this.currentEvent = event;

    if (event.value == 'Barras') {
      this.paintGraphic(Array.from(this.arrayPeriods1), 1);
    } else if (event.value == 'Porcentajes') {
      this.paintGraphic(Array.from(this.arrayPeriods2), 2);
    } else if (event.value == 'Barras múltiples') {
      this.paintGraphic(Array.from(this.arrayPeriods3), 3);
    }

  }

  ngOnInit() {

    this.uploadService.getIndicatorsByParams()
      .subscribe(
        rs => this.indicatorList = rs,
        er => console.log(er),
        () => {
         
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
          data: this.courseAvg,
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
          data: this.percentageMatrix.get("ejemplar")
        }, {
          name: 'Satisfactorio',
          data: this.percentageMatrix.get("satisfactorio")
        }, {
          name: 'Desarrollado',
          data: this.percentageMatrix.get("desarrollado")
        }, {
          name: 'Insatisfactorio',
          data: this.percentageMatrix.get("insatisfactorio")
        }]
      });

    } else if (type == 3) {

      this.chart = new Chart({

        chart: {
          type: 'column'
        },

        title: {
          text: 'Multi barras - promedios de calificaciones'
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
          categories: arrayX,
          labels: {
            x: -10
          }
        },

        yAxis: {
          allowDecimals: false,
          title: {
            text: 'Promedio de calificaciones por asignatura'
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

  saveIndicatorSelected(value) {

    // var stringId = value.split(" ")[0];
    var stringCode = value.split(" ")[0];

    // this.courseCod = stringId;

    this.indicatorSelected = this.indicatorList.find(indicator => indicator.identificador_indicador === stringCode);

    this.indicatorId= this.indicatorSelected.id_indicador;
    

    this.getViewElements();
  }

  getViewElements() {
    this.graphicsService.getViewIndicatorAvgByParams(this.indicatorSelected.id_indicador)
    .subscribe(
      rs => this.vIndicatorAvgList = rs,
      er => console.log(er),
      () => {
        if (this.vIndicatorAvgList.length > 0) {
          //calculo de los elementos del ejeX para las grafica1 
          this.arrayPeriods1 = [];
          this.arrayPeriods1 = this.vIndicatorAvgList.map(value => {
            return value['periodo'];
          });

          //calculo de los elementos del ejeY para las grafica1 
          this.courseAvg = this.vIndicatorAvgList.map(value => {
            return value['avg'];
          });

          //el grafico que se refresque si ya se habia seleccionado una opción en el radio boton previamente
          if (this.currentEvent != null) {
            this.radioChange(this.currentEvent);
          }

          this.flagGrades = true;

        } else {
          this.flagGrades = false;
        }

      });

  this.graphicsService.getViewIndicatorClasificationByParams(this.indicatorSelected.id_indicador)
    .subscribe(
      rs => this.vIndicatorClasificationList = rs,
      er => console.log(er),
      () => {
        if (this.vIndicatorClasificationList.length > 0) {
          //calculo de los elementos del ejeX para las grafica2 
          this.arrayPeriods2 = [];
          this.arrayPeriods2 = this.vIndicatorClasificationList.map(value => {
            return value['periodo'];
          });

          //calculo de los elementos del ejeY para las grafica2
          var arrTemp = this.vIndicatorClasificationList.map(value => {
            return value['ejemplar'];
          });

          this.percentageMatrix.set('ejemplar', arrTemp);

          var arrTemp = this.vIndicatorClasificationList.map(value => {
            return value['satisfactorio'];
          });

          this.percentageMatrix.set('satisfactorio', arrTemp);

          var arrTemp = this.vIndicatorClasificationList.map(value => {
            return value['desarrollado'];
          });

          this.percentageMatrix.set('desarrollado', arrTemp);

          var arrTemp = this.vIndicatorClasificationList.map(value => {
            return value['insatisfactorio'];
          });

          this.percentageMatrix.set('insatisfactorio', arrTemp);

          //el grafico que se refresque si ya se habia seleccionado una opción en el radio boton previamente
          if (this.currentEvent != null) {
            this.radioChange(this.currentEvent);
          }

        }

      });

  this.graphicsService.getViewIndicatorCourseAvgByParams(this.indicatorSelected.id_indicador)
    .subscribe(
      rs => this.vIndicatorCourseAvgList = rs,
      er => console.log(er),
      () => {
        if (this.vIndicatorCourseAvgList.length > 0) {

          //calculo de los elementos del ejeX para la grafica3
          this.arrayPeriods3 = [];
          this.arrayPeriods3 = this.calculateArrayX(this.vIndicatorCourseAvgList);
          this.courseBars.setArrayPeriods(this.arrayPeriods3);
          this.vIndicatorCourseAvgList.forEach(element => {

            //// Calculo para la grafica3
            //calcula los promedios de los indadores por periodo
            this.courseBars.addGrade(element.periodo, String(element.codigo), element.avg);

          });

          //el grafico que se refresque si ya se habia seleccionado una opción en el radio boton previamente
          if (this.currentEvent != null) {
            this.radioChange(this.currentEvent);
          }
        }

      });
  }

  calculateArrayX(array) {
    var arr = [];
    array.forEach(element => {
      if (arr.indexOf(element.periodo) == -1) {
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

