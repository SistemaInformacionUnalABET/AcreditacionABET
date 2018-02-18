import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersItemsComponent } from '../orders724/orders/orders-items/orders-items.component';
import { OffersItemsComponent } from '../offers724/offers/offers-items/offers-items.component';
import { NotificationsItemsComponent } from '../notifications724/notifications/notifications-items/notifications-items.component';


const routes: Routes = [
  {path: 'orders', component: OrdersItemsComponent},
  {path: 'offers', component: OffersItemsComponent},
  {path: 'notifications', component: NotificationsItemsComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
