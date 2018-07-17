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
import { StatisticsServices } from './statistics.service';
import { UploadService } from '../../uploadData/uploadData/uploadData.service';

import { GraphicsService } from '../graphics/graphics.service';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { NvD3Module } from 'ng2-nvd3';
import { MaterialModule } from '../../app.material';

//import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';

import {GraphicsModule} from '../graphics/graphics.module';

import { AuthGuard } from './../../auth/auth/auth-login/auth-guard';

import 'hammerjs';
import 'd3';
import 'nvd3';
import { GraphicsByCourseAverageComponent } from '../graphics/byCourse/graphics-by-course-average/graphics-by-course-average.component';



@NgModule({
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    HttpClientModule,
    HttpModule,
    BrowserModule,
    // NvD3Module,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule, 
    GraphicsModule
  ],
  providers: [ 
    StatisticsServices,
    UploadService,
    GraphicsService,
    AuthGuard
   ],
  //  bootstrap: [GraphicsByCourseAverageComponent],
  declarations: [StatisticsItemsComponent, StatisticsEditComponent, StatisticsNewComponent, StatisticsListComponent],
  exports: [StatisticsItemsComponent, StatisticsEditComponent, StatisticsNewComponent, StatisticsListComponent]
})
export class StatisticsModule { }
//platformBrowserDynamic().bootstrapModule(StatisticsModule);