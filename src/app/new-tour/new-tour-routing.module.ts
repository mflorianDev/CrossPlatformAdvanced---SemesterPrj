import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTourPage } from './new-tour.page';

const routes: Routes = [
  {
    path: '',
    component: NewTourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTourPageRoutingModule {}
