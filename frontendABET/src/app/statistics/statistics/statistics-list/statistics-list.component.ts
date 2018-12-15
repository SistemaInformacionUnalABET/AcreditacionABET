import { Component, OnInit } from '@angular/core';
import { Indicator } from './../entities/indicator';
import { StatisticsServices } from './../statistics.service';
import { ViewCompleteGrade } from './../../statistics/entities/viewCompleteGrade';


import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { UploadService } from '../../../uploadData/uploadData/uploadData.service';
import { Course } from '../../../statistics/statistics/entities/course';
import {GraphicsByCourseAverageComponent} from '../../graphics/byCourse/graphics-by-course-average/graphics-by-course-average.component'



@Component({
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html',
  styleUrls: ['./statistics-list.component.css']
})
export class StatisticsListComponent implements OnInit {

  constructor()
  {}

  ngOnInit() {
  

  }


}
