import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { } from 'angular2-highcharts';
import { print } from 'util';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ViewCompleteGrade } from './../../../statistics/entities/viewCompleteGrade';
import { Course } from '../../../../statistics/statistics/entities/course';
import { UploadService } from './../../../../uploadData/uploadData/uploadData.service';
import { GraphicsService } from '../../graphics.service';

@Component({
  selector: 'app-graphics-by-course-average',
  templateUrl: './graphics-by-course-average.component.html',
  styleUrls: ['./graphics-by-course-average.component.css']
})
export class GraphicsByCourseAverageComponent implements OnInit {

  completeGradesList: ViewCompleteGrade[];
  courseList: Course[];
  courseSelected: Course;

  controlCourse: FormControl;
  filteredOptionsForCourse: Observable<string[]>;

  emptyString = " ";
  flagGrades = false;
  indicatorsAVG;
  indicatorsGradesCount;



  options: Object;


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

  paintGraphic(arrayX:any, arrayY:any){

    this.options = {

      title: {
        text: 'Promedio de indicadores por periodo'
      },

      subtitle: {
        text: 'Plain'
      },

      xAxis: {
        //categories: ['2017-2', '2018-1', '2018-2']
        categories : arrayX

      },

      series: [{
        type: 'column',
        colorByPoint: true,
        // data: [50, 50, 90],
        data: arrayY,
        showInLegend: false
      }]

    }; 
    
    
    
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
            this.paintGraphic(Array.from( this.indicatorsAVG.keys()), Array.from( this.indicatorsAVG.values()))
            console.log(this.indicatorsAVG)
            console.log("LAS LLAVES KEYS////////////", Array.from( this.indicatorsAVG.keys()))

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
