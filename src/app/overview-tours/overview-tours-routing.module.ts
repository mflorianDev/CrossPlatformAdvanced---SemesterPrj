import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewToursPage } from './overview-tours.page';

const routes: Routes = [
  {
    path: '',
    component: OverviewToursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverviewToursPageRoutingModule {}
