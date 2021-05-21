import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalProdutosPage } from './modal-produtos.page';

const routes: Routes = [
  {
    path: '',
    component: ModalProdutosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalProdutosPageRoutingModule {}
