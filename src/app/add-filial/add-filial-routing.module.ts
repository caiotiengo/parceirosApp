import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFilialPage } from './add-filial.page';

const routes: Routes = [
  {
    path: '',
    component: AddFilialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFilialPageRoutingModule {}
