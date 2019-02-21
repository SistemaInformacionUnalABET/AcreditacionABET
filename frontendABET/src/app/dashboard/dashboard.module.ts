import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { DashboardRoutingModule } from './dashboard.routing';
import { UploadModule } from '../uploadData/uploadData/uploadData.module';
import { StatisticsModule } from '../statistics/statistics/statistics.module';

import { DashboardItemsComponent } from './dashboard-items/dashboard-items.component';
import { GraphicsModule } from '../statistics/graphics/graphics.module';

// import {AuthLoginComponent} from './../auth/auth/auth-login/auth-login.component';
import {AuthModule} from './../auth/auth/auth.module';
import { AuthService } from '../auth/auth/auth.service';
import { MatCardModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BrowserModule,
    UploadModule,
    StatisticsModule,
    GraphicsModule,
    AuthModule, 
    MatCardModule
  ],
  providers: [AuthService],
  declarations: [DashboardItemsComponent],
  exports: [DashboardItemsComponent]
})
export class DashboardModule { }
