import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsTourPageRoutingModule } from './details-tour-routing.module';

import { DetailsTourPage } from './details-tour.page';
import { MenuModule } from '../core/shared/menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsTourPageRoutingModule,
    MenuModule
  ],
  declarations: [DetailsTourPage]
})
export class DetailsTourPageModule {}
