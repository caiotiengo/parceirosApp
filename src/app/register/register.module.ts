import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
import { BrMaskerModule } from 'br-mask';

import { RegisterPage } from './register.page';
import {ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()

  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
