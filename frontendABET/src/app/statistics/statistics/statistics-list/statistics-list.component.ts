import { Component, OnInit } from '@angular/core';
import { Indicator } from './../entities/indicator';
import { StatisticsServices } from './../statistics.service';
import { ViewCompleteGrade } from './../../statistics/entities/viewCompleteGrade';


@Component({
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html',
  styleUrls: ['./statistics-list.component.css']
})
export class StatisticsListComponent implements OnInit {

  completeGradesList: ViewCompleteGrade[];


  constructor(private services: StatisticsServices) {
    this.completeGradesList = []
  }

  ngOnInit() {
    
    this.services.getViewCompleteGradesByParams()
      .subscribe(
        rs => this.completeGradesList = rs,
        er => console.log(er),
        () => { 

          console.log(">>>>>>> Listado de calificacoines completas");
          
          //console.log(this.completeGradesList[0]);
        }
      );

  }

}
