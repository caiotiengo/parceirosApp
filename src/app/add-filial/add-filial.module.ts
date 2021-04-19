import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFilialPageRoutingModule } from './add-filial-routing.module';

import { AddFilialPage } from './add-filial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFilialPageRoutingModule
  ],
  declarations: [AddFilialPage]
})
export class AddFilialPageModule {}
