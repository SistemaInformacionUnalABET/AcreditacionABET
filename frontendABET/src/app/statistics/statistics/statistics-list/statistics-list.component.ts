import { Component, OnInit } from '@angular/core';
import { Indicators } from './../entities/indicators';
import { OffersService } from './../statistics.service';

@Component({
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html',
  styleUrls: ['./statistics-list.component.css']
})
export class StatisticsListComponent implements OnInit {

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
