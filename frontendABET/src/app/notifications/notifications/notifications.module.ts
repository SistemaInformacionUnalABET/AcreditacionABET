import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications.routing';
import { NotificationsItemsComponent } from './notifications-items/notifications-items.component';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';
import { NotificationsNewComponent } from './notifications-new/notifications-new.component';
import { NotificationsEditComponent } from './notifications-edit/notifications-edit.component';

@NgModule({
  imports: [
    CommonModule,
    NotificationsRoutingModule
  ],
  declarations: [NotificationsItemsComponent, NotificationsListComponent, NotificationsNewComponent, NotificationsEditComponent]
})
export class NotificationsModule { }
