import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import * as XLSX from 'ts-xlsx';
import { Activity } from '../../../statistics/statistics/entities/activity';
import { Course } from '../../../statistics/statistics/entities/course';
import { CourseIndicator } from '../../../statistics/statistics/entities/courseIndicator';
import { Evaluation } from '../../../statistics/statistics/entities/evaluation';
import { Goal } from '../../../statistics/statistics/entities/goal';
import { Grade } from '../../../statistics/statistics/entities/grade';
import { Group } from '../../../statistics/statistics/entities/group';
import { Indicator } from '../../../statistics/statistics/entities/indicator';
import { Student } from '../../../statistics/statistics/entities/student';
import { StudentGroup } from '../../../statistics/statistics/entities/studentGroup';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { UploadService } from './../uploadData.service';







@Component({
  selector: 'app-uploadData-new',
  templateUrl: './uploadData-new.component.html',
  providers: [UploadService],
  styleUrls: ['./uploadData-new.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class uploadDataNewComponent implements OnInit {


  goalList: Goal[];
  indicatorList: Indicator[];
  courseList: Course[];
  groupList: Group[];
  evaluationTypeList: String[];
  activityTypeList: String[];
  periodList: String[];

  periodSelected: string;
  goalSelected: Goal;
  indicatorSelected: Indicator;
  courseSelected: Course;
  groupSelected: Group;
  evaluationSelected: Evaluation;
  activitySelected: Activity;
  courseIndicator: CourseIndicator;

  form: FormGroup;
  controlActivityType: FormControl;

  filteredOptions: Observable<string[]>;
  filteredOptionsForIndicators: Observable<string[]>;
  filteredOptionsForCourse: Observable<string[]>;
  filteredOptionsForGroups: Observable<string[]>;

  emptyString = " ";
  isFile = false;
  flagStudentGroup = false;
  flagUpload = true;
  isChargeComplete: boolean;
  excelDatas: any;
  countStudentsInserted = 0;
  excelTemplate: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UploadService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {

    this.controlActivityType = new FormControl();

    this.goalSelected = new Goal(null, null, null, null);
    this.indicatorSelected = new Indicator(null, null, null, null, null);
    this.courseSelected = new Course(null, null, null, null);
    this.groupSelected = new Group(null, null, null);
    this.evaluationSelected = new Evaluation(null, null, null);
    this.activitySelected = new Activity(null, null, null, null);
    //this.student = new Student(null, null, null, null);
    //this.studentGroup = new StudentGroup(null, null, null, null);
    this.courseIndicator = new CourseIndicator(null, null, null, null);
    //this.grade = new Grade(null, null, null, null, null, null, null, null, null, null);

    this.excelDatas = null;
    this.isChargeComplete = true;
    this.goalList = [];
    this.indicatorList = [];
    this.courseList = [];
    this.groupList = [];
    this.evaluationTypeList = ["Autoevaluación", "Coevalución", "Heteroevaluación"];
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
    this.periodList = [
      "2017-I",
      "2017-II",
      "2018-I",
      "2018-II",
      "2019-I",
      "2019-II",
      "2020-I",
      "2020-II",
      "2021-I",
      "2021-II",
      "2022-I",
      "2022-II",
      "2023-I",
      "2023-II",
      "2024-I",
      "2024-II",
      "2025-I",
      "2025-II",
      "2026-I",
      "2026-II",
      "2027-I",
      "2027-II",
      "2028-I",
      "2028-II",
      "2029-I",
      "2029-II",
    ];
    this.excelTemplate = 'assets/data/excelTemplate.xlsx';
    this.createContols();
    this.logChange();

  }

  ngOnInit() {

    if (localStorage.getItem('token') == null) {
      let link = ['/login'];
      this.router.navigate(link);
    } else {

      this.service.getAllGoals()
        .subscribe(
          rs => this.goalList = rs,
          er => console.log(er),
          () => {

            //Filtra las metas que aparecen en el formulario para el campo Meta
            //Nota: propio de Angular Material
            this.filteredOptions = this.form.controls['goal'].valueChanges
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
            this.filteredOptionsForCourse = this.form.controls['subject'].valueChanges
              .pipe(
                startWith(''),
                map(val => this.filterCourses(val))
              );
          })
    }
  }

  createContols() {
    this.form = this.fb.group({
      'period': ['', [Validators.required]],
      'goal': ['', [Validators.required]],
      'indicator': ['', [Validators.required]],
      'subject': ['', [Validators.required]],
      'group': ['', [Validators.required]],
      'evaluation': ['', [Validators.required]],
      'activity': ['', [Validators.required]],
    });
  }

  logChange() {
    const period = this.form.controls['period'];
    period.valueChanges.subscribe(value => {
      this.periodSelected = value;
    });

    const goal = this.form.controls['goal'];
    goal.valueChanges.subscribe(value => {

      this.form.patchValue({
        'indicator': ''
      });
      this.indicatorList = [];
      this.indicatorSelected = null;

      if (value != undefined && value != null && String(value) != '') {
        var stringIdentificator = value.split(" ")[0];
        this.goalSelected = this.goalList.find(goal => goal.identificador_meta === stringIdentificator);

        if (this.goalSelected != undefined && this.goalSelected != null && this.goalSelected['id_meta'] != undefined && this.goalSelected['id_meta'] != null) {
          this.fillIndicatorSelector();
        }
      }

    });

    const indicator = this.form.controls['indicator'];
    indicator.valueChanges.subscribe(value => {

      var stringIdentificator = value.split(" ")[0];
      this.indicatorSelected = this.indicatorList.find(indicator => indicator.identificador_indicador === stringIdentificator);

    });

    const subject = this.form.controls['subject'];
    subject.valueChanges.subscribe(value => {

      this.form.patchValue({
        'group': ''
      });
      this.groupList = [];
      this.groupSelected = null;

      if (value != undefined && value != null && String(value) != '') {
        var stringCode = value.split(" ")[0];
        this.courseSelected = this.courseList.find(course => course.codigo === stringCode);

        if (this.courseSelected != undefined && this.courseSelected != null && this.courseSelected['id_asignatura'] != undefined && this.courseSelected['id_asignatura'] != null) {
          this.fillGroupSelector();
        }
      }
    });

    const group = this.form.controls['group'];
    group.valueChanges.subscribe(value => {
      if (value != undefined && value != null && String(value) != '') {
        this.groupSelected = value;
      }
    });

    const evaluation = this.form.controls['evaluation'];
    evaluation.valueChanges.subscribe(value => {
      console.log('evaluation => ', value);
      if (value != undefined && value != null && String(value) != '') {
        this.evaluationSelected.tipo_evaluacion = value;
      }
    });

    const activity = this.form.controls['activity'];
    activity.valueChanges.subscribe(value => {
      if (value != undefined && value != null && String(value) != '') {
        this.activitySelected.tipo_actividad = value;
      }
    });
  }

  fillIndicatorSelector() {

    var goalId = this.goalSelected.id_meta;
    this.service.getIndicatorsByParams(null, goalId)
      .subscribe(
        rs => this.indicatorList = rs,
        er => console.log(er),
        () => {

          //Filtra los INDICADORES que aparecen en el formulario para el campo Indicador
          //Nota: propio de Angular Material
          this.filteredOptionsForIndicators = this.form.controls['indicator'].valueChanges
            .pipe(
              startWith(''),
              map(val => this.filterIndicators(val))
            );
        }
      )
  }


  fillGroupSelector() {

    var courseId = this.courseSelected.id_asignatura;

    this.service.getGroupByParams(null, courseId, null)
      .subscribe(
        rs => this.groupList = rs,
        er => console.log(er),
        () => {

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
    if (this.file.type != "application/vnd.ms-excel" &&
      this.file.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      this.isFile = false;

    } else if (this.file != undefined) {
      this.isFile = true;
    }
  }

  twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
  }
  castToMysqlFormat(date) {
    return date.getUTCFullYear() + "-" + this.twoDigits(1 + date.getUTCMonth()) + "-" + this.twoDigits(date.getUTCDate()) + " " + this.twoDigits(date.getUTCHours()) + ":" + this.twoDigits(date.getUTCMinutes()) + ":" + this.twoDigits(date.getUTCSeconds());
  }

  asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      callback(array[index], index, array)
    }
  }

  insertGrade(studentGroupObject, gradeObject, indexStudent) {


    this.service.getStudentGroupsByParams(null, studentGroupObject.id_grupo, studentGroupObject.id_estudiante, studentGroupObject.id_asignatura, studentGroupObject.periodo)
      .subscribe(
        result4 => {

          gradeObject.id_calificacion = null;
          gradeObject.id_estudiante_grupo = result4[0].id_estudiante_grupo;
          gradeObject.id_actividad = this.activitySelected.id_actividad;
          gradeObject.descripcion_calificacion = null;
          gradeObject.fecha_creacion = this.castToMysqlFormat(new Date());
          gradeObject.fecha_modificacion = this.castToMysqlFormat(new Date());

          this.service.addGrades(gradeObject)
            .subscribe(
              result12 => {
                console.log("La calificación fue agregada o ya existe :=> ");


                this.service.getGradesByParams(
                  null,
                  gradeObject.id_estudiante_grupo,
                  gradeObject.id_actividad,
                  gradeObject.calificacion,
                  gradeObject.descripcion_calificacion,
                  gradeObject.fecha_creacion,
                  gradeObject.fecha_modificacion,
                  gradeObject.observacion,
                  gradeObject.id_estudiante_grupo
                )
                  .subscribe(
                    result13 => {
                      console.log("La calificación fue agregada o ya existe :=> ");
                      console.log(
                        result13[0].id_calificacion,
                        result13[0].id_estudiante_grupo,
                        result13[0].id_actividad,
                        result13[0].calificacion,
                        result13[0].descripcion_calificacion,
                        result13[0].fecha_creacion,
                        result13[0].fecha_modificacion,
                        result13[0].observacion,
                        result13[0].id_estudiante_grupo);

                      this.countStudentsInserted++;

                      if (this.countStudentsInserted == this.excelDatas.length) {
                        this.isChargeComplete = true;
                        this.openLoadingDialog();
                        this.dialog.closeAll();
                      }

                    });
              });

        });



  }

  insertStudent(studentObject, gradeObject, indexStudent) {
    this.service.addStudents(studentObject)
      .subscribe(
        result => {

          var currentStudentGroup = new StudentGroup(null, null, null, null, null);
          this.service.getStudentsByParams(null, studentObject.documento, null, null)
            .subscribe(
              result2 => {


                currentStudentGroup.id_estudiante_grupo = null;
                currentStudentGroup.id_grupo = this.groupSelected.id_grupo;
                currentStudentGroup.id_estudiante = result2[0].id_estudiante;
                currentStudentGroup.id_asignatura = this.courseSelected.id_asignatura;
                currentStudentGroup.periodo = this.periodSelected;

                this.service.getStudentGroupsByParams(null, null, result2[0].id_estudiante, this.courseSelected.id_asignatura, this.periodSelected)
                  .subscribe(
                    result0 => {


                      if (result0.length > 0) {

                        if (result0[0].id_grupo == this.groupSelected.id_grupo) { //Si el estuduante ya se encuentra asociado al grupo seleccionado
                          console.log(">>>  El estudinte ", studentObject.nombre_completo, " ya se encuentra registrado en el grupo: ", result0[0].id_grupo);
                          console.log(
                            "id_Estudiante_grupo:  ", currentStudentGroup.id_estudiante_grupo,
                            "Estudiante:  ", currentStudentGroup.id_estudiante,
                            "Grupo; ", currentStudentGroup.id_grupo);

                          this.insertGrade(currentStudentGroup, gradeObject, indexStudent);

                        } else {
                          this.countStudentsInserted++;

                          if (this.countStudentsInserted == this.excelDatas.length) {
                            this.isChargeComplete = true;
                            this.openLoadingDialog();
                            this.dialog.closeAll();
                          }

                          alert("El estudiante: " + studentObject.documento + " " + studentObject.nombre_completo + " ya se encuentra inscrito en otro grupo " + " de la asignatura: " +
                            this.courseSelected.nombre_asignatura);
                        }
                      } else { //si el estudiante NO se encuentra asociado a un grupo, se agrega a la tabla

                        this.service.addStudentGroups(currentStudentGroup)
                          .subscribe(

                            result3 => {

                              console.log(">>>> SE INSCRIBIÓ UN ESTUDIANTE GRUPO",
                                "Estudiante:  ", currentStudentGroup.id_estudiante,
                                "Grupo; ", currentStudentGroup.id_grupo);
                              console.log(result3);


                              this.insertGrade(currentStudentGroup, gradeObject, indexStudent);
                            });

                      }

                    }
                  )
              });
        });
  }

  insertFormInformation() {

    this.courseIndicator.id_asignatura_indicador = null;
    this.courseIndicator.id_asignatura = this.courseSelected.id_asignatura;
    this.courseIndicator.id_indicador = this.indicatorSelected.id_indicador;
    this.courseIndicator.periodo = this.periodSelected;

    this.service.addCourseIndicators(this.courseIndicator)
      .subscribe(
        result5 => {
          this.service.getCourseIndicatorsByParams(null, this.courseIndicator.id_asignatura, this.courseIndicator.id_indicador, this.courseIndicator.periodo)
            .subscribe(
              result6 => {
                this.courseIndicator.id_asignatura_indicador = result6[0].id_asignatura_indicador;

                this.evaluationSelected.id_evaluacion = null;
                this.evaluationSelected.id_asignatura_indicador = this.courseIndicator.id_asignatura_indicador;

                this.service.addEvaluations(this.evaluationSelected)
                  .subscribe(
                    result7 => {
                      this.service.getEvaluationsByParams(null, this.evaluationSelected.tipo_evaluacion, this.evaluationSelected.id_asignatura_indicador)
                        .subscribe(
                          result8 => {
                            this.evaluationSelected.id_evaluacion = result8[0].id_evaluacion;

                            this.activitySelected.id_actividad = null;
                            this.activitySelected.descripcion = null;
                            this.activitySelected.id_evaluacion = this.evaluationSelected.id_evaluacion;

                            this.service.addActivities(this.activitySelected)
                              .subscribe(
                                result9 => {

                                  this.service.getActivitiesByParams(null, this.activitySelected.tipo_actividad, this.activitySelected.descripcion, this.activitySelected.id_evaluacion)
                                    .subscribe(
                                      result11 => {
                                        this.activitySelected.id_actividad = result11[0].id_actividad;

                                        //Inserta cada estudiante a la tabla estudiantes
                                        const insertStudentsFormExcel = async () => {
                                          await this.asyncForEach(this.excelDatas, async (object, index) => {

                                            var currentStudent = new Student(null, null, null, null);
                                            currentStudent.documento = object['documento'];
                                            currentStudent.nombre_completo = object['nombre_completo'];
                                            currentStudent.email = object['email'];

                                            var currentGrade = new Grade(null, null, null, null, null, null, null, null, null);
                                            currentGrade.calificacion = object['nota'];
                                            currentGrade.observacion = object['observacion'];
                                            currentGrade.evidencia_url = object['evidencia_url'];


                                            await this.insertStudent(currentStudent, currentGrade, index);
                                          })

                                        }

                                        insertStudentsFormExcel();

                                      });

                                });
                          });
                    });
              });
        });
  }


  upload() {

    let fileReader = new FileReader();
    this.countStudentsInserted = 0;
    this.isChargeComplete = false;


    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      if (XLSX.utils.sheet_to_json(worksheet, { raw: true }).length > 0) {

        this.excelDatas = XLSX.utils.sheet_to_json(worksheet, { raw: true });


        //El ususario debe confirmar si los datos ingresados en el formulario son los correctos
        var messageObj = {

          periodSelected: this.periodSelected,
          goalSelectedIdentificador: this.goalSelected.identificador_meta,
          goalSelectedName: this.goalSelected.nombre_meta,
          indicatorSelectedIdentificador: this.indicatorSelected.identificador_indicador,
          indicatorSelectedName: this.indicatorSelected.nombre_indicador,
          courseSelectedCode: this.courseSelected.codigo,
          courseSelectedName: this.courseSelected.nombre_asignatura,
          groupSelected: this.groupSelected.numero_grupo,
          evaluationSelected: this.evaluationSelected.tipo_evaluacion,
          activitySelected: this.activitySelected.tipo_actividad,
          count: XLSX.utils.sheet_to_json(worksheet, { raw: true }).length
        }

        this.openDialog(messageObj);

      } else {
        alert("Documento vacío o inválido");
      }
    }

    fileReader.readAsArrayBuffer(this.file);

  }

  openDialog(message: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '750px',
      data: message
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      if (result) {
        this.openLoadingDialog();
        this.insertFormInformation();
      }

    });
  }

  openLoadingDialog(): void {
    const dialogRef = this.dialog.open(LoadingDialogComponent, {
      width: '550px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      alert("*** Proceso finalizado con éxito ***  \n Verique que la información esté actualizada en la tabla");
    });
  }


  public dowbloadTemplate() {

    window.open(this.excelTemplate, "_blank");

  }


}