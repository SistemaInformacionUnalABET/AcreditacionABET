import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ViewCompleteGrade } from './../../../statistics/entities/viewCompleteGrade';
import { GraphicsService } from '../../graphics.service';


import * as XLSX from 'xlsx';
import { MAT_TOOLTIP_SCROLL_STRATEGY } from '@angular/material';

@Component({
  selector: 'app-details-by-course-average',
  templateUrl: './details-by-course-average.component.html',
  styleUrls: ['./details-by-course-average.component.css']
})
export class DetailsByCourseAverageComponent implements OnInit, OnChanges {

  @Input() course: number;
  @Input() courseObj: any;

  data: any = [[1, 2, 3, 4, 4], [3, 4, 3, 1, 2]];
  dataForExport: any;
  // wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  flagGrades = false;

  completeGradesList: ViewCompleteGrade[];

  constructor(private graphicsService: GraphicsService) {
    this.completeGradesList = [];
    this.dataForExport = [];
    this.course = null;
  }
  ngOnInit() {



  }
  ngOnChanges(){
    this.completeGradesList = [];

    if (this.course != null || this.course != undefined) {

      this.graphicsService.getViewCompleteGradesByParams(this.course)
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

    this.dataForExport.push(["id_asignatura","codigo", "numero_grupo", "id_indicador", "identificador_indicador", "tipo_evaluacion", "tipo_actividad",
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

    if(this.courseObj != undefined && this.courseObj!=null && this.courseObj['codigo']!=undefined && this.courseObj['codigo']!=null){
      this.fileName = 'Abet_asignatura_'+this.courseObj['codigo']+'.xlsx';
    }

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}