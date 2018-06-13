import { Component, OnInit, EventEmitter } from '@angular/core';
//import { ChartModule, ChartComponent } from 'angular2-highcharts';

//import { chart } from 'highcharts';
import { print } from 'util';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Chart, Highcharts, HIGHCHARTS_MODULES, ChartModule, ɵa, ɵb, MapChart, StockChart } from 'angular-highcharts';

import { ViewCompleteGrade } from './../../../statistics/entities/viewCompleteGrade';
import { Course } from '../../../../statistics/statistics/entities/course';
import { UploadService } from './../../../../uploadData/uploadData/uploadData.service';
import { GraphicsService } from '../../graphics.service';
import { ChartDirective } from 'angular-highcharts/chart.directive';
import { ChartObject, ChartOptions } from 'highcharts';

//import * as Highcharts from 'highcharts';
declare var require: any;
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-graphics-by-course-average',
  templateUrl: './graphics-by-course-average.component.html',
  styleUrls: ['./graphics-by-course-average.component.css']
})
export class GraphicsByCourseAverageComponent implements OnInit {

  // @ViewChild('chartTarget') chartTarget: ElementRef;
  // chart: Highcharts.ChartObject;

  completeGradesList: ViewCompleteGrade[];
  courseList: Course[];
  courseSelected: Course;

  controlCourse: FormControl;
  filteredOptionsForCourse: Observable<string[]>;

  emptyString = " ";
  flagGrades = false;
  indicatorsAVG;
  indicatorsGradesCount;

  //highchartO : Highcharts;


  chart: Object;
  constructor(private graphicsService: GraphicsService, private uploadService: UploadService) {
    this.completeGradesList = [];
    this.indicatorsAVG = new Map();
    this.indicatorsGradesCount = new Map();

    this.controlCourse = new FormControl();
    this.graphicsService.changeMessage(this.completeGradesList);

  }

  ngOnInit() {

    this.uploadService.getCourseByParams()
      .subscribe(
        rs => this.courseList = rs,
        er => console.log(er),
        () => {

          //Filtra las Asignaturas que aparecen en el formulario para el campo Asignatura
          //Nota: propio de Angular Material
          this.filteredOptionsForCourse = this.controlCourse.valueChanges
            .pipe(
              startWith(''),
              map(val => this.filterCourses(val))
            );
        })

    //console.log("Conectando..........");

  }

  paintGraphic(arrayX: any, arrayY: any) {

    console.log("-->ENTRANDOOOOOOOOOOOOOOOOOOOOO");

    //Prueba otra grafica
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Desempeño de los estudiante por asignatura'
      },
      xAxis: {
        categories: ['2017-2', '2018-1']
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total de estudiantes evaluados'
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
        data: [10, 20,]
      }, {
        name: 'Satisfactorio',
        data: [20,20]
      }, {
        name: 'Desarrollado',
        data: [50,40]
      },{
        name: 'Insatisfactorio',
        data: [20,20]
      }]
    });
    //Prueba otra grafica


    // this.chart = new Chart({

    //   title: {
    //     text: 'Chart.update',
    //   },

    //   subtitle: {
    //     text: 'Plain',
    //   },

    //   xAxis: {
    //     categories: arrayX,

    //   },

    //   series: [{
    //     type: 'column',
    //     colorByPoint: true,
    //     data: arrayY,
    //     //showInLegend: false

    //   }],

    //   plotOptions: {
    //     bar: {
    //       colorByPoint: true,
    //       showInLegend: false
    //     }
    // }
    // });
  }

  //Filtro de campo Asignatura
  //Nota: Propio de Angular Material
  filterCourses(val): any[] {
    return this.courseList.filter(element =>
      (String(element.codigo).toLowerCase() + " " + String(element.nombre_asignatura).toLowerCase()).indexOf(val.toLowerCase()) !== -1);
  }

  saveCourseSelected(value) {

    var stringCode = value.split(" ")[0];

    this.courseSelected = this.courseList.find(course => course.codigo === stringCode);

    this.getViewElements();
  }

  getViewElements() {
    this.graphicsService.getViewCompleteGradesByParams(this.courseSelected.id_asignatura)
      .subscribe(
        rs => this.completeGradesList = rs,
        er => console.log(er),
        () => {

          if (this.completeGradesList.length > 0) {
            this.calculate();
            this.flagGrades = true;
            this.graphicsService.changeMessage(this.completeGradesList);
            this.paintGraphic(Array.from(this.indicatorsAVG.keys()), Array.from(this.indicatorsAVG.values()))
            console.log(this.indicatorsAVG)
            console.log("LAS LLAVES KEYS////////////", Array.from(this.indicatorsAVG.keys()))

          } else {
            this.flagGrades = false;
          }
        }
      );
  }
  calculate() {
    this.completeGradesList.forEach(element => {
      if (this.indicatorsAVG.get(element.periodo)) {
        var newAvg = ((this.indicatorsAVG.get(element.periodo) * this.indicatorsGradesCount.get(element.periodo)) + element.calificacion) / (this.indicatorsGradesCount.get(element.periodo) + 1)

        this.indicatorsAVG.set(element.periodo, newAvg);
        this.indicatorsGradesCount.set(element.periodo, this.indicatorsGradesCount.get(element.periodo) + 1);
      } else {
        this.indicatorsAVG.set(element.periodo, element.calificacion);
        this.indicatorsGradesCount.set(element.periodo, 1);
      }
    });
  }
}
