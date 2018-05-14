import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http'

import { Observable } from 'rxjs/Observable';
import { Indicator } from './../../statistics/statistics/entities/indicator';
import { Commons } from './../../statistics/statistics/entities/commons'
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
import { delay } from 'q';
import { Activity } from '../../statistics/statistics/entities/activity';
import { Grade } from '../../statistics/statistics/entities/grade';



@Injectable()
export class OrdersService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
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

  //Urls Post
  private urlPostStudents = 'http://localhost:8000/students/';
  private urlPostStudentGroups = 'http://localhost:8000/studentGroups/';
  private urlPostCourseIndicators = 'http://localhost:8000/courseIndicators/';
  private urlPostEvaluations = 'http://localhost:8000/evaluations/';
  private urlPostActivities = 'http://localhost:8000/activities/';
  private urlPostGrades = 'http://localhost:8000/grades/';


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
    description?: string) {
    var newUrl = this.urlGetIndicators + "?"

    if (id) {
      newUrl = newUrl + "&id=" + id;
    } if (goal) {
      newUrl = newUrl + "&goal=" + goal;
    } if (identificator) {
      newUrl = newUrl + "&identificator=" + "\"" + identificator + "\"";
    } if (name) {
      newUrl = newUrl + "&name=" + "\"" + name + "\"";
    } if (description) {
      newUrl = newUrl + "&description=" + "\"" + description + "\"";
    }
    return newUrl;
  }

  concatenateParamsForGetCourses(
    id_course?: number,
    code?: number,
    name?: string,
    description?: string) {
    var newUrl = this.urlGetCourses + "?"

    if (id_course) {
      newUrl = newUrl + "&id=" + id_course;
    } if (code) {
      newUrl = newUrl + "&code=" + code;
    } if (name) {
      newUrl = newUrl + "&name=" + "\"" + name + "\"";
    } if (description) {
      newUrl = newUrl + "&description=" + "\"" + description + "\"";
    }
    return newUrl;
  }

  concatenateParamsForGetGroups(
    id_group?: number,
    id_course?: number,
    number_group?: number) {
    var newUrl = this.urlGetGroups + "?"

    if (id_group) {
      newUrl = newUrl + "&id=" + id_group;
    } if (id_course) {
      newUrl = newUrl + "&id_course=" + id_course;
    } if (number_group) {
      newUrl = newUrl + "&number_group=" + number_group;
    }
    return newUrl;
  }

  concatenateParamsForGetEvaluations(
    id_evaluation?: number,
    type_evaluation?: string,
    id_course_indicator?: number) {
    var newUrl = this.urlGetEvaluations + "?"

    if (id_evaluation) {
      newUrl = newUrl + "&id=" + id_evaluation;
    }
    if (type_evaluation) {
      newUrl = newUrl + "&type=" + "\"" + type_evaluation + "\"";
    }
    if (id_course_indicator) {
      newUrl = newUrl + "&id_asig_ind=" + id_course_indicator;
    }
    return newUrl;
  }

  concatenateParamsForGetStudents(
    id?: number,
    document?: string,
    name?: string,
    email?: string) {
    var newUrl = this.urlGetStudents + "?"

    if (id) {
      newUrl = newUrl + "&id=" + id;
    } if (document) {
      newUrl = newUrl + "&document=" + "\"" + document + "\"";
    } if (name) {
      newUrl = newUrl + "&name=" + "\"" + name + "\"";
    } if (email) {
      newUrl = newUrl + "&email=" + "\"" + email + "\"";
    }

    return newUrl;
  }
  concatenateParamsForGetStudentGroups(
    id?: number,
    id_group?: number,
    id_student?: number,
    id_course?: number) {

    var newUrl = this.urlGetStudentGroups + "?"

    if (id) {
      newUrl = newUrl + "&id=" + id;
    } if (id_group) {
      newUrl = newUrl + "&id_group=" + id_group;
    } if (id_student) {
      newUrl = newUrl + "&id_student=" + id_student;
    } if (id_course) {
      newUrl = newUrl + "&id_course=" + id_course;
    }

    return newUrl;
  }

  concatenateParamsForGetCourseIndicators(
    id?: number,
    id_course?: number,
    id_indicator?: number
  ) {
    var newUrl = this.urlGetCourseIndicators + "?"

    if (id) {
      newUrl = newUrl + "&id=" + id;
    }
    if (id_course) {
      newUrl = newUrl + "&id_course=" + id_course;
    }
    if (id_indicator) {
      newUrl = newUrl + "&id_indicator=" + id_indicator;
    }

    return newUrl;
  }

  concatenateParamsForGetActivities(
    id?: number,
    type?: string,
    description?: string,
    id_evaluation?: number
  ) {
    var newUrl = this.urlGetActivities + "?"

    if (id) {
      newUrl = newUrl + "&id=" + id;
    }
    if (type) {
      newUrl = newUrl + "&type=" + "\"" + type + "\"";
    }
    if (description) {
      newUrl = newUrl + "&description=" + "\"" + description + "\"";
    }
    if (id_evaluation) {
      newUrl = newUrl + "&id_evaluation=" + id_evaluation;
    }

    return newUrl;
  }

  concatenateParamsForGetGrades(
    id: number,
    idStudentGroup: number,
    idActivity: number,
    grade: boolean,
    descriptionGrade: string,
    creationDate: Date,
    modificationDate: Date,
    period: string,
    observation: string,
    urlEvidence: string
  ) {
    var newUrl = this.urlGetGrades + "?"

    if (id) {
      newUrl = newUrl + "&id=" + id;
    }
    if (idStudentGroup) {
      newUrl = newUrl + "&idStudentGroup=" + idStudentGroup;
    }
    if (idActivity) {
      newUrl = newUrl + "&idActivity=" + idActivity;
    }
    if (grade) {
      newUrl = newUrl + "&grade=" + grade;
    }
    if (descriptionGrade) {
      newUrl = newUrl + "&descriptionGrade=" + "\"" + descriptionGrade + "\"";
    }
    if (creationDate) {
      newUrl = newUrl + "&creationDate=" + creationDate;
    }
    if (modificationDate) {
      newUrl = newUrl + "&modificationDate=" + modificationDate;
    }
    if (period) {
      newUrl = newUrl + "&period=" + "\"" + period + "\"";
    }
    if (observation) {
      newUrl = newUrl + "&observation=" + "\"" + observation + "\"";
    }
    if (urlEvidence) {
      newUrl = newUrl + "&urlEvidence=" + "\"" + urlEvidence + "\"";
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
    var urlParams = this.concatenateParamsForGetCourseIndicators(id, id_course, id_indicator);
    let url = `${urlParams}`;

    return this.http.get(url)
      .map(r => r.json())
      .catch(this.handleError);
  }

  getEvaluationsByParams(
    id_evaluation?: number,
    type_activity?: string,
    id_course_indicator?: number): Observable<Evaluation[]> {
    var urlParams = this.concatenateParamsForGetEvaluations(id_evaluation, type_activity, id_course_indicator);
    let url = `${urlParams}`;

    return this.http.get(url)
      .map(r => r.json())
      .catch(this.handleError);
  }

  getActivitiesByParams(
    id?: number,
    type?: string,
    description?: string,
    id_evaluation?: number
  ): Observable<Activity[]> {
    var urlParams = this.concatenateParamsForGetActivities(id, type, description, id_evaluation);
    let url = `${urlParams}`;

    return this.http.get(url)
      .map(r => r.json())
      .catch(this.handleError);
  }

  getGradesByParams(
    id,
    idStudentGroup,
    idActivity,
    grade,
    descriptionGrade,
    creationDate,
    modificationDate,
    period,
    observation,
    urlEvidence
  ): Observable<Grade[]> {
    var urlParams = this.concatenateParamsForGetGrades(
      id,
      idStudentGroup,
      idActivity,
      grade,
      descriptionGrade,
      creationDate,
      modificationDate,
      period,
      observation,
      urlEvidence
    );

    let url = `${urlParams}`;

    return this.http.get(url)
      .map(r => r.json())
      .catch(this.handleError);
  }

  //POST
  addStudents(student: Student) {
    let url = `${this.urlPostStudents}`;
    let iJson = JSON.stringify(student);
    console.log("HACIENDO EL ADD de Students", iJson);

    return this.http.post(url, iJson, { headers: this.headers })
      .map(r => r.json)
      .catch(this.handleError)
  }

  addStudentGroups(studentGroup: StudentGroup): Observable<Boolean | any> {
    let url = `${this.urlPostStudentGroups}`;
    let iJson = JSON.stringify(studentGroup);
    console.log("HACIENDO EL ADD de StudentsGrpups", iJson);

    return this.http.post(url, iJson, { headers: this.headers })

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
    console.log("HACIENDO EL ADD de courseInidcators", iJson);

    return this.http.post(url, iJson, { headers: this.headers })
      .map(r => r.json)
      .catch(this.handleError)
  }

  addEvaluations(evaluation: Evaluation) {
    let url = `${this.urlPostEvaluations}`;
    let iJson = JSON.stringify(evaluation);
    console.log("HACIENDO EL ADD de evaluacion", iJson);

    return this.http.post(url, iJson, { headers: this.headers })
      .map(r => r.json)
      .catch(this.handleError)
  }

  addActivities(activity: Activity) {
    let url = `${this.urlPostActivities}`;
    let iJson = JSON.stringify(activity);
    console.log("HACIENDO EL ADD de actividad", iJson);

    return this.http.post(url, iJson, { headers: this.headers })
      .map(r => r.json)
      .catch(this.handleError)
  }

  addGrades(grade: Grade) {
    let url = `${this.urlPostGrades}`;
    let iJson = JSON.stringify(grade);
    console.log("HACIENDO EL ADD de calificaciones", iJson);

    return this.http.post(url, iJson, { headers: this.headers })
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


