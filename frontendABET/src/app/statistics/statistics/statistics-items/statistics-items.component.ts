import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';

//Original hihgcharts
// import { chart } from 'highcharts';
// import * as Highcharts from 'highcharts';
//Original hihgcharts
import {ActivatedRoute, Router} from '@angular/router'
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Chart, HIGHCHARTS_MODULES, ChartModule, ɵa, ɵb, MapChart, StockChart } from 'angular-highcharts';

import { ViewCompleteGrade } from './../../statistics/entities/viewCompleteGrade';
import { Course } from '../../../statistics/statistics/entities/course';
import { UploadService } from './../../../uploadData/uploadData/uploadData.service';
import { GraphicsService } from './../../graphics/graphics.service';
//import { ChartDirective } from 'angular-highcharts/chart.directive';
///import { ChartObject, ChartOptions } from 'highcharts';

declare var require: any;
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-statistics-items',
  templateUrl: './statistics-items.component.html',
  styleUrls: ['./statistics-items.component.css']
})
export class StatisticsItemsComponent implements OnInit {

  filterTypeList: String[];
  filterSelected: String;
  completeGradesList: ViewCompleteGrade[];
  courseList: Course[];
  courseSelected: Course;

  controlCourse: FormControl;

  controlFilterTypeList: FormControl;

  filteredOptionsForFilterTypeList: Observable<String[]>;
  filteredOptionsForCourse: Observable<String[]>;

  flagFilters = false;
  flagCourse = false;
  flagIndicator = false;
  indicatorsAVG;
  indicatorsGradesCount;

  //chart: Highcharts.ChartObject;
  chart: Object;
  constructor(private graphicsService: GraphicsService, 
    private uploadService: UploadService, private router: Router, route: ActivatedRoute) {
    
    this.filterTypeList = ["Asignatura", "Indicador"];
    this.completeGradesList = [];
    this.indicatorsAVG = new Map();
    this.indicatorsGradesCount = new Map();

    this.filterSelected = "";
    this.controlCourse = new FormControl();
    this.controlFilterTypeList = new FormControl();
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
        this.filteredOptionsForFilterTypeList = this.controlFilterTypeList.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filterFilterType(val))
        );
      }

    //console.log("Conectando..........");
    )
  }

  //Filtro de campo Asignatura
  //Nota: Propio de Angular Material
  filterFilterType(val): String[] {
    return this.filterTypeList.filter(element =>
      (String(element).toLowerCase()).indexOf((String(val)).toLowerCase()) !== -1);
  }

  saveFilterSelected(filterType) {

    this.filterSelected = filterType;
    if(this.filterSelected == "Asignatura"){
      this.flagCourse=true;
      this.router.navigate(['/statistics/course/graphic'])
    }else if(this.filterSelected == "Indicador"){
      this.flagIndicator=true;
      this.router.navigate(['/statistics/indicator/graphic'])

    }
    
    console.log("LO que seleccionó: = ", this.filterSelected)
    this.flagFilters = true;

    // var stringCode = value.split(" ")[0];
  }
}
