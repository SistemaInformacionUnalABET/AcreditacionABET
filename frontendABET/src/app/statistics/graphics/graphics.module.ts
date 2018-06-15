import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphicsRoutingModule } from './graphics.routing';
import { GraphicsByCourseAverageComponent } from './byCourse/graphics-by-course-average/graphics-by-course-average.component';
import { BrowserModule } from '@angular/platform-browser';
import { UploadService } from '../../uploadData/uploadData/uploadData.service';
import { GraphicsService } from '../graphics/graphics.service';
import { MaterialModule } from '../../app.material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { ChartModule, HIGHCHARTS_MODULES} from 'angular-highcharts';
//import { ChartModule} from "angular2-highcharts";

import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';

import { DetailsByCourseAverageComponent } from './byCourse/details-by-course-average/details-by-course-average.component';


import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { Http } from '@angular/http';
import { GraphicsButtonsComponent } from './byCourse/graphics-buttons/graphics-buttons.component';
import { GraphicsByCoursePercentComponent } from './byCourse/graphics-by-course-percent/graphics-by-course-percent.component';
import { DetailsByCoursePercentComponent } from './byCourse/details-by-course-percent/details-by-course-percent.component';


//import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';



declare var require: any;
// var Highcharts = require('highcharts');

// // Load module after Highcharts is loaded
// require('highcharts/modules/exporting')(Highcharts);
@NgModule({
  imports: [
    CommonModule,
    GraphicsRoutingModule,
    BrowserModule,
    ChartModule,
    //ChartModule.forRoot(require('highcharts')),
    //Chart,
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
    {provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ],},
    GraphicsService,
    UploadService
    
  ],
  declarations: [GraphicsByCourseAverageComponent, DetailsByCourseAverageComponent, GraphicsButtonsComponent, GraphicsByCoursePercentComponent, DetailsByCoursePercentComponent],
  exports: [GraphicsByCourseAverageComponent, DetailsByCourseAverageComponent, GraphicsButtonsComponent, GraphicsByCoursePercentComponent]

})
export class GraphicsModule { }
