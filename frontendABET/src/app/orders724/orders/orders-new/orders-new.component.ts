import { Component, OnInit, ViewEncapsulation } from '@angular/core';
//import {} from './WindowRef';

declare let d3: any;

@Component({
  selector: 'app-orders-new',
  templateUrl: './orders-new.component.html',
  //styleUrls: ['./orders-new.component.css'],
  styleUrls: ['../../../../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})

export class OrdersNewComponent implements OnInit {

  constructor() { }
  
  options;
  data;
  chartType;
  
  ngOnInit() {

    this.options = {
      chart: {
        type: 'boxPlotChart',
        height: 450,
        margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 40
        },
        color:['darkblue', 'darkorange', 'green', 'darkred', 'darkviolet'],
        x: function(d){return d.label;},
        // y: function(d){return d.values.Q3;},
        maxBoxWidth: 75,
        yDomain: [0, 500]
      }
    }
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
    }
    ];
    
  }

  show(files){

    var btnUploadFile=document.getElementById('csvUploadFile')
    console.log('file load ', files );
    
  
  }

  getAsText(file){
    console.log("el archivo ", file)
  }

}
