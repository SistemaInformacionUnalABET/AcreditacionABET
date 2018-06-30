import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { IndexComponent } from './index/index.component'
import { DashboardItemsComponent } from '../dashboard/dashboard-items/dashboard-items.component'
import { AuthModule } from '../auth/auth/auth.module'

import { AuthLoginComponent } from '../auth/auth/auth-login/auth-login.component'



export const WelcomeRoutingModule: Routes = [
  { path: '', component: IndexComponent },
  { path: 'dashboard', component: DashboardItemsComponent }
  // { path: 'login', component: AuthLoginComponent }
]
