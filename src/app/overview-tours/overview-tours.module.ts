import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OverviewToursPageRoutingModule } from './overview-tours-routing.module';

import { OverviewToursPage } from './overview-tours.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OverviewToursPageRoutingModule
  ],
  declarations: [OverviewToursPage]
})
export class OverviewToursPageModule {}
