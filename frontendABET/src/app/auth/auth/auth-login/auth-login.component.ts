import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './../auth.service'

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  titulo: string = "";
  title: string = "EL GRAN TITULO";

  isLogged: boolean = false;
  error: string = "";
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.titulo = 'Login';
    this.auth.logout();
    this.createControls();
  }

  createControls() {
    this.form = this.fb.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  login(f) {
    console.log("FFFF ->> ", f);
    
    let token: string;
    this.auth.login(f)
      .subscribe(
        rs => this.isLogged = rs,
        er => console.log(er),
        () => {
          if (this.isLogged) {
            this.goStatisticsItems();
          } else {
            this.error = 'errorAuth'
          }
        }
      )

  }

  goStatisticsItems(){
    let link = ['/statistics'];
    this.router.navigate(link);
  }

}
