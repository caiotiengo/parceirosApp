import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilLojaPage } from './perfil-loja.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilLojaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilLojaPageRoutingModule {}
