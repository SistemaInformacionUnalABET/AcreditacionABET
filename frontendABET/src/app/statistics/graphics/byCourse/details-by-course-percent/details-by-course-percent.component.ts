import { Component, OnInit } from '@angular/core';
import { ViewCompleteGrade } from './../../../statistics/entities/viewCompleteGrade';
import { GraphicsService } from '../../graphics.service';

@Component({
  selector: 'app-details-by-course-percent',
  templateUrl: './details-by-course-percent.component.html',
  styleUrls: ['./details-by-course-percent.component.css']
})
export class DetailsByCoursePercentComponent implements OnInit {

  flagGrades = false;

  completeGradesList: ViewCompleteGrade[];

  constructor(private graphicsService: GraphicsService) {
    this.completeGradesList = [];
  }
  ngOnInit() {
    this.graphicsService.currentMessage.subscribe(listComplete => {
      this.completeGradesList = listComplete
      if (this.completeGradesList.length > 0) {
        this.flagGrades = true;
      } else {
        this.flagGrades = false;
      }
    })
  }
}