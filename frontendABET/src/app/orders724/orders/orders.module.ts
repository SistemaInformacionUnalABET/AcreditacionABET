import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';

import { OrdersRoutingModule } from './orders.routing';

import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersNewComponent } from './orders-new/orders-new.component';
import { OrdersEditComponent } from './orders-edit/orders-edit.component';
import { OrdersItemsComponent } from './orders-items/orders-items.component';
import { MaterialModule } from '../../app.material';
//import { NvD3Module } from 'angular2-nvd3';
import { NvD3Module } from 'ng2-nvd3';

import 'hammerjs';
import 'd3';
import 'nvd3';


@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    BrowserModule,
    MaterialModule,
    NvD3Module
    //NvD3Module


  ],
  declarations: [OrdersListComponent, OrdersNewComponent, OrdersEditComponent, OrdersItemsComponent],
  exports: [OrdersListComponent, OrdersNewComponent, OrdersEditComponent, OrdersItemsComponent]
})
export class OrdersModule { }
