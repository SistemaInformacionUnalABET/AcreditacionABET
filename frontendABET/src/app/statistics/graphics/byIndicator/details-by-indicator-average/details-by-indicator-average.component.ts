import { Component, OnInit, Input } from '@angular/core';
import { ViewCompleteGrade } from './../../../statistics/entities/viewCompleteGrade';
import { GraphicsService } from '../../graphics.service';

@Component({
  selector: 'app-details-by-indicator-average',
  templateUrl: './details-by-indicator-average.component.html',
  styleUrls: ['./details-by-indicator-average.component.css']
})
export class DetailsByIndicatorAverageComponent implements OnInit {

  @Input() course: number;

  flagGrades = false;

  completeGradesList: ViewCompleteGrade[];

  constructor(private graphicsService: GraphicsService) {
    this.completeGradesList = [];
  }
  ngOnInit() {


    alert(this.course + "ALERT");

    // this.graphicsService.currentMessage.subscribe(listComplete => {
    //   this.completeGradesList = listComplete
    //   if (this.completeGradesList.length > 0) {
    //     this.flagGrades = true;
    //   } else {
    //     this.flagGrades = false;
    //   }
    // })

    if (this.course != null || this.course != undefined) {

      this.graphicsService.getViewCompleteGradesByParams(this.course).subscribe(listComplete => {
        this.completeGradesList = listComplete
        if (this.completeGradesList.length > 0) {
          this.flagGrades = true;
        } else {
          this.flagGrades = false;
        }
      })
    }

  }
}