import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaOrcamentosPage } from './lista-orcamentos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaOrcamentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaOrcamentosPageRoutingModule {}
