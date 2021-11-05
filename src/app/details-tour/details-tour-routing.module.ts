import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsTourPage } from './details-tour.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsTourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsTourPageRoutingModule {}
