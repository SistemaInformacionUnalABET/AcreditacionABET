import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
//Original hihgcharts
// import { chart } from 'highcharts';
// import * as Highcharts from 'highcharts';
//Original hihgcharts
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { Course } from '../../../statistics/statistics/entities/course';
import { UploadService } from './../../../uploadData/uploadData/uploadData.service';
import { GraphicsService } from './../../graphics/graphics.service';
import { ViewCompleteGrade } from './../../statistics/entities/viewCompleteGrade';



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

  fileName: string = 'Abet_calificaciones_todo.xlsx';
  filterTypeList: String[];
  filterSelected: String;
  completeGradesList: ViewCompleteGrade[];
  courseList: Course[];
  courseSelected: Course;

  controlCourse: FormControl;

  controlFilterTypeList: FormControl;

  filteredOptionsForCourse: Observable<String[]>;

  flagFilters = false;
  flagCourse = false;
  flagIndicator = false;
  indicatorsAVG;
  indicatorsGradesCount;

  //chart: Highcharts.ChartObject;
  chart: Object;
  dataForExport: any;



  constructor(private graphicsService: GraphicsService,
    private uploadService: UploadService, private router: Router, route: ActivatedRoute) {

    this.dataForExport = [];

    this.filterTypeList = ["Asignatura", "Indicador"];
    this.completeGradesList = [];
    this.indicatorsAVG = new Map();
    this.indicatorsGradesCount = new Map();

    this.filterSelected = "";
    this.controlCourse = new FormControl();
    this.controlFilterTypeList = new FormControl();
    // this.graphicsService.changeMessage(this.completeGradesList);

  }

  ngOnInit() {
    if (localStorage.getItem('token') == null) {
      let link = ['/login'];
      this.router.navigate(link);
    } else {

      this.uploadService.getCourseByParams()
        .subscribe(
          rs => this.courseList = rs,
          er => console.log(er),
          () => {
          }
        )
    }
  }

  //Filtro de campo Asignatura
  //Nota: Propio de Angular Material
  filterFilterType(val): String[] {
    return this.filterTypeList.filter(element =>
      (String(element).toLowerCase()).indexOf((String(val)).toLowerCase()) !== -1);
  }

  saveFilterSelected(filterType) {

    this.filterSelected = filterType;
    if (this.filterSelected == "Asignatura") {
      this.flagCourse = true;
      this.router.navigate(['/statistics/course/graphic'])
    } else if (this.filterSelected == "Indicador") {
      this.flagIndicator = true;
      this.router.navigate(['/statistics/indicator/graphic'])

    }

    this.flagFilters = true;

  }


  iteratecompleteGradesList() {
    this.dataForExport = [];
    this.dataForExport.push(["id_asignatura", "codigo", "numero_grupo", "id_indicador", "identificador_indicador", "tipo_evaluacion", "tipo_actividad",
      "documento", "calificacion", "descripcion_calificacion", "periodo", "fecha_creacion", "fecha_modificacion", "observacion", "evidencia_url"])

    for (let element of this.completeGradesList) {
      this.dataForExport.push([element.id_asignatura, element.codigo, element.numero_grupo, element.id_indicador, element.identificador_indicador,
      element.tipo_evaluacion, element.tipo_actividad, element.documento, element.calificacion, element.descripcion_calificacion,
      element.periodo, element.fecha_creacion, element.fecha_modificacion, element.observacion, element.evidencia_url
      ])
    }
  }

  export(): void {


    /* generate worksheet */
    this.iteratecompleteGradesList();
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.dataForExport);


    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  getGrades() {
    this.completeGradesList = [];

    this.graphicsService.getViewCompleteGradesByParams()
      .subscribe(listComplete => {
        this.completeGradesList = listComplete
        if (this.completeGradesList.length > 0) {
          this.export();
        } else {
          this.completeGradesList = [];
        }
      })

  }
}
