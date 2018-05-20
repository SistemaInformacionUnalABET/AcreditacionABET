import { Component, OnInit } from '@angular/core';

import { StatisticsServices } from './../statistics.service';
import { Indicator } from './../entities/indicator';


@Component({
  selector: 'app-statistics-new',
  templateUrl: './statistics-new.component.html',
  styleUrls: ['./statistics-new.component.css']
})
export class StatisticsNewComponent implements OnInit {
option: any;
data: any;
  constructor(
  ) { }

  ngOnInit() {

  }
}
