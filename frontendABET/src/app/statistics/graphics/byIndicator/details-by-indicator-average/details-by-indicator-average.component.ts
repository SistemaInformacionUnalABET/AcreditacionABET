import { Component, OnInit } from '@angular/core';
import { ViewCompleteGrade } from './../../../statistics/entities/viewCompleteGrade';
import { GraphicsService } from '../../graphics.service';

@Component({
  selector: 'app-details-by-indicator-average',
  templateUrl: './details-by-indicator-average.component.html',
  styleUrls: ['./details-by-indicator-average.component.css']
})
export class DetailsByIndicatorAverageComponent implements OnInit {

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