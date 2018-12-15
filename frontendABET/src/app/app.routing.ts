import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


import { WelcomeRoutingModule }  from './welcome/welcome.routing'
//import { AuthenticationRouting }  from './authentication/authentication.routing'
//import { Tienda724Routing }  from './tienda724/tienda724.routing'


//import { DashboardComponent } from './dashboard/dashboard.component';
//import { UserProfileComponent } from './user-profile/user-profile.component';
//import { TableListComponent } from './table-list/table-list.component';



export const AppRouting: Routes = [
  // { path: '',          redirectTo: '', pathMatch: 'full' }
  ...WelcomeRoutingModule,
  //...AuthenticationRouting,
  //...Tienda724Routing,npm cache verify

  { path: '*', redirectTo:'/',pathMatch:'full'}
];
