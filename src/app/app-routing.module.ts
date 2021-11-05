import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'new-tour',
    loadChildren: () => import('./new-tour/new-tour.module').then( m => m.NewTourPageModule)
  },
  {
    path: 'overview-tours',
    loadChildren: () => import('./overview-tours/overview-tours.module').then( m => m.OverviewToursPageModule)
  },
  {
    path: 'details-tour/:id',
    loadChildren: () => import('./details-tour/details-tour.module').then( m => m.DetailsTourPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
