import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { uploadDataItemsComponent } from '../uploadData/uploadData/uploadData-items/uploadData-items.component';
import { StatisticsItemsComponent } from '../statistics/statistics/statistics-items/statistics-items.component';

import { GraphicsByCourseAverageComponent } from '../statistics/graphics/byCourse/graphics-by-course-average/graphics-by-course-average.component';
import { DetailsByCourseAverageComponent } from '../statistics/graphics/byCourse/details-by-course-average/details-by-course-average.component';
import { GraphicsByIndicatorAverageComponent } from '../statistics/graphics/byIndicator/graphics-by-indicator-average/graphics-by-indicator-average.component';
import { DetailsByIndicatorAverageComponent } from '../statistics/graphics/byIndicator/details-by-indicator-average/details-by-indicator-average.component';

import { AuthGuard } from './../auth/auth/auth-login/auth-guard'
import { AuthLoginComponent } from '../auth/auth/auth-login/auth-login.component';

const routes: Routes = [
  {
    path: 'upload', component: uploadDataItemsComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'statistics', component: StatisticsItemsComponent,
    //canActivate: [AuthGuard],

    children: [
      {
        path: 'course', component: GraphicsByCourseAverageComponent,
        children: [
          { path: '', redirectTo: 'graphic', pathMatch: 'full' },
          { path: 'graphic', component: GraphicsByCourseAverageComponent },
          { path: 'detail', component: DetailsByCourseAverageComponent },
        ]
      },

      {
        path: 'indicator', component: GraphicsByIndicatorAverageComponent,
        children: [
          { path: '', redirectTo: 'graphic', pathMatch: 'full' },
          { path: 'graphic', component: GraphicsByIndicatorAverageComponent },
          { path: 'detail', component: DetailsByIndicatorAverageComponent },
        ]
      }

    ]

  },
  { path: 'login', component: AuthLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
