import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntregaPageRoutingModule } from './entrega-routing.module';

import { EntregaPage } from './entrega.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntregaPageRoutingModule
  ],
  declarations: [EntregaPage]
})
export class EntregaPageModule {}
