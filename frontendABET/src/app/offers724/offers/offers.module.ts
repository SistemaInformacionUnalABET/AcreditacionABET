import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';


import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { OffersRoutingModule } from './offers.routing';
import { OffersItemsComponent } from './offers-items/offers-items.component';
import { OffersEditComponent } from './offers-edit/offers-edit.component';
import { OffersNewComponent } from './offers-new/offers-new.component';
import { OffersListComponent } from './offers-list/offers-list.component';
import { OffersService } from './offers.service';
import { NvD3Module } from 'ng2-nvd3';

import 'hammerjs';
import 'd3';
import 'nvd3';



@NgModule({
  imports: [
    CommonModule,
    OffersRoutingModule,
    HttpClientModule,
    HttpModule,
    BrowserModule,
    NvD3Module,
    MatCardModule
    

  ],
  providers: [ OffersService ],
  declarations: [OffersItemsComponent, OffersEditComponent, OffersNewComponent, OffersListComponent],
  exports: [OffersItemsComponent, OffersEditComponent, OffersNewComponent, OffersListComponent]
})
export class OffersModule { }
