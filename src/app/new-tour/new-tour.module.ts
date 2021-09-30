import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTourPageRoutingModule } from './new-tour-routing.module';

import { NewTourPage } from './new-tour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTourPageRoutingModule
  ],
  declarations: [NewTourPage]
})
export class NewTourPageModule {}
