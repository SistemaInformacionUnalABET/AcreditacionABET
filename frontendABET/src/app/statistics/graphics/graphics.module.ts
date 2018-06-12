import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphicsRoutingModule } from './graphics.routing';
import { GraphicsByCourseAverageComponent } from './byCourse/graphics-by-course-average/graphics-by-course-average.component';
import { BrowserModule } from '@angular/platform-browser';
import { UploadService } from '../../uploadData/uploadData/uploadData.service';
import { GraphicsService } from '../graphics/graphics.service';
import { MaterialModule } from '../../app.material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';


import { ChartModule } from "angular2-highcharts";
import { DetailsByCourseAverageComponent } from './byCourse/details-by-course-average/details-by-course-average.component';


import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { Http } from '@angular/http';


//import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';



declare var require: any;
@NgModule({
  imports: [
    CommonModule,
    GraphicsRoutingModule,
    BrowserModule,
    ChartModule.forRoot(require('highcharts')),
    FormsModule,
    MaterialModule,
    MatCardModule,
    CommonModule,
    HttpClientModule,
    HttpModule,
    BrowserModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule, 
    GraphicsRoutingModule

  ],

  providers: [ 
    GraphicsService,
    UploadService
   ],
  declarations: [GraphicsByCourseAverageComponent, DetailsByCourseAverageComponent],
  // bootstrap:[GraphicsByCourseAverageComponent],
  exports: [GraphicsByCourseAverageComponent, DetailsByCourseAverageComponent]
  
})
export class GraphicsModule { }
// platformBrowserDynamic().bootstrapModule(GraphicsModule);