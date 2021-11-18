import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTourPageRoutingModule } from './new-tour-routing.module';

import { NewTourPage } from './new-tour.page';
import { MenuModule } from '../core/shared/menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTourPageRoutingModule,
    MenuModule
  ],
  declarations: [NewTourPage]
})
export class NewTourPageModule {}
