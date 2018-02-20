import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OffersNewComponent} from './offers-new/offers-new.component'
import {OffersListComponent} from './offers-list/offers-list.component'
import {OffersEditComponent} from './offers-edit/offers-edit.component'


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
export class OffersRoutingModule { }
