import { Component, OnInit } from '@angular/core';
import {  } from 'angular2-highcharts';
import { print } from 'util';



@Component({
  selector: 'app-graphics-by-course-average',
  templateUrl: './graphics-by-course-average.component.html',
  styleUrls: ['./graphics-by-course-average.component.css']
})
export class GraphicsByCourseAverageComponent implements OnInit {

  //Highcharts : any;

  options : Object;


  constructor() { }

  ngOnInit() {

    //console.log("Conectando..........");

    this.options ={

      title: {
        text: 'Chart.update'
      },

      subtitle: {
        text: 'Plain'
      },

      xAxis: {
        categories: ['2017-2', '2018-1', '2018-2']
      },

      series: [{
        type: 'column',
        colorByPoint: true,
        data: [50, 50, 90],
        showInLegend: false
      }]

    };

  }
}
