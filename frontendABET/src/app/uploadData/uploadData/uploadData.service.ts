import { Injectable } from '@angular/core';

import {Http, Response, Headers, RequestOptions} from '@angular/http'

import {Observable} from 'rxjs/Observable';
import {Indicator} from './../../statistics/statistics/entities/indicator';
import {Commons} from './../../statistics/statistics/entities/commons'
import { Goal } from './../../statistics/statistics/entities/goal'
import { Course } from './../../statistics/statistics/entities/course'
import { Group } from '../../statistics/statistics/entities/group';
import { Evaluation } from '../../statistics/statistics/entities/evaluation';
import { Student } from '../../statistics/statistics/entities/student';
import { StudentGroup } from '../../statistics/statistics/entities/studentGroup';
import { CourseIndicator } from '../../statistics/statistics/entities/courseIndicator';


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
  private urlGetEvaluations = 'http://localhost:8000/Evaluations/';
  private urlGetStudents = 'http://localhost:8000/students/';
  private urlGetStudentGroups = 'http://localhost:8000/studentGroups/';
  private urlGetCourseIndicators = 'http://localhost:8000/courseIndicators/'

 //Urls Post
  private urlPostStudents = 'http://localhost:8000/students/';
  private urlPostStudentGroups = 'http://localhost:8000/studentGroups/';
  private urlPostCourseIndicators = 'http://localhost:8000/courseIndicators/'


  constructor(private http: Http) { }

  getAllGoals(): Observable<Goal[]> {
    let url = `${this.urlGetGoals}`;
    return this.http.get(url)
      .map(r => r.json())
      .catch(this.handleError);
  }


  //Mange params
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

  concatenateParamsForGetEvaluations(
    id_evaluation?: number, 
    type?: string, 
    evidence_url?: string,
    id_course_indicator?: number){
      var newUrl = this.urlGetEvaluations+"?"

      if(id_evaluation){
        newUrl = newUrl + "&id=" + id_evaluation;
      }if(type){
        newUrl = newUrl + "&type=" + type;
      }if(evidence_url){
        newUrl = newUrl + "&url=" + evidence_url;
      }if(id_course_indicator){
        newUrl = newUrl + "&id_asig_ind=" + id_course_indicator;
      }

      return newUrl;
  }

  concatenateParamsForGetStudents(
    id?: number, 
    document?: string, 
    name?: string,
    email?: string){
      var newUrl = this.urlGetStudents+"?"

      if(id){
        newUrl = newUrl + "&id=" + id;
      }if(document){
        newUrl = newUrl + "&document=" + document;
      }if(name){
        newUrl = newUrl + "&name=" + name;
      }if(email){
        newUrl = newUrl + "&email=" + email;
      }

      return newUrl;
  }
  concatenateParamsForGetStudentGroups(
    id?: number, 
    id_group?: number, 
    id_student?: number, 
    id_course?: number){

      var newUrl = this.urlGetStudentGroups+"?"

      if(id){
        newUrl = newUrl + "&id=" + id;
      }if(id_group){
        newUrl = newUrl + "&id_group=" + id_group;
      }if(id_student){
        newUrl = newUrl + "&id_student=" + id_student;
      }if(id_course){
        newUrl = newUrl + "&eid_course=" + id_course;
      }

      return newUrl;
  }

  concatenateParamsForGetCourseIndicators(
    id?: number, 
    id_course?: number, 
    id_indicator?: number
  ){
    var newUrl = this.urlGetCourseIndicators+"?"

      if(id){
        newUrl = newUrl + "&id=" + id;
      }
      if(id_course){
        newUrl = newUrl + "&eid_course=" + id_course;
      }
      if(id_indicator){
        newUrl = newUrl + "&eid_indicator=" + id_indicator;
      }

      return newUrl;
  }

  //GETS
  getIndicatorsByParams(
    id?: number, 
    goal?: number, 
    identificator?: string, 
    name?: string, 
    description?: string): Observable<Indicator[]> {
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

  getGroupByParams(
    id_group?: number, 
    id_course?: number, 
    number_group?: number): Observable<Group[]> {
      var urlParams = this.concatenateParamsForGetGroups(id_group, id_course, number_group);
      let url = `${urlParams}`;

      return this.http.get(url)
        .map(r => r.json())
        .catch(this.handleError);
  }

  getEvaluationByParams(
    id_evaluation?: number, 
    type?: string, 
    evidence_url?: string,
    id_course_indicator?: number): Observable<Evaluation[]> {
      var urlParams = this.concatenateParamsForGetEvaluations(id_evaluation, type, evidence_url,id_course_indicator);
      let url = `${urlParams}`;

      return this.http.get(url)
        .map(r => r.json())
        .catch(this.handleError);
  }

  getStudentsByParams(
    id?: number, 
    document?: string, 
    name?: string, 
    email?: string): Observable<Student[]> {
      var urlParams = this.concatenateParamsForGetStudents(id, document, name, email);
      let url = `${urlParams}`;

      return this.http.get(url)
        .map(r => r.json())
        .catch(this.handleError);
  }

  getStudentGroupsByParams(
    id?: number, 
    id_group?: number, 
    id_student?: number, 
    id_course?: number
  ): Observable<StudentGroup[]> {
      var urlParams = this.concatenateParamsForGetStudentGroups(id, id_group, id_student, id_course);
      let url = `${urlParams}`;

      return this.http.get(url)
        .map(r => r.json())
        .catch(this.handleError);
  }

  getCourseIndicatorsByParams(
    id?: number, 
    id_course?: number, 
    id_indicator?: number
  ): Observable<CourseIndicator[]> {
    var urlParams = this.concatenateParamsForGetCourseIndicators(id,id_course, id_indicator);
    let url = `${urlParams}`;

    return this.http.get(url)
      .map(r => r.json())
      .catch(this.handleError);
}

  

  //POST
  addStudents(student: Student){
    let url = `${this.urlPostStudents}`;
    let iJson = JSON.stringify(student);
        
    return this.http.post(url, iJson,  {headers: this.headers})
      .map(r => r.json)
      .catch(this.handleError)
  }

  addStudentGroups(studentGroup: StudentGroup ){
    let url = `${this.urlPostStudentGroups}`;
    let iJson = JSON.stringify(studentGroup);
    console.log("HACIENDO EL ADD DE student grupo", iJson);
    
    return this.http.post(url, iJson,  {headers: this.headers})
      .map(r => r.json)
      .catch(this.handleError)
  }

  addCourseIndicators(courseIndicator:CourseIndicator){
    let url = `${this.urlPostCourseIndicators}`;
    let iJson = JSON.stringify(courseIndicator);
    console.log("HACIENDO EL ADD de curso_indicador", iJson);
    
    return this.http.post(url, iJson,  {headers: this.headers})
      .map(r => r.json)
      .catch(this.handleError)
  }


/*
  getCommons():Observable<Commons[]>{
    let url = `${this.url3}`;
    return this.http.get(url)
      .map(r => r.json())
      .catch(this.handleError);
  }


  addIndicators(indicators: Indicator){
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
*/
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


