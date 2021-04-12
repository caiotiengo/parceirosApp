import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaChatPage } from './lista-chat.page';

const routes: Routes = [
  {
    path: '',
    component: ListaChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaChatPageRoutingModule {}
