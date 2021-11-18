import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

// Automatically log in users
const redirectLoggedInToHome = () => redirectLoggedInTo(['/home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'new-tour',
    loadChildren: () => import('./new-tour/new-tour.module').then( m => m.NewTourPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'new-tour/:trackingTour',
    loadChildren: () => import('./new-tour/new-tour.module').then( m => m.NewTourPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'overview-tours',
    loadChildren: () => import('./overview-tours/overview-tours.module').then( m => m.OverviewToursPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'details-tour/:id',
    loadChildren: () => import('./details-tour/details-tour.module').then( m => m.DetailsTourPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'tracking',
    loadChildren: () => import('./tracking/tracking.module').then( m => m.TrackingPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
