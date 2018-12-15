import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { uploadDataListComponent } from '../uploadData/uploadData-list/uploadData-list.component';
import { uploadDataNewComponent } from '../uploadData/uploadData-new/uploadData-new.component';
import { uploadDataEditComponent } from '../uploadData/uploadData-edit/uploadData-edit.component';
import { uploadDataItemsComponent } from '../uploadData/uploadData-items/uploadData-items.component';



const routes: Routes = [
{path: 'uploadData-list', component: uploadDataListComponent},
{path: 'uploadData-new', component: uploadDataNewComponent},
{path: 'uploadData-edit', component: uploadDataEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class uploadDataRoutingModule { }

//REDIRECCIONAR MODULO WELCOME, LUEGO LOGIN Y ASIII. no AL APP