import { Component, OnInit } from '@angular/core';

import { OffersService } from './../statistics.service';
import { Indicators } from './../entities/indicators';


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
