import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { uploadDataItemsComponent } from '../uploadData/uploadData/uploadData-items/uploadData-items.component';
import { StatisticsItemsComponent } from '../statistics/statistics/statistics-items/statistics-items.component';
import { StatisticsListComponent } from '../statistics/statistics/statistics-list/statistics-list.component';
import { StatisticsEditComponent } from '../statistics/statistics/statistics-edit/statistics-edit.component';

import { NotificationsItemsComponent } from '../notifications/notifications/notifications-items/notifications-items.component';
import { GraphicsByCourseAverageComponent } from '../statistics/graphics/byCourse/graphics-by-course-average/graphics-by-course-average.component';
import { DetailsByCourseAverageComponent } from '../statistics/graphics/byCourse/details-by-course-average/details-by-course-average.component';
import { GraphicsByIndicatorAverageComponent } from '../statistics/graphics/byIndicator/graphics-by-indicator-average/graphics-by-indicator-average.component';
import { DetailsByIndicatorAverageComponent } from '../statistics/graphics/byIndicator/details-by-indicator-average/details-by-indicator-average.component';

const routes: Routes = [
  {path: 'upload', component: uploadDataItemsComponent},
  {path: 'statistics', component: StatisticsItemsComponent,
  children: [
    {path: '', redirectTo: 'graphic', pathMatch: 'full'},
    {path: 'graphicCourse', component: GraphicsByCourseAverageComponent},
    {path: 'detailCourse', component: DetailsByCourseAverageComponent},
    {path: 'graphicIndicator', component: GraphicsByIndicatorAverageComponent},
    {path: 'detailIndicator', component: DetailsByIndicatorAverageComponent}
    // {path: 'detail/:id', component: StatisticsEditComponent}

  ]

},
  {path: 'notifications', component: NotificationsItemsComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
