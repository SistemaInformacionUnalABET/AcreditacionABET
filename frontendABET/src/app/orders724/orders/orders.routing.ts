import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersListComponent } from '../orders/orders-list/orders-list.component';
import { OrdersNewComponent } from '../orders/orders-new/orders-new.component';
import { OrdersEditComponent } from '../orders/orders-edit/orders-edit.component';
import { OrdersItemsComponent } from '../orders/orders-items/orders-items.component';



const routes: Routes = [
{path: 'orders-list', component: OrdersListComponent},
{path: 'orders-new', component: OrdersNewComponent},
{path: 'orders-edit', component: OrdersEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

//REDIRECCIONAR MODULO WELCOME, LUEGO LOGIN Y ASIII. no AL APP