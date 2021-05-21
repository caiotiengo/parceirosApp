import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDetalhesPageRoutingModule } from './modal-detalhes-routing.module';

import { ModalDetalhesPage } from './modal-detalhes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDetalhesPageRoutingModule
  ],
  declarations: [ModalDetalhesPage]
})
export class ModalDetalhesPageModule {}
