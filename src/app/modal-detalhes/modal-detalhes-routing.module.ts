import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDetalhesPage } from './modal-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDetalhesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDetalhesPageRoutingModule {}
