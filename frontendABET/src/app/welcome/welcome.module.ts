import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { DashboardModule } from '../dashboard/dashboard.module';
import { DashboardItemsComponent } from '../dashboard/dashboard-items/dashboard-items.component';
import { IndexComponent } from './index/index.component';
import { MaterialModule } from '../app.material';
import {AuthModule} from '../auth724/auth/auth.module'


import 'hammerjs';

@NgModule({
  imports: [
    CommonModule,
    RouterModule, 
    BrowserAnimationsModule,
    BrowserModule, 
    MaterialModule,
    DashboardModule,
    AuthModule
  ],
  declarations: [IndexComponent],
  exports:[IndexComponent ]
})
export class WelcomeModule { }
