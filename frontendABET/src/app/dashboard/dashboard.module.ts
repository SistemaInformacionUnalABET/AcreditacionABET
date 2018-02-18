import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { DashboardRoutingModule } from './dashboard.routing';
import { OrdersModule } from '../orders724/orders/orders.module';
import { OffersModule } from '../offers724/offers/offers.module';
import { NotificationsModule } from '../notifications724/notifications/notifications.module';

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
