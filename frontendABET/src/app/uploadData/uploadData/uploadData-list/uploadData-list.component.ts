import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { UploadService } from './../uploadData.service'
import { Course } from '../../../statistics/statistics/entities/course';
import { group } from '@angular/animations';
import { Group } from '../../../statistics/statistics/entities/group';
import { Indicator } from '../../../statistics/statistics/entities/indicator';


@Component({
  selector: 'app-uploadData-list',
  templateUrl: './uploadData-list.component.html',
  styleUrls: ['./uploadData-list.component.css'],
  providers: [UploadService]

})


export class uploadDataListComponent implements OnInit {

  @Input() course: Course;
  @Input() group: Group;
  @Input() indicator: Indicator;
  @Input() periodType: string;
  @Input() evaluationType: string;
  @Input() activityType: string;
  @Input() isChargeComplete: boolean; //indica cuando un listado de notas ha terminado de cargar para repintar el listado de notas.


  courseId: number = null;
  groupId: number = null;
  indicatorId: number = null;

  flagGrades = false;
  flagFullInfo = false;
  gradesList;

  constructor(
    private service: UploadService
  ) {
    this.gradesList = [];
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.course != undefined && this.course != null && this.course.id_asignatura != undefined && this.course.id_asignatura != null) {
      this.courseId = this.course.id_asignatura
    } else {
      this.course = null;
    }

    if (this.group != undefined && this.group != null && this.group.id_grupo != undefined && this.group.id_grupo != null) {
      this.groupId = this.group.id_grupo;
    } else {
      this.group = null;
    }

    if (this.indicator != undefined && this.indicator != null && this.indicator.id_indicador != undefined && this.indicator.id_indicador != null) {
      this.indicatorId = this.indicator.id_indicador;
    } else {
      this.indicator = null;
    }


    if (this.isChargeComplete) {

      if (this.courseId != null && this.groupId != null && this.indicatorId != null && this.periodType != null && this.evaluationType != null && this.activityType != null) {

        this.flagFullInfo = true;

        this.service.getDataVerification(this.periodType, this.indicatorId, this.courseId, this.groupId, this.evaluationType, this.activityType)
          .subscribe(
            rs => this.gradesList = rs,
            er => console.log(er),
            () => {
              if (this.gradesList.length > 0) {
                this.flagGrades = true;
              } else {
                this.flagGrades = false;
              }

            })
      } else {
        this.flagFullInfo = false;

      }
    }
  }

  deleteCurrentList() {

    if (this.flagGrades == true && this.gradesList.length > 0) {
      var gradesIdList = this.gradesList.map(value => {
        return value['id_calificacion'];
      });
      
      this.service.deleteGradeList(gradesIdList.toString())
        .subscribe(
          rs => console.log(rs),
          er => console.log(er),
          () => {
              this.ngOnChanges();
          })
    }


  }

}
