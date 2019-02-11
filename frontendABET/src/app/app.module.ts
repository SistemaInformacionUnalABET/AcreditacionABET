import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';

import { MaterialModule } from './app.material';
// import {ChartModule} from 'angular-highcharts'


import 'hammerjs';

import { AppComponent } from './app.component';


import {  WelcomeModule } from "./welcome/welcome.module";
//import {  AuthenticationModule } from "./authentication/authentication.module";
//import {  Tienda724Module } from "./tienda724/tienda724.module";


import { AppRouting } from './app.routing';
import { MenuComponent } from './menu/menu.component';

//import { ComponentsModule } from './components/components.module';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(AppRouting),
    WelcomeModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatCardModule,
    // ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
