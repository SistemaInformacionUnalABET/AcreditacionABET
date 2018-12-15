
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { uploadDataRoutingModule } from './uploadData.routing';

import { uploadDataListComponent } from './uploadData-list/uploadData-list.component';
import { uploadDataNewComponent } from './uploadData-new/uploadData-new.component';
import { uploadDataEditComponent } from './uploadData-edit/uploadData-edit.component';
import { uploadDataItemsComponent } from './uploadData-items/uploadData-items.component';
import { MaterialModule } from '../../app.material';


//import { NvD3Module } from 'ng2-nvd3';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import 'hammerjs';
import 'd3';
import 'nvd3';
import 'hammerjs';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';

@NgModule({
  imports: [
    
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    uploadDataRoutingModule,
    BrowserModule,
    MaterialModule,
    //NvD3Module,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //NvD3Module
  ],
  declarations: [uploadDataListComponent, uploadDataNewComponent, uploadDataEditComponent, uploadDataItemsComponent, ConfirmDialogComponent, LoadingDialogComponent],
  exports: [uploadDataListComponent, uploadDataNewComponent, uploadDataEditComponent, uploadDataItemsComponent],
  entryComponents: [ConfirmDialogComponent, LoadingDialogComponent]
})
export class UploadModule { }
