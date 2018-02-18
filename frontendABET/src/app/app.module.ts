import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './app.material';

import 'hammerjs';

import { AppComponent } from './app.component';


import {  WelcomeModule } from "./welcome/welcome.module";
//import {  AuthenticationModule } from "./authentication/authentication.module";
//import {  Tienda724Module } from "./tienda724/tienda724.module";


import { AppRouting } from './app.routing';

//import { ComponentsModule } from './components/components.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRouting),
    WelcomeModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
