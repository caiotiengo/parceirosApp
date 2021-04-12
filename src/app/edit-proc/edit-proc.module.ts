import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProcPageRoutingModule } from './edit-proc-routing.module';

import { EditProcPage } from './edit-proc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProcPageRoutingModule
  ],
  declarations: [EditProcPage]
})
export class EditProcPageModule {}
