import { Injectable, group } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'

import { Observable } from 'rxjs/Observable';
import { Indicator } from './../statistics/entities/indicator'
import { ViewCompleteGrade } from './../statistics/entities/viewCompleteGrade'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch'

import { BehaviorSubject } from 'rxjs';



@Injectable()
export class GraphicsService {

  // viewCompleteGradeList : ViewCompleteGrade[];
  // private messageSource = new BehaviorSubject(this.viewCompleteGradeList);
  // currentMessage = this.messageSource.asObservable();

  // changeMessage(viewCompleteGrade: ViewCompleteGrade[]) {
  //   // this.viewCompleteGradeList = viewCompleteGrade;
  //   this.messageSource.next(viewCompleteGrade);
  //   //this.messageSource.next(viewCompleteGrade)
  // }

  private headers = new Headers({ 'Content-Type': 'application/json' });

  private urlVCompleteGradesByParams = 'http://localhost:8000/vCompleteGrades/';


  constructor(private http: Http) {
    // this.viewCompleteGradeList = [];
    // this.messageSource = new BehaviorSubject(this.viewCompleteGradeList);
    // this.currentMessage = this.messageSource.asObservable();

   }

  concatenateParamsForViewCompleteGrades(
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

  ){

    // this.viewCompleteGradeList =[];
    var newUrl = this.urlVCompleteGradesByParams + "?"

    if (id_course) {
      newUrl = newUrl + "&id_course=" + id_course;
    }
    if (group_number) {
      newUrl = newUrl + "&group_number=" + group_number;
    }
    if (id_indicator) {
      newUrl = newUrl + "&id_indicator=" + id_indicator;
    }
    if (identificator_indicator) {
      newUrl = newUrl + "&indicator_identificator="+ "\"" + identificator_indicator+ "\"";
    }
    if (type_evaluation) {
      newUrl = newUrl + "&evaluation_type=" + "\""+ type_evaluation+ "\"";
    }
    if (type_activity) {
      newUrl = newUrl + "&activity_type="+ "\"" + type_activity+ "\"";
    }
    if (document) {
      newUrl = newUrl + "&document="+ "\"" + document+ "\"";
    }
    if (grade) {
      newUrl = newUrl + "&grade" + grade;
    }
    if (descriptionGrade) {
      newUrl = newUrl + "&description" + "\""+ descriptionGrade+ "\"";
    }
    if (period) {
      newUrl = newUrl + "&period" + "\""+ period+ "\"";
    }
    if (creationDate) {
      newUrl = newUrl + "&creation_date" + "\""+ creationDate+ "\"";
    }
    if (modificationDate) {
      newUrl = newUrl + "&modify_date=" + "\""+ modificationDate+ "\"";
    }
    if (observation) {
      newUrl = newUrl + "&observation=" + "\""+ observation+ "\"";
    }
    if (urlEvidence) {
      newUrl = newUrl + "&url_evidence=" + "\""+ urlEvidence+ "\"";
    }

    return newUrl
    
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

    var urlParams = this.concatenateParamsForViewCompleteGrades(
      id_course,
      group_number,
      id_indicator,
      identificator_indicator,
      type_evaluation,
      type_activity,
      document,
      grade,
      descriptionGrade,
      period,
      creationDate,
      modificationDate,
      observation,
      urlEvidence 
    );
    let url = `${urlParams}`;

    return this.http.get(url)
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
