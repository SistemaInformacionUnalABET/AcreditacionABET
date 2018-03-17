import { Injectable } from '@angular/core';

import {Http, Response, Headers, RequestOptions} from '@angular/http'

import {Observable} from 'rxjs/Observable';
import {Indicators} from './../../statistics/statistics/entities/indicators';
import {Commons} from './../../statistics/statistics/entities/commons'


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch'



@Injectable()
export class OrdersService {
  private headers = new Headers({'Content-Type':'application/json'});
  private url = 'http://localhost:8000/indicadores/';
  private url2 = 'http://localhost:8000/comunes/';
  private url3 = 'http://localhost:8000/comunes/';


  constructor(private http: Http) { }

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


