import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { OrdersService } from './../uploadData.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Indicator } from '../../../statistics/statistics/entities/indicator';
import { Commons } from '../../../statistics/statistics/entities/commons';
import { Goal } from '../../../statistics/statistics/entities/goal'
import { Course } from '../../../statistics/statistics/entities/course'
import { Group } from '../../../statistics/statistics/entities/group'
import { Student } from '../../../statistics/statistics/entities/student'
import { Evaluation } from '../../../statistics/statistics/entities/evaluation';
import { Activity } from '../../../statistics/statistics/entities/activity';
import { StudentGroup } from '../../../statistics/statistics/entities/studentGroup';

import { CourseIndicator } from '../../../statistics/statistics/entities/courseIndicator'


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
  common: Commons;
  lists: Commons[];
  /////////////////////

  goalList: Goal[];
  indicatorList: Indicator[];
  courseList: Course[];
  groupList: Group[];
  evaluationTypeList: String[];
  activityTypeList: String[];

  student: Student;

  goalSelected: Goal;
  indicatorSelected: Indicator;
  courseSelected: Course;
  groupSelected: Group;
  evaluationSelected: Evaluation;
  activitySelected: Activity;
  studentGroup: StudentGroup;
  courseIndicator: CourseIndicator;

  form: FormGroup;

  myControl: FormControl;
  controlIndicator: FormControl;
  controlCourse: FormControl;
  controlGroup: FormControl;
  controlEvaluationType: FormControl;
  controlActivityType: FormControl;

  filteredOptions: Observable<string[]>;
  filteredOptionsForIndicators: Observable<string[]>;
  filteredOptionsForCourse: Observable<string[]>;
  filteredOptionsForGroups: Observable<string[]>;
  filteredOptionsForEvaluationsType: Observable<String[]>;
  filteredOptionsForActivitiesType: Observable<String[]>;

  emptyString = " ";
  variable = false;
  variableCourse = false;
  isFile = false;
  flagStudentGroup = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: OrdersService,
    private fb: FormBuilder

  ) {

    this.myControl = new FormControl();
    this.controlIndicator = new FormControl();
    this.controlCourse = new FormControl();
    this.controlGroup = new FormControl();
    this.controlEvaluationType = new FormControl();
    this.controlActivityType = new FormControl();

    this.goalSelected = new Goal(null, null, null, null);
    this.indicatorSelected = new Indicator(null, null, null, null, null);
    this.courseSelected = new Course(null, null, null, null);
    this.groupSelected = new Group(null, null, null);
    this.evaluationSelected = new Evaluation(null, null, null);
    this.activitySelected = new Activity(null, null, null, null);
    this.student = new Student(null, null, null, null);
    this.studentGroup = new StudentGroup(null, null, null, null);
    this.courseIndicator = new CourseIndicator(null, null, null);


    this.goalList = [];
    this.indicatorList = [];
    this.courseList = [];
    this.groupList = [];
    this.evaluationTypeList = ["Auto-evaluación", "Co-evalución", "Hetero-evaluación"];
    this.activityTypeList = [
      "Cuestionario",
      "Debate",
      "Informe",
      "Lectura de articulos",
      "Parcial",
      "Práctica de laboratorio",
      "Presentación de propuesta",
      "Presentación oral",
      "Prototipo",
      "Proyecto de clase",
      "Proyecto final",
      "Quíz",
      "Resúmenes",
      "Matriz de evaluación (rubrica)",
      "Simulación",
      "Solución a un problema",
      "Sustentación en grupo",
      "Otro"
    ];

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
          //Filtra las Asignaturas que aparecen en el formulario para el campo Asignatura
          //Nota: propio de Angular Material
          this.filteredOptionsForCourse = this.controlCourse.valueChanges
            .pipe(
              startWith(''),
              map(val => this.filterCourses(val))
            );
        })


    //Filtra las Evaluaciones que aparecen en el formulario para el campo Evaluacion
    //Nota: propio de Angular Material
    this.filteredOptionsForEvaluationsType = this.controlEvaluationType.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterEvaluationsType(val))
      );

    //Filtra las Actividades que aparecen en el formulario para el campo Actividad
    //Nota: propio de Angular Material
    this.filteredOptionsForActivitiesType = this.controlActivityType.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterActivitiesType(val))
      );
  }

  saveGoalSelected(goal) {
    this.goalSelected = goal;
    this.fillIndicatorSelector();
  }
  saveIndicatorSelected(indicator) {
    this.indicatorSelected = indicator;
  }

  saveCourseSelected(course) {
    this.courseSelected = course;
    this.fillGroupSelector();
  }

  saveGroupSelected(group) {
    this.groupSelected = group;
  }

  saveEvaluationSelected(evaluationType) {
    this.evaluationSelected.tipo_evaluacion = evaluationType;
  }
  saveActivitySelected(activityType) {
    this.activitySelected.tipo_actividad = activityType;
  }


  fillIndicatorSelector() {

    this.variable = true;
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

  fillGroupSelector() {

    this.variableCourse = true;
    var courseId = this.courseSelected.id_asignatura;

    this.service.getGroupByParams(null, courseId, null)
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
      (String(element.codigo).toLowerCase() + " " + String(element.nombre_asignatura).toLowerCase()).indexOf(val.toLowerCase()) !== -1);
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

  //Filtro de campo Evaluacion
  //Nota: Propio de Angular Material
  filterEvaluationsType(val): String[] {
    return this.evaluationTypeList.filter(element =>
      (String(element).toLowerCase()).indexOf((String(val)).toLowerCase()) !== -1);
  }
  //Filtro de campo Actividad
  //Nota: Propio de Angular Material
  filterActivitiesType(val): String[] {
    return this.activityTypeList.filter(element =>
      (String(element).toLowerCase()).indexOf((String(val)).toLowerCase()) !== -1);
  }


  arrayBuffer: any;
  file: File;
  incomingfile(event) {
    this.file = event.target.files[0];
    this.isFile = true;
  }

  upload() {
    console.log("entro aca")


    console.log(
      this.goalSelected.identificador_meta + " " +
      this.indicatorSelected.identificador_indicador + " " +
      this.courseSelected.nombre_asignatura + " " +
      this.groupSelected.numero_grupo + " " +
      this.evaluationSelected.tipo_evaluacion + " " +
      this.activitySelected.tipo_actividad
    );

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
        console.log("Documetno JSON: " + excelDatas[0]['documento']);

        this.student.id_estudiante = null;
        this.student.documento = excelDatas[0]['documento'];
        this.student.nombre_completo = excelDatas[0]['nombre_completo'];
        this.student.email = excelDatas[0]['email'];

        console.log("student info " + this.student.id_estudiante,
          this.student.documento,
          this.student.nombre_completo,
          this.student.email)

        this.service.addStudents(this.student)
          .subscribe(

            result => {
              console.log("result en la 0 " + result);

              this.service.getStudentsByParams(null, this.student.documento, null, null)
                .subscribe(
                  result2 => {
                    this.student.id_estudiante = result2[0].id_estudiante;

                    this.studentGroup.id_estudiante_grupo = null;
                    this.studentGroup.id_grupo = this.groupSelected.id_grupo;
                    this.studentGroup.id_estudiante = this.student.id_estudiante;
                    this.studentGroup.id_asignatura = this.courseSelected.id_asignatura;


                    this.service.getStudentGroupsByParams(null, null, this.student.id_estudiante, this.courseSelected.id_asignatura)
                      .subscribe(
                        result0 => {
                          if (result0.length > 0) {
                            if (result0[0].id_grupo == this.groupSelected.id_grupo) {
                              this.flagStudentGroup = true;
                            } else {
                              alert("El estudiante: " + this.student.documento + " ya se encuentra inscrito a un grupo de la asignatura: " +
                                this.courseSelected.nombre_asignatura);
                            }
                          } else {
                            this.service.addStudentGroups(this.studentGroup)
                              .subscribe(

                                result3 => {
                                  this.flagStudentGroup = true;
                                });

                          }

                          if (this.flagStudentGroup) {
                            this.service.getStudentGroupsByParams(null, this.studentGroup.id_grupo, this.studentGroup.id_estudiante, this.studentGroup.id_asignatura)
                              .subscribe(
                                result4 => {
                                  this.studentGroup.id_estudiante_grupo = result4[0].id_estudiante_grupo;

                                  this.courseIndicator.id_asignatura_indicador = null;
                                  this.courseIndicator.id_asignatura = this.courseSelected.id_asignatura;
                                  this.courseIndicator.id_indicador = this.indicatorSelected.id_indicador;

                                  this.service.addCourseIndicators(this.courseIndicator)
                                    .subscribe(
                                      result5 => {
                                        this.service.getCourseIndicatorsByParams(null, this.courseIndicator.id_asignatura, this.courseIndicator.id_indicador)
                                          .subscribe(
                                            result6 => {
                                              this.courseIndicator.id_asignatura_indicador = result6[0].id_asignatura_indicador;
                                            })
                                      }
                                    );

                                })
                          }

                        }
                      )

                    // this.service.addStudentGroups(this.studentGroup)
                    //   .subscribe(

                    //      result3 => {
                    //   console.log("errorcitoooojson=", JSON.parse(result3));

                    //   if (JSON.parse(result3)['error']) {
                    //     alert("El estudiante: " + this.student.documento + " ya esta inscrito en la asignatura: " +
                    //       this.courseSelected.nombre_asignatura)

                    //   } else {
                    //     alert("insertado correctamente")
                    //     this.service.getStudentGroupsByParams(null, this.studentGroup.id_grupo, this.studentGroup.id_estudiante, this.studentGroup.id_asignatura)
                    //       .subscribe(
                    //         result4 => {
                    //           this.studentGroup.id_estudiante_grupo = result4[0].id_estudiante_grupo;

                    //           this.courseIndicator.id_asignatura_indicador = null;
                    //           this.courseIndicator.id_asignatura = this.courseSelected.id_asignatura;
                    //           this.courseIndicator.id_indicador = this.indicatorSelected.id_indicador;

                    //           this.service.addCourseIndicators(this.courseIndicator)
                    //             .subscribe(
                    //               result5 => {
                    //                 this.service.getCourseIndicatorsByParams(null, this.courseIndicator.id_asignatura, this.courseIndicator.id_indicador)
                    //                   .subscribe(
                    //                     result6 => {
                    //                       this.courseIndicator.id_asignatura_indicador = result6[0].id_asignatura_indicador;
                    //                     })
                    //               }
                    //             );

                    //         })

                    //   }

                    // });
                  });
            });























        /*
    
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
  */
      }

    }

    fileReader.readAsArrayBuffer(this.file);

  }

}