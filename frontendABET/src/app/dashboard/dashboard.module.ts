import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { DashboardRoutingModule } from './dashboard.routing';
import { UploadModule } from '../uploadData/uploadData/uploadData.module';
import { StatisticsModule } from '../statistics/statistics/statistics.module';
import { NotificationsModule } from '../notifications/notifications/notifications.module';

import { DashboardItemsComponent } from './dashboard-items/dashboard-items.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BrowserModule,
    UploadModule,
    StatisticsModule,
    NotificationsModule
  ],
  declarations: [DashboardItemsComponent],
  exports: [DashboardItemsComponent]
})
export class DashboardModule { }
