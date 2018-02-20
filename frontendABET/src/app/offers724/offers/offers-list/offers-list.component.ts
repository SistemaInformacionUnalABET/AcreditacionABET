import { Component, OnInit } from '@angular/core';
import { Indicators } from './../offers-new/indicators';
import { OffersService } from './../offers.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {

  lista: Indicators[];

  constructor(
    private servicio: OffersService
  ) { }

  ngOnInit() {
    this.servicio.getIndicators()
      .subscribe(
      rs => this.lista = rs,
      er => console.log(er),
      () => console.log(this.lista)
      )
  }

}
