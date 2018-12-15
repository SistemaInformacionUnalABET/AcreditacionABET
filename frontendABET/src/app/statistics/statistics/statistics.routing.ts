import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StatisticsNewComponent} from './statistics-new/statistics-new.component'
import {StatisticsListComponent} from './statistics-list/statistics-list.component'
import {StatisticsEditComponent} from './statistics-edit/statistics-edit.component'


const routes: Routes = [
//   {path: 'indicadores', component: OffersNewComponent,
//   children: [
//     {path: '', redirectTo: 'lista', pathMatch: 'full'},
//     {path: 'lista', component: OffersListComponent},
//     {path: 'detalle', component: OffersItemsComponent}
//   ]
// }

// {path: 'lista', component: OffersListComponent},
// {path: 'detalle', component: OffersEditComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
