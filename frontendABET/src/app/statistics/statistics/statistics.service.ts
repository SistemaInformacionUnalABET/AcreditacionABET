import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http'

import {Observable} from 'rxjs/Observable';
import {Indicator} from './../statistics/entities/indicator'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch'


@Injectable()
export class OffersService {
  private headers = new Headers({'Content-Type':'application/json'});
  private url = 'http://localhost:8000/indicadores';

  constructor(private http: Http) { }

  getIndicators():Observable<Indicator[]>{
    let url = `${this.url}`;
    return this.http.get(url)
      .map(r => r.json())
      .catch(this.handleError);
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
