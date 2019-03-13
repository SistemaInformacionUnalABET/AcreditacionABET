import { Component } from '@angular/core';
import { longStackSupport } from 'q';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router) {

  }

  logOut() {
    localStorage.removeItem('token');
    let link = ['/login'];
    this.router.navigate(link);
  }
}

