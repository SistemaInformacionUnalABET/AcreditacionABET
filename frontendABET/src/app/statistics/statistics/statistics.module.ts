import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';


import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { StatisticsRoutingModule } from './statistics.routing';
import { StatisticsItemsComponent} from './statistics-items/statistics-items.component';
import { StatisticsEditComponent } from './statistics-edit/statistics-edit.component';
import { StatisticsNewComponent } from './statistics-new/statistics-new.component';
import { StatisticsListComponent } from './statistics-list/statistics-list.component';
import { OffersService } from './statistics.service';
import { NvD3Module } from 'ng2-nvd3';

import 'hammerjs';
import 'd3';
import 'nvd3';



@NgModule({
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    HttpClientModule,
    HttpModule,
    BrowserModule,
    NvD3Module,
    MatCardModule
    

  ],
  providers: [ OffersService ],
  declarations: [StatisticsItemsComponent, StatisticsEditComponent, StatisticsNewComponent, StatisticsListComponent],
  exports: [StatisticsItemsComponent, StatisticsEditComponent, StatisticsNewComponent, StatisticsListComponent]
})
export class OffersModule { }
