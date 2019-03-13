import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router'

import * as XLSX from 'ts-xlsx';

import { Indicator } from '../../statistics/entities/indicator';
import { logging } from 'selenium-webdriver';

import {DetailsByCourseAverageComponent} from '../../graphics/byCourse/details-by-course-average/details-by-course-average.component'


@Component({
  selector: 'app-statistics-edit',
  templateUrl: './statistics-edit.component.html',
  styleUrls: ['../../../../../node_modules/nvd3/build/nv.d3.css']
})
export class StatisticsEditComponent implements OnInit {

options;
data;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {



    this.options = {
      chart: {
        type: 'boxPlotChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 60,
          left: 40
        },
        color: ['darkblue', 'darkorange', 'green', 'darkred', 'darkviolet'],
        x: function (d) { return d.label; },
        // y: function(d){return d.values.Q3;},
        maxBoxWidth: 75,
        yDomain: [0, 500]
      }
    };

    this.data = [
      {
        label: "Sample A",
        values: {
          Q1: 180,
          Q2: 200,
          Q3: 250,
          whisker_low: 115,
          whisker_high: 400,
          outliers: [50, 100, 425]
        }
      },
      {
        label: "Sample B",
        values: {
          Q1: 300,
          Q2: 350,
          Q3: 400,
          whisker_low: 225,
          whisker_high: 425,
          outliers: [175, 450, 480]
        }
      },
      {
        label: "Sample C",
        values: {
          Q1: 100,
          Q2: 200,
          Q3: 300,
          whisker_low: 25,
          whisker_high: 400,
          outliers: [450, 475]
        }
      },
      {
        label: "Sample D",
        values: {
          Q1: 75,
          Q2: 100,
          Q3: 125,
          whisker_low: 50,
          whisker_high: 300,
          outliers: [450]
        }
      },
      {
        label: "Sample E",
        values: {
          Q1: 325,
          Q2: 400,
          Q3: 425,
          whisker_low: 225,
          whisker_high: 475,
          outliers: [50, 100, 200]
        }
      }
    ];

  }

}
