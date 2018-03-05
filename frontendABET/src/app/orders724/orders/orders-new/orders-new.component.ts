import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as XLSX from 'ts-xlsx';

import { OrdersService } from './../orders.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Indicators } from '../../../offers724/offers/offers-new/indicators';
import { Commons } from '../../../offers724/offers/offers-new/commons';

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
  common: Commons;

  lists: Commons[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: OrdersService

  ) {

    this.indicador = new Indicators(0, 0, 0, '');
    this.common = new Commons(0, '', '');


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
      if (XLSX.utils.sheet_to_json(worksheet, { raw: true }).length > 0) {

        var excelDatas = XLSX.utils.sheet_to_json(worksheet, { raw: true });

        console.log("ELEMENTO [0]", excelDatas[0]);

        this.indicador.id_indicador = null;
        this.indicador.id_meta = null;
        this.indicador.id_comun = null;
        this.indicador.identificador_indicador = excelDatas[0]['identificador_indicador'];

        this.common.id_comun = null;
        this.common.nombre = excelDatas[0]['nombre_meta'];;
        this.common.descripcion = null;

        console.log("ELEMENTO [0][indentificador]", this.indicador.identificador_indicador);

        var lastIdComunMetas: any;
        var lastIdComunIndicador: any;
        var lastIdComunAsignatura: any;
        var lastIdComunEvaluacion: any;
        var lastIdComunActividad: any;

        //Insertar nombre de meta a comun y obtener el id del mismo
        this.service.addCommons(this.common)
          .subscribe(

            result => {
              if (result) {
                this.service.getCommons()
                  .subscribe(
                    result2 => {
                      if (result2) {
                        lastIdComunMetas = result2[0];
                        console.log("Last ID comun METASSSSS ", lastIdComunMetas)


                        //Añadiendo un nombre de indicador a common
                        this.common.id_comun = null;
                        this.common.nombre = excelDatas[0]['nombre_indicador'];;
                        this.common.descripcion = null;


                        this.service.addCommons(this.common)
                          .subscribe(

                            result => {
                              if (result) {
                                this.service.getCommons()
                                  .subscribe(
                                    result2 => {
                                      if (result2) {
                                        lastIdComunIndicador = result2[0];
                                        console.log("Last ID comun INDICADOR ", lastIdComunIndicador)


                                        //anadiendo nombre de asignatura a la tabla comon
                                        this.common.id_comun = null;
                                        this.common.nombre = excelDatas[0]['nombre_asignatura'];;
                                        this.common.descripcion = null;


                                        this.service.addCommons(this.common)
                                          .subscribe(

                                            result => {
                                              if (result) {
                                                this.service.getCommons()
                                                  .subscribe(
                                                    result2 => {
                                                      if (result2) {
                                                        lastIdComunAsignatura = result2[0];
                                                        console.log("Last ID comun Asignatura ", lastIdComunAsignatura)

                                                        //anadiendo nombre de evaluacion a common

                                                        this.common.id_comun = null;
                                                        this.common.nombre = excelDatas[0]['nombre_evaluacion'];;
                                                        this.common.descripcion = null;


                                                        this.service.addCommons(this.common)
                                                          .subscribe(

                                                            result => {
                                                              if (result) {
                                                                this.service.getCommons()
                                                                  .subscribe(
                                                                    result2 => {
                                                                      if (result2) {
                                                                        lastIdComunEvaluacion = result2[0];
                                                                        console.log("Last ID comun Evaluacion ", lastIdComunEvaluacion)

                                                                        //anadiendo nombre de actividad a la tabla comon
                                                                        this.common.id_comun = null;
                                                                        this.common.nombre = excelDatas[0]['nombre_actividad'];;
                                                                        this.common.descripcion = null;


                                                                        this.service.addCommons(this.common)
                                                                          .subscribe(

                                                                            result => {
                                                                              if (result) {
                                                                                this.service.getCommons()
                                                                                  .subscribe(
                                                                                    result2 => {
                                                                                      if (result2) {
                                                                                        lastIdComunActividad = result2[0];
                                                                                        console.log("Last ID comun Actividad ", lastIdComunActividad)

                                                                                      }
                                                                                    }
                                                                                  )

                                                                              }
                                                                            }

                                                                          );


                                                                      }
                                                                    }
                                                                  )

                                                              }
                                                            }

                                                          );


                                                      }
                                                    }
                                                  )

                                              }
                                            }

                                          );



                                      }
                                    }
                                  )

                              }
                            }

                          );


                      }
                    }
                  )

              }
            }

          );



        // this.service.addIndicators(this.indicador)
        //   .subscribe(
        //     rt => console.log("rt= ", rt),
        //     er => console.log("error= ", er),
        //     () => console.log("Terminado")        
        //   )
      }
    }
    fileReader.readAsArrayBuffer(this.file);
  }

}