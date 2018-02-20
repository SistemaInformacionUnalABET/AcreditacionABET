import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersItemsComponent } from '../orders724/orders/orders-items/orders-items.component';
import { OffersItemsComponent } from '../offers724/offers/offers-items/offers-items.component';
import { OffersListComponent } from '../offers724/offers/offers-list/offers-list.component';
import { OffersEditComponent } from '../offers724/offers/offers-edit/offers-edit.component';

import { NotificationsItemsComponent } from '../notifications724/notifications/notifications-items/notifications-items.component';


const routes: Routes = [
  {path: 'orders', component: OrdersItemsComponent},
  {path: 'offers', component: OffersItemsComponent,
  children: [
    {path: '', redirectTo: 'lista', pathMatch: 'full'},
    {path: 'lista', component: OffersListComponent},
    {path: 'detalle', component: OffersEditComponent},
    {path: 'detalle/:id', component: OffersEditComponent}
    
    
  ]

},
  {path: 'notifications', component: NotificationsItemsComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
