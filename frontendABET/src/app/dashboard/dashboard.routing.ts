import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { uploadDataItemsComponent } from '../uploadData/uploadData/uploadData-items/uploadData-items.component';
import { StatisticsItemsComponent } from '../statistics/statistics/statistics-items/statistics-items.component';
import { StatisticsListComponent } from '../statistics/statistics/statistics-list/statistics-list.component';
import { StatisticsEditComponent } from '../statistics/statistics/statistics-edit/statistics-edit.component';

import { NotificationsItemsComponent } from '../notifications/notifications/notifications-items/notifications-items.component';


const routes: Routes = [
  {path: 'upload', component: uploadDataItemsComponent},
  {path: 'statistics', component: StatisticsItemsComponent,
  children: [
    {path: '', redirectTo: 'lista', pathMatch: 'full'},
    {path: 'lista', component: StatisticsListComponent},
    {path: 'detalle', component: StatisticsEditComponent},
    {path: 'detalle/:id', component: StatisticsEditComponent}
    
    
  ]

},
  {path: 'notifications', component: NotificationsItemsComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
