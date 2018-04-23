import { Injectable } from '@angular/core';

import {Http, Response, Headers, RequestOptions} from '@angular/http'

import {Observable} from 'rxjs/Observable';
import {Indicators} from './../../statistics/statistics/entities/indicators';
import {Commons} from './../../statistics/statistics/entities/commons'
import { Goal } from './../../statistics/statistics/entities/goal'
import { Course } from './../../statistics/statistics/entities/course'
import { Group } from '../../statistics/statistics/entities/group';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch'



@Injectable()
export class OrdersService {

  private headers = new Headers({'Content-Type':'application/json'});
  private url = 'http://localhost:8000/indicadores/';
  private url2 = 'http://localhost:8000/comunes/';
  private url3 = 'http://localhost:8000/comunes/';

  private urlGetGoals = 'http://localhost:8000/goals/';
  private urlGetIndicators = 'http://localhost:8000/indicators/';
  private urlGetCourses = 'http://localhost:8000/courses/';
  private urlGetGroups = 'http://localhost:8000/groups/';


  constructor(private http: Http) { }

  getAllGoals(): Observable<Goal[]> {
    let url = `${this.urlGetGoals}`;
    return this.http.get(url)
      .map(r => r.json())
      .catch(this.handleError);
  }

  concatenateParamsForGetIndicators(
    id?: number, 
    goal?: number, 
    identificator?: string, 
    name?: string, 
    description?: string){
      var newUrl = this.urlGetIndicators+"?"

      if(id){
        newUrl = newUrl + "&id=" + id;
      }if(goal){
        newUrl = newUrl + "&goal=" + goal;
      }if(identificator){
        newUrl = newUrl + "&identificator=" + identificator;
      }if(name){
        newUrl = newUrl + "&name=" + name;
      }if(description){
        newUrl = newUrl + "&description=" + description;
      }
      return newUrl;
  }

  concatenateParamsForGetCourses(
    id_course?: number, 
    code?: number, 
    name?: string, 
    description?: string){
      var newUrl = this.urlGetCourses+"?"

      if(id_course){
        newUrl = newUrl + "&id=" + id_course;
      }if(code){
        newUrl = newUrl + "&code=" + code;
      }if(name){
        newUrl = newUrl + "&name=" + name;
      }if(description){
        newUrl = newUrl + "&description=" + description;
      }
      return newUrl;
  }

  concatenateParamsForGetGroups(
    id_group?: number, 
    id_course?: number, 
    number_group?: number){
      var newUrl = this.urlGetGroups+"?"

      if(id_group){
        newUrl = newUrl + "&id=" + id_group;
      }if(id_course){
        newUrl = newUrl + "&id_course=" + id_course;
      }if(number_group){
        newUrl = newUrl + "&number_group=" + number_group;
      }
      return newUrl;
  }

  getIndicatorsByParams(
    id?: number, 
    goal?: number, 
    identificator?: string, 
    name?: string, 
    description?: string): Observable<Indicators[]> {
      var urlParams = this.concatenateParamsForGetIndicators(id, goal, identificator, name, description);
      let url = `${urlParams}`;

      return this.http.get(url)
        .map(r => r.json())
        .catch(this.handleError);
  }

  getCourseByParams(
    id_course?: number, 
    code?: number, 
    name?: string, 
    description?: string): Observable<Course[]> {
      var urlParams = this.concatenateParamsForGetCourses(id_course, code, name, description);
      let url = `${urlParams}`;

      return this.http.get(url)
        .map(r => r.json())
        .catch(this.handleError);
  }

  getGroupByParams(id_group?: number, 
    id_course?: number, 
    number_group?: number): Observable<Group[]> {
      var urlParams = this.concatenateParamsForGetGroups(id_group, id_course, number_group);
      let url = `${urlParams}`;

      return this.http.get(url)
        .map(r => r.json())
        .catch(this.handleError);
  }

  getCommons():Observable<Commons[]>{
    let url = `${this.url3}`;
    return this.http.get(url)
      .map(r => r.json())
      .catch(this.handleError);
  }


  addIndicators(indicators: Indicators){
    let url = `${this.url}`;
    let iJson = JSON.stringify(indicators);
    console.log("HACIENDO EL ADD ", iJson);
    
    return this.http.post(url, iJson,  {headers: this.headers})
      .map(r => r.json)
      .catch(this.handleError)
  }

  addCommons(commons: Commons){
    let url = `${this.url2}`;
    let iJson = JSON.stringify(commons);
    console.log("HACIENDO EL ADD DE CUMUN", iJson);
    
    return this.http.post(url, iJson,  {headers: this.headers})
      .map(r => r.json)
      .catch(this.handleError)
  }



  private handleError(error: Response | any){
    let errMsg: string;
    if(error instanceof Response) {
      let body = error.json() || '';
      let err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }else{
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}


