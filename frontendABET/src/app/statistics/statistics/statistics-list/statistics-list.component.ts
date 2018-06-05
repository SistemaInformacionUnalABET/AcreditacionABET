import { Component, OnInit } from '@angular/core';
import { Indicator } from './../entities/indicator';
import { StatisticsServices } from './../statistics.service';
import { ViewCompleteGrade } from './../../statistics/entities/viewCompleteGrade';


import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { UploadService } from '../../../uploadData/uploadData/uploadData.service';
import { Course } from '../../../statistics/statistics/entities/course';



@Component({
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html',
  styleUrls: ['./statistics-list.component.css']
})
export class StatisticsListComponent implements OnInit {

  completeGradesList: ViewCompleteGrade[];
  courseList: Course[];
  courseSelected: Course;

  controlCourse: FormControl;
  filteredOptionsForCourse: Observable<string[]>;
  
  emptyString = " ";
  flagGrades = true;
  indicatorsAVG;
  indicatorsGradesCount;
  



  constructor(
    private services: StatisticsServices,
    private uploadService: UploadService) {

    this.completeGradesList = [];
    this.indicatorsAVG=new Map();
    this.indicatorsGradesCount = new Map();

    this.controlCourse = new FormControl();
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

  }

  //Filtro de campo Asignatura
  //Nota: Propio de Angular Material
  filterCourses(val): any[] {
    return this.courseList.filter(element =>
      (String(element.codigo).toLowerCase() + " " + String(element.nombre_asignatura).toLowerCase()).indexOf(val.toLowerCase()) !== -1);
  }

  saveCourseSelected(value) {

    var stringCode =  value.split(" ")[0];

    this.courseSelected = this.courseList.find(course => course.codigo === stringCode);
    
    this.getViewElements();
  }

  getViewElements(){
    this.services.getViewCompleteGradesByParams(this.courseSelected.id_asignatura)
      .subscribe(
        rs => this.completeGradesList = rs,
        er => console.log(er),
        () => { 

          if(this.completeGradesList.length > 0){
            this.flagGrades = true;
            this.calculate();
            console.log(this.indicatorsAVG)
          }else{
            this.flagGrades = false;
          }
        }
      );  
  }

  calculate(){
    this.completeGradesList.forEach(element => {
      if( this.indicatorsAVG.get( element.periodo ) ){
       var newAvg = ((this.indicatorsAVG.get( element.periodo ) * this.indicatorsGradesCount.get(element.periodo)) + element.calificacion) / (this.indicatorsGradesCount.get(element.periodo) + 1)
       
       this.indicatorsAVG.set(element.periodo, newAvg);
       this.indicatorsGradesCount.set(element.periodo, this.indicatorsGradesCount.get(element.periodo) + 1);
      }else{
        this.indicatorsAVG.set(element.periodo, element.calificacion);
        this.indicatorsGradesCount.set(element.periodo, 1);
      }
    });

  }

}
