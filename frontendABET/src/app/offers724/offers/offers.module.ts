import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers.routing';
import { OffersItemsComponent } from './offers-items/offers-items.component';
import { OffersEditComponent } from './offers-edit/offers-edit.component';
import { OffersNewComponent } from './offers-new/offers-new.component';
import { OffersListComponent } from './offers-list/offers-list.component';

@NgModule({
  imports: [
    CommonModule,
    OffersRoutingModule
  ],
  declarations: [OffersItemsComponent, OffersEditComponent, OffersNewComponent, OffersListComponent]
})
export class OffersModule { }
