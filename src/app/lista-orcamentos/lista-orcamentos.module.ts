import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaOrcamentosPageRoutingModule } from './lista-orcamentos-routing.module';

import { ListaOrcamentosPage } from './lista-orcamentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaOrcamentosPageRoutingModule
  ],
  declarations: [ListaOrcamentosPage]
})
export class ListaOrcamentosPageModule {}
