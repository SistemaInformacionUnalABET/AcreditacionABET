import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';

import { uploadDataRoutingModule } from './uploadData.routing';

import { uploadDataListComponent } from './uploadData-list/uploadData-list.component';
import { uploadDataNewComponent } from './uploadData-new/uploadData-new.component';
import { uploadDataEditComponent } from './uploadData-edit/uploadData-edit.component';
import { uploadDataItemsComponent } from './uploadData-items/uploadData-items.component';
import { MaterialModule } from '../../app.material';
//import { NvD3Module } from 'angular2-nvd3';
import { NvD3Module } from 'ng2-nvd3';

import 'hammerjs';
import 'd3';
import 'nvd3';


@NgModule({
  imports: [
    CommonModule,
    uploadDataRoutingModule,
    BrowserModule,
    MaterialModule,
    NvD3Module
    //NvD3Module


  ],
  declarations: [uploadDataListComponent, uploadDataNewComponent, uploadDataEditComponent, uploadDataItemsComponent],
  exports: [uploadDataListComponent, uploadDataNewComponent, uploadDataEditComponent, uploadDataItemsComponent]
})
export class OrdersModule { }
