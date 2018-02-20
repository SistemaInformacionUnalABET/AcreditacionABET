import { Component, OnInit } from '@angular/core';

import { OffersService } from './../offers.service';
import { Indicators } from './../offers-new/indicators';


@Component({
  selector: 'app-offers-new',
  templateUrl: './offers-new.component.html',
  styleUrls: ['./offers-new.component.css']
})
export class OffersNewComponent implements OnInit {
option: any;
data: any;
  constructor(
  ) { }

  ngOnInit() {

  }
}
