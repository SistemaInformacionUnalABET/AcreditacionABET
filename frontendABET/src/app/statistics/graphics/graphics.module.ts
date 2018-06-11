import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphicsRoutingModule } from './graphics.routing';
import { GraphicsByCourseAverageComponent } from './graphics-by-course-average/graphics-by-course-average.component';
import { BrowserModule } from '@angular/platform-browser';
// import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';


//import {ChartModule} from 'angular-highcharts'
import { ChartModule } from "angular2-highcharts";

declare var require: any;
@NgModule({
  imports: [
    CommonModule,
    GraphicsRoutingModule,
    BrowserModule,
    ChartModule.forRoot(require('highcharts'))
  ],
  declarations: [GraphicsByCourseAverageComponent],
  // bootstrap:[GraphicsByCourseAverageComponent],
  exports: [GraphicsByCourseAverageComponent]
  
})
export class GraphicsModule { }
// platformBrowserDynamic().bootstrapModule(GraphicsModule);