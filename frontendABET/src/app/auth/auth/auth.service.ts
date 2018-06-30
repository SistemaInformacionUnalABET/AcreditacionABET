import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

  userName: string;
  loggedIn: boolean;
  url = "http://localhost:8000/auth";

  constructor(private http: Http) {
    this.userName = '';
    // this.loggedIn = localStorage.getItem('token')?true:false;
    this.loggedIn = false;
  }

  login(userInfo) {
    let url = `${this.url}/login`;
    let iJson = JSON.stringify(userInfo);



    return this.http.post(url, iJson, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })

      .map(res => res.text())
      .map(res => {
        if (res == "errorAuth" || res == "userNoFound") {
          this.loggedIn = false;
        } else {
          localStorage.setItem('token', res);
          this.userName = userInfo.user;
          this.loggedIn = true;
        }

        return this, this.loggedIn;
      });
  }
  logout(): void {
    localStorage.removeItem('token');
    this.userName = '';
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}