import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { AuthenticationService } from './core/services/authentication.service';
import { ServiceModule } from './core/services/service.module';

import { APP_INITIALIZER } from '@angular/core';

export function initAuth(authService: AuthenticationService) {
  return async () => {
    await authService.init();
    console.log('AUTH INIT SUCCESS');
    return Promise.resolve();
  };
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServiceModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BackgroundMode,
    { provide: APP_INITIALIZER, useFactory: initAuth, deps: [AuthenticationService], multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
