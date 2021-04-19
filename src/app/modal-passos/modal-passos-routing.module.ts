import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPassosPage } from './modal-passos.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPassosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPassosPageRoutingModule {}
