import { Injectable, group } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http'

import { Observable } from 'rxjs/Observable';
import { Indicator } from './../statistics/entities/indicator'
import { ViewCompleteGrade } from './../statistics/entities/viewCompleteGrade'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch'

import { BehaviorSubject } from 'rxjs';
import { url_backend } from '../../../assets/urls/urls';
import {  ViewCourseAvg } from '../statistics/entities/viewCourseAvg';
import { ViewCourseClasification } from '../statistics/entities/viewCourseClasification';
import { ViewCourseIndicatorAvg } from '../statistics/entities/viewCourseIndicatorAvg';
import { ViewIndicatorAvg } from '../statistics/entities/viewIndicatorAvg';
import { ViewIndicatorClasification } from '../statistics/entities/viewIndicatorClasification';
import { ViewIndicatorCourseAvg } from '../statistics/entities/ViewIndicatorCourseAvg';



@Injectable()
export class GraphicsService {

  private options;

  private urlVCompleteGradesByParams = 'http://' + url_backend + '/vCompleteGrades/';
  private urlVCourseAvgParams = 'http://' + url_backend + '/vAsignaturaAvg/';
  private urlVCourseClasificationParams = 'http://' + url_backend + '/vAsignaturaClasificacion/';
  private urlVCourseIndicatorAvgParams = 'http://' + url_backend + '/vAsignaturaIndAvg/';
  private urlVIndicatorAvgParams = 'http://' + url_backend + '/vIndicadorAvg/';
  private urlVIndicatorClasificationParams = 'http://' + url_backend + '/vIndicadorClasificacion/';
  private urlVIndicatorCourseAvgParams = 'http://' + url_backend + '/vIndicadorAsigAvg/';


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
    id_indicator?: number,
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
    params.set('id_course', id_course ? "" + id_course : null);
    params.set('group_number', group_number ? "" + group_number : null);
    params.set('id_indicator', id_indicator ? "" + id_indicator : null);
    params.set('indicator_identificator', identificator_indicator ? "" + identificator_indicator : null);
    params.set('evaluation_type', type_evaluation ? "" + "\"" + type_evaluation + "\"" : null);
    params.set('activity_type', type_activity ? "" + "\"" + type_activity + "\"" : null);
    params.set('document', document ? "" + "\"" + document + "\"" : null);
    params.set('grade', grade ? "" + grade : null);
    params.set('description', descriptionGrade ? "" + "\"" + descriptionGrade + "\"" : null);
    params.set('period', period ? "" + "\"" + period + "\"" : null);
    params.set('creation_date', creationDate ? "" + "\"" + creationDate + "\"" : null);
    params.set('modify_date', modificationDate ? "" + "\"" + modificationDate + "\"" : null);
    params.set('observation', observation ? "" + "\"" + observation + "\"" : null);
    params.set('url_evidence', urlEvidence ? "" + "\"" + urlEvidence + "\"" : null)

    let myOption: RequestOptions = this.options;
    myOption.search = params;

    return this.http.get(this.urlVCompleteGradesByParams, this.options)
      .map(r => r.json())
      .catch(this.handleError);
  }


  getViewCourseAvgByParams(
    id_course?: number,
  ): Observable<ViewCourseAvg[]> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('id_course', id_course ? "" + id_course : null);
    
    let myOption: RequestOptions = this.options;
    myOption.search = params;

    return this.http.get(this.urlVCourseAvgParams, this.options)
      .map(r => r.json())
      .catch(this.handleError);
  }

  getViewCourseClasificationByParams(
    id_course?: number,
  ): Observable<ViewCourseClasification[]> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('id_course', id_course ? "" + id_course : null);
    
    let myOption: RequestOptions = this.options;
    myOption.search = params;

    return this.http.get(this.urlVCourseClasificationParams, this.options)
      .map(r => r.json())
      .catch(this.handleError);
  }

  getViewCourseIndicatorAvgByParams(
    id_course?: number,
  ): Observable<ViewCourseIndicatorAvg[]> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('id_course', id_course ? "" + id_course : null);
    
    let myOption: RequestOptions = this.options;
    myOption.search = params;

    return this.http.get(this.urlVCourseIndicatorAvgParams, this.options)
      .map(r => r.json())
      .catch(this.handleError);
  }

  
  getViewIndicatorAvgByParams(
    id_indicator?: number,
  ): Observable<ViewIndicatorAvg[]> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('id_indicator', id_indicator ? "" + id_indicator : null);
    
    let myOption: RequestOptions = this.options;
    myOption.search = params;

    return this.http.get(this.urlVIndicatorAvgParams, this.options)
      .map(r => r.json())
      .catch(this.handleError);
  }

  getViewIndicatorClasificationByParams(
    id_indicator?: number,
  ): Observable<ViewIndicatorClasification[]> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('id_indicator', id_indicator ? "" + id_indicator : null);
    
    let myOption: RequestOptions = this.options;
    myOption.search = params;

    return this.http.get(this.urlVIndicatorClasificationParams, this.options)
      .map(r => r.json())
      .catch(this.handleError);
  }

  getViewIndicatorCourseAvgByParams(
    id_indicator?: number,
  ): Observable<ViewIndicatorCourseAvg[]> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('id_indicator', id_indicator ? "" + id_indicator : null);
    
    let myOption: RequestOptions = this.options;
    myOption.search = params;

    return this.http.get(this.urlVIndicatorCourseAvgParams, this.options)
      .map(r => r.json())
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {

    let errMsg: string;

    if (error instanceof Response) {
      let body = error.json() || '';
      let err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
