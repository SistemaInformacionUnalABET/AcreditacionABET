import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as XLSX from 'ts-xlsx';

import {OrdersService} from './../orders.service'
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Indicators } from '../../../offers724/offers/offers-new/indicators';
import { logging } from 'selenium-webdriver';

@Component({
  selector: 'app-orders-new',
  templateUrl: './orders-new.component.html',
  providers: [OrdersService],
  //styleUrls: ['./orders-new.component.css'],
  styleUrls: ['../../../../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})

export class OrdersNewComponent implements OnInit {
  indicador: Indicators;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: OrdersService

  ) {

    this.indicador = new Indicators(0, 0, 0);
 

   }
  
  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (!id) return;

    console.log(id);
}


arrayBuffer: any;
file: File;
incomingfile(event) {
  this.file = event.target.files[0];
}

Upload() {
  console.log("entro aca")
  let fileReader = new FileReader();
  fileReader.onload = (e) => {
    this.arrayBuffer = fileReader.result;
    var data = new Uint8Array(this.arrayBuffer);
    var arr = new Array();
    for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");
    var workbook = XLSX.read(bstr, { type: "binary" });
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    console.log("esto> ", XLSX.utils.sheet_to_json(worksheet, { raw: true }));
    if(XLSX.utils.sheet_to_json(worksheet, { raw: true }).length > 0){
      
      this.indicador.id_indicador =  null;
      this.indicador.id_meta =  1;
      this.indicador.id_comun = 3;
      

      this.service.addIndicators(this.indicador)
        .subscribe(
          rt => console.log("rt= ", rt),
          er => console.log("error= ", er),
          () => console.log("Terminado")        
        )
    }
  }
  fileReader.readAsArrayBuffer(this.file);
}

}