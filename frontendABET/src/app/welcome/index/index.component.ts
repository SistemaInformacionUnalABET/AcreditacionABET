import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {MatButtonModule, MatCheckboxModule} from '@angular/material';

//import { AuthenticationService } from '../../authentication/authentication.service';

//import { LocalStorage } from '../../shared/localStorage';
//import { Token } from '../../shared/token';
//import { Person } from '../../shared/models/person';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    let link = ['/'];
    this.router.navigate(link);
  }

  //  goIndex() {
  //    let link = ['/'];
  //    this.router.navigate(link);
  //  }
  
}
