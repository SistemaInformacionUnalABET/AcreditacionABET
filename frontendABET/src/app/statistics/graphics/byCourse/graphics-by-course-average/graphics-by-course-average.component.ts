import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material';
//Original hihgcharts
// import { chart } from 'highcharts';
// import * as Highcharts from 'highcharts';
//Original hihgcharts

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Chart, HIGHCHARTS_MODULES, ChartModule, ɵa, ɵb, MapChart, StockChart } from 'angular-highcharts';

import { Course } from '../../../../statistics/statistics/entities/course';
import { UploadService } from './../../../../uploadData/uploadData/uploadData.service';
import { GraphicsService } from '../../graphics.service';
import { IndicatorsBars } from './classes/IndicatorsBarsClass';
import { ViewCourseAvg } from '../../../statistics/entities/viewCourseAvg';
import { ViewCourseClasification } from '../../../statistics/entities/viewCourseClasification';
import { ViewCourseIndicatorAvg } from '../../../statistics/entities/viewCourseIndicatorAvg';

//import { ChartDirective } from 'angular-highcharts/chart.directive';
///import { ChartObject, ChartOptions } from 'highcharts';

declare var require: any;
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-graphics-by-course-average',
  templateUrl: './graphics-by-course-average.component.html',
  styleUrls: ['./graphics-by-course-average.component.css']
})
export class GraphicsByCourseAverageComponent implements OnInit {

  selected: string;
  filter: any;
  isGraphic = true;
  courseCod = null;
  arrayRadioButtons = [];
  labelPosition = 'bar-graphic';
  vCourseAvgList: ViewCourseAvg[];
  vCourseClasificationList: ViewCourseClasification[];
  vCourseIndAvgList: ViewCourseIndicatorAvg[];


  courseList: Course[];
  courseSelected: Course;

  currentEvent: MatRadioChange;
  controlCourse: FormControl;
  filteredOptionsForCourse: Observable<string[]>;

  emptyString = " ";
  flagGrades = false;
  arrayPeriods1 = []; //Almacena todos los periodos que estaran en el eje x de la grafica1
  indicatorsAvg = []; //Almacena los valores que estaran en el eje y de la grafica1
  arrayPeriods2 = []; //Almacena todos los periodos que estaran en el eje x de la grafica2
  percentageMatrix: any; //Mapa que almacena los porcentajes que se muestran el eje Y de la grafica2
  arrayPeriods3 = []; //Almacena todos los periodos que estaran en el eje x de la grafica3

  indicatorsBars: IndicatorsBars; //Objeto que almacena y calcula el promedio de notas por indicadores dado un periodo



  //chart: Highcharts.ChartObject;
  chart: Object;
  constructor(private graphicsService: GraphicsService, private uploadService: UploadService) {

    this.indicatorsBars = new IndicatorsBars();

    this.controlCourse = new FormControl();
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

    console.log(event.value);

  }

  ngOnInit() {

    this.uploadService.getCourseByParams()
      .subscribe(
        rs => this.courseList = rs,
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
          title: {
            text: 'Promedios de calificaciones',
          }
        },

        series: [{
          type: 'column',
          data: this.indicatorsAvg,
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
          text: 'Promedios de calificaciones'
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
            text: 'Promedio de calificaciones por indicador'
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
        }],
        */

        series:
          this.indicatorsBars.getSeries()
        ,
      });
    }
  }


  saveCourseSelected(value) {

    var stringCode = value.split(" ")[0];

    this.courseSelected = this.courseList.find(course => course.codigo === stringCode);
    this.courseCod = this.courseSelected.id_asignatura;

    this.getViewElements();
  }

  getViewElements() {



    this.graphicsService.getViewCourseAvgByParams(this.courseSelected.id_asignatura)
      .subscribe(
        rs => this.vCourseAvgList = rs,
        er => console.log(er),
        () => {
          if (this.vCourseAvgList.length > 0) {
            //calculo de los elementos del ejeX para las grafica1 
            this.arrayPeriods1 = [];
            this.arrayPeriods1 = this.vCourseAvgList.map(value => {
              return value['periodo'];
            });

            //calculo de los elementos del ejeY para las grafica1 
            this.indicatorsAvg = this.vCourseAvgList.map(value => {
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

    this.graphicsService.getViewCourseClasificationByParams(this.courseSelected.id_asignatura)
      .subscribe(
        rs => this.vCourseClasificationList = rs,
        er => console.log(er),
        () => {
          if (this.vCourseClasificationList.length > 0) {
            //calculo de los elementos del ejeX para las grafica2 
            this.arrayPeriods2 = [];
            this.arrayPeriods2 = this.vCourseClasificationList.map(value => {
              return value['periodo'];
            });

            //calculo de los elementos del ejeY para las grafica2

            var arrTemp = this.vCourseClasificationList.map(value => {
              return value['ejemplar'];
            });

            this.percentageMatrix.set('ejemplar', arrTemp);

            var arrTemp = this.vCourseClasificationList.map(value => {
              return value['satisfactorio'];
            });

            this.percentageMatrix.set('satisfactorio', arrTemp);

            var arrTemp = this.vCourseClasificationList.map(value => {
              return value['desarrollado'];
            });

            this.percentageMatrix.set('desarrollado', arrTemp);

            var arrTemp = this.vCourseClasificationList.map(value => {
              return value['insatisfactorio'];
            });

            this.percentageMatrix.set('insatisfactorio', arrTemp);

            //el grafico que se refresque si ya se habia seleccionado una opción en el radio boton previamente
            if (this.currentEvent != null) {
              this.radioChange(this.currentEvent);
            }

          }

        });

    this.graphicsService.getViewCourseIndicatorAvgByParams(this.courseSelected.id_asignatura)
      .subscribe(
        rs => this.vCourseIndAvgList = rs,
        er => console.log(er),
        () => {
          if (this.vCourseIndAvgList.length > 0) {

            console.log("vCourseIndAvgList -> ", this.vCourseIndAvgList);

            //calculo de los elementos del ejeX para la grafica3
            this.arrayPeriods3 = [];
            console.log("this.arrayPeriods3 >>> ", this.arrayPeriods3);

            this.arrayPeriods3 = this.calculateArrayX(this.vCourseIndAvgList);
            console.log("this.arrayPeriods3 >>> ", this.arrayPeriods3);

            this.indicatorsBars.setArrayPeriods(this.arrayPeriods3);

            this.vCourseIndAvgList.forEach(element => {

              //// Calculo para la grafica3
              //calcula los promedios de los indadores por periodo
              this.indicatorsBars.addGrade(element.periodo, element.identificador_indicador, element.avg);

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
