import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { DashboardRoutingModule } from './dashboard.routing';
import { OrdersModule } from '../uploadData/uploadData/uploadData.module';
import { OffersModule } from '../statistics/statistics/statistics.module';
import { NotificationsModule } from '../notifications/notifications/notifications.module';

import { DashboardItemsComponent } from './dashboard-items/dashboard-items.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BrowserModule,
    OrdersModule,
    OffersModule,
    NotificationsModule
  ],
  declarations: [DashboardItemsComponent],
  exports: [DashboardItemsComponent]
})
export class DashboardModule { }
