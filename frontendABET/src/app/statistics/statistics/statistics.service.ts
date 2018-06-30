import { Injectable, group } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http'

import { Observable } from 'rxjs/Observable';
import { Indicator } from './../statistics/entities/indicator'
import { ViewCompleteGrade } from './../statistics/entities/viewCompleteGrade'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch'


@Injectable()
export class StatisticsServices {
  // private headers = new Headers({ 'Content-Type': 'application/json' });

  private options;
  private urlVCompleteGradesByParams = 'http://localhost:8000/vCompleteGrades/';


  constructor(private http: Http) {
    let token = localStorage.getItem('token');
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + ' ' + token
    });
    this.options = new RequestOptions({ headers: headers });
   }

  getViewCompleteGradesByParams(
    id_course?: number,
    group_number?: number,
    id_indicator?:number,
    identificator_indicator?: string,
    type_evaluation?: string,
    type_activity?: string,
    document?: string,
    grade?: number,
    descriptionGrade?: string,
    period?: string,
    creationDate?: string,
    modificationDate?: string,
    observation?: string,
    urlEvidence?: string
  ): Observable<ViewCompleteGrade[]> {


    let params: URLSearchParams = new URLSearchParams();
    params.set('id_course',  id_course?""+id_course:null);
    params.set('group_number',  group_number?""+group_number:null);
    params.set('id_indicator', id_indicator?""+id_indicator:null);
    params.set('indicator_identificator', identificator_indicator?""+identificator_indicator:null);
    params.set('evaluation_type', type_evaluation?""+type_evaluation:null);
    params.set('activity_type', type_activity?""+type_activity:null);
    params.set('document', document?""+document:null);
    params.set('grade', grade?""+grade:null);
    params.set('description', descriptionGrade?""+descriptionGrade:null);
    params.set('period', period?""+period:null);
    params.set('creation_date', creationDate?""+creationDate:null);
    params.set('modify_date', modificationDate?""+modificationDate:null);
    params.set('observation', observation?""+observation:null);
    params.set('url_evidence', urlEvidence?""+urlEvidence:null)


    let myOption: RequestOptions = this.options;
    myOption.search = params;


    return this.http.get(this.urlVCompleteGradesByParams, this.options )

      .map(r => r.json())
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {

    let errMsg: string;

    if(error instanceof Response) {
      let body = error.json() || '';
      let err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
