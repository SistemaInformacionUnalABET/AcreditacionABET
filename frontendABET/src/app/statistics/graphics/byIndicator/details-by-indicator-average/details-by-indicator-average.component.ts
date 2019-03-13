import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ViewCompleteGrade } from './../../../statistics/entities/viewCompleteGrade';
import { GraphicsService } from '../../graphics.service';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-details-by-indicator-average',
  templateUrl: './details-by-indicator-average.component.html',
  styleUrls: ['./details-by-indicator-average.component.css']
})
export class DetailsByIndicatorAverageComponent implements OnInit, OnChanges {



  data: any = [[1, 2, 3, 4, 4], [3, 4, 3, 1, 2]];
  dataForExport: any;
  // wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  flagGrades = false;

  completeGradesList: ViewCompleteGrade[];

  @Input() indicator: number;
  @Input() indicatorObj: any;

  constructor(private graphicsService: GraphicsService) {
    this.completeGradesList = [];
    this.dataForExport = [];
    this.indicator = null;
  }
  ngOnInit() {

  }

  ngOnChanges(){
    this.completeGradesList = [];

    if (this.indicator != null || this.indicator != undefined) {

      this.graphicsService.getViewCompleteGradesByParams(null,null,this.indicator)
      .subscribe(listComplete => {
        this.completeGradesList = listComplete
        if (this.completeGradesList.length > 0) {
          this.flagGrades = true;
        } else {
          this.flagGrades = false;
        }
      })
    }
  }



  iteratecompleteGradesList() {
    this.dataForExport = [];

    this.dataForExport.push(["id_asignatura", "codigo","numero_grupo", "id_indicador", "identificador_indicador", "tipo_evaluacion", "tipo_actividad",
      "documento", "calificacion", "descripcion_calificacion", "periodo", "fecha_creacion", "fecha_modificacion", "observacion", "evidencia_url"])

    for (let element of this.completeGradesList) {
      this.dataForExport.push([element.id_asignatura, element.codigo, element.numero_grupo, element.id_indicador, element.identificador_indicador,
      element.tipo_evaluacion, element.tipo_actividad, element.documento, element.calificacion, element.descripcion_calificacion,
      element.periodo, element.fecha_creacion, element.fecha_modificacion, element.observacion, element.evidencia_url
      ])
    }
  }

  export(): void {
    /* generate worksheet */

    this.iteratecompleteGradesList();

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.dataForExport);


    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    if(this.indicatorObj != undefined && this.indicatorObj!=null && this.indicatorObj['identificador_indicador']!=undefined && this.indicatorObj['identificador_indicador']!=null){
      this.fileName = 'Abet_indicador_'+this.indicatorObj['identificador_indicador']+'.xlsx';
    }
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}