import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { OrdersService } from './../uploadData.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Indicators } from '../../../statistics/statistics/entities/indicators';
import { Commons } from '../../../statistics/statistics/entities/commons';
import { Goal } from '../../../statistics/statistics/entities/goal'
import { Course } from '../../../statistics/statistics/entities/course'
import { Group } from '../../../statistics/statistics/entities/Group'


import { FormBuilder, FormControl, FormGroup, Validators, COMPOSITION_BUFFER_MODE } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { logging } from 'selenium-webdriver';

@Component({
  selector: 'app-uploadData-new',
  templateUrl: './uploadData-new.component.html',
  providers: [OrdersService],
  //styleUrls: ['./orders-new.component.css'],
  styleUrls: ['./uploadData-new.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class uploadDataNewComponent implements OnInit {


  ///// Para borrar ///////
  indicador: Indicators;
  common: Commons;
  lists: Commons[];
  /////////////////////

  goalList: Goal[];
  indicatorList: Indicators[];
  courseList: Course[];
  groupList: Group[];


  goalSelected: Goal;
  courseSelected: Course;

  form: FormGroup;

  myControl: FormControl = new FormControl();
  controlIndicator: FormControl = new FormControl();
  controlCourse: FormControl = new FormControl();
  controlGroup: FormControl = new FormControl();

  filteredOptions: Observable<string[]>;
  filteredOptionsForIndicators: Observable<string[]>;
  filteredOptionsForCourse: Observable<string[]>;
  filteredOptionsForGroups: Observable<string[]>;

  emptyString = " ";
  variable = false;
  variableCourse = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: OrdersService,
    private fb: FormBuilder

  ) {
    this.indicador = new Indicators(0, 0, '', '', '');
    this.common = new Commons(0, '', '');

    this.myControl = new FormControl();
    this.controlIndicator = new FormControl();
    this.controlCourse = new FormControl();

    this.filteredOptions = null;
    this.filteredOptionsForIndicators = null;
    this.filteredOptionsForCourse = null;

    this.goalList = [];
    this.indicatorList = [];
    this.courseList = [];

  }

  ngOnInit() {
    //Nota: comento este codigo porque con el no me funciona, pregutar a daniel.
    //let id = this.route.snapshot.params['id'];
    //if (!id) return;
    //console.log(id);

    this.service.getAllGoals()
      .subscribe(
        rs => this.goalList = rs,
        er => console.log(er),
        () => {

          console.log("################# Meta", this.goalList);

          //Filtra las metas que aparecen en el formulario para el campo Meta
          //Nota: propio de Angular Material
          this.filteredOptions = this.myControl.valueChanges
            .pipe(
              startWith(''),
              map(val => this.filter(val))
            );
        })

    this.service.getCourseByParams()
      .subscribe(
        rs => this.courseList = rs,
        er => console.log(er),
        () => {

          console.log("################# course", this.courseList);

          //Filtra las Asignaturas que aparecen en el formulario para el campo Asignatura
          //Nota: propio de Angular Material
          this.filteredOptionsForCourse = this.controlCourse.valueChanges
            .pipe(
              startWith(''),
              map(val => this.filterCourses(val))
            );
        })


  }
  //Filtro de campo Meta
  //Nota: Propio de Angular Material
  filter(val): any[] {
    return this.goalList.filter(element =>
      (String(element.identificador_meta).toLowerCase() + " " + String(element.nombre_meta).toLowerCase()).indexOf(val.toLowerCase()) !== -1);
  }

  //Filtro de campo Asignatura
  //Nota: Propio de Angular Material
  filterCourses(val): any[] {
    return this.courseList.filter(element =>
      (String(element.codigo).toLowerCase() + " " + String(element.nombre_asisgnatura).toLowerCase()).indexOf(val.toLowerCase()) !== -1);
  }

  fillIndicatorSelector(goal) {

    this.variable = true;

    this.goalSelected = goal;
    var goalId = this.goalSelected.id_meta;

    this.service.getIndicatorsByParams(null, goalId)
      .subscribe(
        rs => this.indicatorList = rs,
        er => console.log(er),
        () => {

          //Filtra los INDICADORES que aparecen en el formulario para el campo Indicador
          //Nota: propio de Angular Material
          this.filteredOptionsForIndicators = this.controlIndicator.valueChanges
            .pipe(
              startWith(''),
              map(val => this.filterIndicators(val))
            );
        }
      )
  }

  fillGroupSelector(course) {

    this.variableCourse = true;

    this.courseSelected = course;
    var courseId = this.courseSelected.id_asignatura;

    this.service.getGroupByParams(null, courseId)
      .subscribe(
        rs => this.groupList = rs,
        er => console.log(er),
        () => {

          //Filtra los GRUPOS que aparecen en el formulario para el campo grupo
          //Nota: propio de Angular Material
          this.filteredOptionsForGroups = this.controlGroup.valueChanges
            .pipe(
              startWith(''),
              map(val => this.filterGroups(val))
            );
        }
      )
  }


  //Filtro de campo Indicador
  //Nota: Propio de Angular Material
  filterIndicators(val): any[] {
    return this.indicatorList.filter(element =>
      (String(element.identificador_indicador).toLowerCase() + " " + String(element.nombre_indicador).toLowerCase()).indexOf(val.toLowerCase()) !== -1);
  }


  //Filtro de campo Indicador
  //Nota: Propio de Angular Material
  filterGroups(val): any[] {
    return this.groupList.filter(element =>
      ((String(element.numero_grupo)).toLowerCase()).indexOf((String(val)).toLowerCase()) !== -1);
  }


  // arrayBuffer: any;
  // file: File;
  // incomingfile(event) {
  //   this.file = event.target.files[0];
  // }
  /*
    Upload() {
      console.log("entro aca")
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log("esto> ", XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        if (XLSX.utils.sheet_to_json(worksheet, { raw: true }).length > 0) {
  
          var excelDatas = XLSX.utils.sheet_to_json(worksheet, { raw: true });
  
          console.log("ELEMENTO TODO", excelDatas);
  
          this.indicador.id_indicador = null;
          this.indicador.id_meta = null;
          this.indicador.id_comun = null;
          this.indicador.identificador_indicador = excelDatas[0]['identificador_indicador'];
  
          this.common.id_comun = null;
          this.common.nombre = excelDatas[0]['nombre_meta'];;
          this.common.descripcion = null;
  
          console.log("ELEMENTO [0][indentificador]", this.indicador.identificador_indicador);
  
          var lastIdComunMetas: any;
          var lastIdComunIndicador: any;
          var lastIdComunAsignatura: any;
          var lastIdComunEvaluacion: any;
          var lastIdComunActividad: any;
  
  
  
          //Insertar nombre de meta a comun y obtener el id del mismo
          this.service.addCommons(this.common)
            .subscribe(
  
              result => {
                if (result) {
                  this.service.getCommons()
                    .subscribe(
                      result2 => {
                        if (result2) {
                          lastIdComunMetas = result2[0];
                          console.log("Last ID comun METASSSSS ", lastIdComunMetas)
  
  
                          //Añadiendo un nombre de indicador a common
                          this.common.id_comun = null;
                          this.common.nombre = excelDatas[0]['nombre_indicador'];;
                          this.common.descripcion = null;
  
  
                          this.service.addCommons(this.common)
                            .subscribe(
  
                              result => {
                                if (result) {
                                  this.service.getCommons()
                                    .subscribe(
                                      result2 => {
                                        if (result2) {
                                          lastIdComunIndicador = result2[0];
                                          console.log("Last ID comun INDICADOR ", lastIdComunIndicador)
  
  
                                          //anadiendo nombre de asignatura a la tabla comon
                                          this.common.id_comun = null;
                                          this.common.nombre = excelDatas[0]['nombre_asignatura'];;
                                          this.common.descripcion = null;
  
  
                                          this.service.addCommons(this.common)
                                            .subscribe(
  
                                              result => {
                                                if (result) {
                                                  this.service.getCommons()
                                                    .subscribe(
                                                      result2 => {
                                                        if (result2) {
                                                          lastIdComunAsignatura = result2[0];
                                                          console.log("Last ID comun Asignatura ", lastIdComunAsignatura)
  
                                                          //anadiendo nombre de evaluacion a common
  
                                                          this.common.id_comun = null;
                                                          this.common.nombre = excelDatas[0]['nombre_evaluacion'];;
                                                          this.common.descripcion = null;
  
  
                                                          this.service.addCommons(this.common)
                                                            .subscribe(
  
                                                              result => {
                                                                if (result) {
                                                                  this.service.getCommons()
                                                                    .subscribe(
                                                                      result2 => {
                                                                        if (result2) {
                                                                          lastIdComunEvaluacion = result2[0];
                                                                          console.log("Last ID comun Evaluacion ", lastIdComunEvaluacion)
  
                                                                          //anadiendo nombre de actividad a la tabla comon
                                                                          this.common.id_comun = null;
                                                                          this.common.nombre = excelDatas[0]['nombre_actividad'];;
                                                                          this.common.descripcion = null;
  
  
                                                                          this.service.addCommons(this.common)
                                                                            .subscribe(
  
                                                                              result => {
                                                                                if (result) {
                                                                                  this.service.getCommons()
                                                                                    .subscribe(
                                                                                      result2 => {
                                                                                        if (result2) {
                                                                                          lastIdComunActividad = result2[0];
                                                                                          console.log("Last ID comun Actividad ", lastIdComunActividad)
  
                                                                                        }
                                                                                      }
                                                                                    )
  
                                                                                }
                                                                              }
  
                                                                            );
  
  
                                                                        }
                                                                      }
                                                                    )
  
                                                                }
                                                              }
  
                                                            );
  
  
                                                        }
                                                      }
                                                    )
  
                                                }
                                              }
  
                                            );
  
  
  
                                        }
                                      }
                                    )
  
                                }
                              }
  
                            );
  
  
                        }
                      }
                    )
  
                }
              }
  
            );
  
  
  
          // this.service.addIndicators(this.indicador)
          //   .subscribe(
          //     rt => console.log("rt= ", rt),
          //     er => console.log("error= ", er),
          //     () => console.log("Terminado")        
          //   )
        }
      }
      fileReader.readAsArrayBuffer(this.file);
    }
  */
}