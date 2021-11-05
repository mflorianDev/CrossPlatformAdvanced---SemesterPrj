import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsTourPageRoutingModule } from './details-tour-routing.module';

import { DetailsTourPage } from './details-tour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsTourPageRoutingModule
  ],
  declarations: [DetailsTourPage]
})
export class DetailsTourPageModule {}
