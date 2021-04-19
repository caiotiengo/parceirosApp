import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPassosPageRoutingModule } from './modal-passos-routing.module';

import { ModalPassosPage } from './modal-passos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPassosPageRoutingModule
  ],
  declarations: [ModalPassosPage]
})
export class ModalPassosPageModule {}
