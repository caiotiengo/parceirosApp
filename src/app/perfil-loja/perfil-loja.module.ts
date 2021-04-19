import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilLojaPageRoutingModule } from './perfil-loja-routing.module';

import { PerfilLojaPage } from './perfil-loja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilLojaPageRoutingModule
  ],
  declarations: [PerfilLojaPage]
})
export class PerfilLojaPageModule {}
