import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http'

import { Observable } from 'rxjs/Observable';
import { Indicator } from './../../statistics/statistics/entities/indicator';
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
import 'rxjs/add/operator/retryWhen'
import { Activity } from '../../statistics/statistics/entities/activity';
import { Grade } from '../../statistics/statistics/entities/grade';


@Injectable()
export class UploadService {

  // private headers = new Headers({ 'Content-Type': 'application/json' });
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
  private urlGetActivities = 'http://localhost:8000/activities/'
  private urlGetGrades = 'http://localhost:8000/grades/'
  private urlVDataCalification = 'http://localhost:8000/vDataVerification/'

  //Urls Post
  private urlPostStudents = 'http://localhost:8000/students/';
  private urlPostStudentGroups = 'http://localhost:8000/studentGroups/';
  private urlPostCourseIndicators = 'http://localhost:8000/courseIndicators/';
  private urlPostEvaluations = 'http://localhost:8000/evaluations/';
  private urlPostActivities = 'http://localhost:8000/activities/';
  private urlPostGrades = 'http://localhost:8000/grades/';

  private options;

  constructor(private http: Http) {

    let token = localStorage.getItem('token');
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + ' ' + token
    });
    this.options = new RequestOptions({ headers: headers });
  }

  getAllGoals(): Observable<Goal[]> {
    let url = `${this.urlGetGoals}`;
    return this.http.get(url, this.options)
      .map(r => r.json())
      .catch(this.handleError);
  }

  //GETS
  getIndicatorsByParams(
    id?: number,
    goal?: number,
    identificator?: string,
    name?: string,
    description?: string): Observable<Indicator[]> {

      let params: URLSearchParams = new URLSearchParams();
      params.set('id',  id?""+id:null);
      params.set('goal',  goal?""+goal:null);
      params.set('identificator', identificator?""+"\""+identificator+"\"":null);
      params.set('name', name?""+"\""+name+"\"":null);
      params.set('description', description?""+"\""+description+"\"":null)

      let myOption: RequestOptions = this.options;
      myOption.search = params;
  

    return this.http.get(this.urlGetIndicators, this.options)
      .map(r => r.json())
      .catch(this.handleError);
  }

  getCourseByParams(
    id_course?: number,
    code?: number,
    name?: string,
    description?: string): Observable<Course[]> {
    
    let params: URLSearchParams = new URLSearchParams();
    params.set('id',  id_course?""+id_course:null);
    params.set('code',  code?""+code:null);
    params.set('name', name?""+"\""+name+"\"":null);
    params.set('description', description?""+"\""+description+"\"":null)

    let myOption: RequestOptions = this.options;
    myOption.search = params;


    return this.http.get(this.urlGetCourses, this.options )
    .map(r => r.json())
    .catch(this.handleError);
  }

  getGroupByParams(
    id_group?: number,
    id_course?: number,
    number_group?: number): Observable<Group[]> {

      let params: URLSearchParams = new URLSearchParams();
      params.set('id',  id_group?""+id_group:null);
      params.set('id_course',  id_course?""+id_course:null);
      params.set('number_group', number_group?""+number_group:null)
    
      let myOption: RequestOptions = this.options;
      myOption.search = params;
  
    return this.http.get(this.urlGetGroups, this.options)
      .map(r => r.json())
      .catch(this.handleError);
  }


  getStudentsByParams(
    id?: number,
    document?: string,
    name?: string,
    email?: string): Observable<Student[]> {

      let params: URLSearchParams = new URLSearchParams();
      params.set('id',  id?""+id:null);
      params.set('document',  document?""+"\""+document+"\"":null);
      params.set('name', name?""+"\""+name+"\"":null);
      params.set('email', email?""+"\""+email+"\"":null)

      let myOption: RequestOptions = this.options;
      myOption.search = params;

    return this.http.get(this.urlGetStudents, this.options)
      .map(r => r.json())
      .catch(this.handleError);
  }

  getStudentGroupsByParams(
    id?: number,
    id_group?: number,
    id_student?: number,
    id_course?: number,
    period?: string
  ): Observable<StudentGroup[]> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('id',  id?""+id:null);
    params.set('id_group',  id_group?""+id_group:null);
    params.set('id_student', id_student?""+id_student:null);
    params.set('id_course', id_course?""+id_course:null);
    params.set('period', period?""+period:null);

    let myOption: RequestOptions = this.options;
    myOption.search = params;

    return this.http.get(this.urlGetStudentGroups, this.options)
      .map(r => r.json())
      .catch(this.handleError);
  }

  getCourseIndicatorsByParams(
    id?: number,
    id_course?: number,
    id_indicator?: number,
    period?: string
  ): Observable<CourseIndicator[]> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('id',  id?""+id:null);
    params.set('id_course',  id_course?""+id_course:null);
    params.set('id_indicator', id_indicator?""+id_indicator:null);
    params.set('period', period?""+"\""+period+"\"":null)

    let myOption: RequestOptions = this.options;
    myOption.search = params;

    return this.http.get(this.urlGetCourseIndicators, this.options)
      .map(r => r.json())
      .catch(this.handleError);
  }

  getEvaluationsByParams(
    id_evaluation?: number,
    type_activity?: string,
    id_course_indicator?: number): Observable<Evaluation[]> {


      let params: URLSearchParams = new URLSearchParams();
      params.set('id',  id_evaluation?""+id_evaluation:null);
      params.set('type',  type_activity?""+"\""+type_activity+"\"":null);
      params.set('id_asig_ind', id_course_indicator?""+id_course_indicator:null)
    
      let myOption: RequestOptions = this.options;
      myOption.search = params;

    return this.http.get(this.urlGetEvaluations, this.options)
      .map(r => r.json())
      .catch(this.handleError);
  }

  getActivitiesByParams(
    id?: number,
    type?: string,
    description?: string,
    id_evaluation?: number
  ): Observable<Activity[]> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('id',  id?""+id:null);
    params.set('type',  type?""+"\""+type+"\"":null);
    params.set('description', description?""+"\""+description+"\"":null);
    params.set('id_evaluation', id_evaluation?""+id_evaluation:null)

    let myOption: RequestOptions = this.options;
    myOption.search = params;

    return this.http.get(this.urlGetActivities, this.options)
      .map(r => r.json())
      .catch(this.handleError);
  }

  getGradesByParams(
    id?: number,
    idStudentGroup?: number,
    idActivity?: number,
    grade?: number,
    descriptionGrade?: string,
    creationDate?: string,
    modificationDate?: string,
    observation?: string,
    urlEvidence?: string
  ): Observable<Grade[]> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('id',  id?""+id:null);
    params.set('idStudentGroup',  idStudentGroup?""+idStudentGroup:null);
    params.set('idActivity', idActivity?""+idActivity:null);
    params.set('grade', grade?""+grade:null);
    params.set('descriptionGrade', descriptionGrade?""+"\""+descriptionGrade+"\"":null);
    params.set('creationDate', creationDate?""+"\""+creationDate+"\"":null);
    params.set('modificationDate', modificationDate?""+"\""+modificationDate+"\"":null);
    params.set('observation', observation?""+"\""+observation+"\"":null);
    params.set('urlEvidence', urlEvidence?""+"\""+urlEvidence+"\"":null);

    let myOption: RequestOptions = this.options;
    myOption.search = params;

    return this.http.get(this.urlGetGrades, this.options)
      .map(r => r.json())
      .catch(this.handleError);
  }


  getDataVerification(
    period?: string,
    id_indicator?: number,
    id_course?: number,
    id_group?: number,
    type_evaluation?: string,
    type_activity?: string,
    document?: string,
    name?: string,
    email?: string,
    grade?: number,
    observation?: string,
    urlEvidence?: string
  ): Observable<Grade[]> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('period',  period?""+"\""+period+"\"":null);
    params.set('id_indicator',  id_indicator?""+id_indicator:null);
    params.set('id_course', id_course?""+id_course:null);
    params.set('id_group', id_group?""+id_group:null);
    params.set('evaluation_type', type_evaluation?""+"\""+type_evaluation+"\"":null);
    params.set('activity_type', type_activity?""+"\""+type_activity+"\"":null);
    params.set('document', document?""+"\""+document+"\"":null);
    params.set('name', name?""+"\""+name+"\"":null);
    params.set('email', email?""+"\""+email+"\"":null);
    params.set('grade', grade?""+grade:null);
    params.set('observation', observation?""+"\""+observation+"\"":null);
    params.set('urlEvidence', urlEvidence?""+"\""+urlEvidence+"\"":null)
   
    let myOption: RequestOptions = this.options;
    myOption.search = params;
  
    return this.http.get(this.urlVDataCalification, this.options)
      .map(r => r.json())
      .catch(this.handleError);
  }


  //POST
  addStudents(student: Student) {
    let url = `${this.urlPostStudents}`;
    let iJson = JSON.stringify(student);
    console.log("HACIENDO EL ADD de Students", iJson);

    // return this.http.post(url, iJson, { headers: this.headers })
    return this.http.post(url, iJson, this.options)
      .map(r => r.json)
      .catch(this.handleError)
  }

  addStudentGroups(studentGroup: StudentGroup): Observable<Boolean | any> {
    let url = `${this.urlPostStudentGroups}`;
    let iJson = JSON.stringify(studentGroup);
    console.log("HACIENDO EL ADD de StudentsGrpups", iJson);

    return this.http.post(url, iJson, this.options)

      .map((r: Response) => {
        r.json
        console.log("RRRRR=", r);
        return r['_body'];
      }

      )

      .catch(this.handleError)

  }

  addCourseIndicators(courseIndicator: CourseIndicator) {
    let url = `${this.urlPostCourseIndicators}`;
    let iJson = JSON.stringify(courseIndicator);
    console.log("HACIENDO EL ADD de courseIndicators", iJson);

    return this.http.post(url, iJson, this.options)
      .map(r => r.json)
      .catch(this.handleError)
  }

  addEvaluations(evaluation: Evaluation) {
    let url = `${this.urlPostEvaluations}`;
    let iJson = JSON.stringify(evaluation);
    console.log("HACIENDO EL ADD de evaluacion", iJson);

    return this.http.post(url, iJson, this.options)
      .map(r => r.json)
      .catch(this.handleError)
  }

  addActivities(activity: Activity) {
    let url = `${this.urlPostActivities}`;
    let iJson = JSON.stringify(activity);
    console.log("HACIENDO EL ADD de actividad", iJson);

    return this.http.post(url, iJson, this.options)
      .map(r => r.json)
      .catch(this.handleError)
  }

  addGrades(grade: Grade) {
    let url = `${this.urlPostGrades}`;
    let iJson = JSON.stringify(grade);
    console.log("HACIENDO EL ADD de calificaciones", iJson);

    return this.http.post(url, iJson, this.options)
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


