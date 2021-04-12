import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaChatPageRoutingModule } from './lista-chat-routing.module';

import { ListaChatPage } from './lista-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaChatPageRoutingModule
  ],
  declarations: [ListaChatPage]
})
export class ListaChatPageModule {}
