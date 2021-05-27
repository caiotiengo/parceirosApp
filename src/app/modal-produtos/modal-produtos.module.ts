import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalProdutosPageRoutingModule } from './modal-produtos-routing.module';

import { ModalProdutosPage } from './modal-produtos.page';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalProdutosPageRoutingModule,
    BrMaskerModule

  ],
  declarations: [ModalProdutosPage]
})
export class ModalProdutosPageModule {}
