import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'entrega',
    loadChildren: () => import('./entrega/entrega.module').then( m => m.EntregaPageModule)
  },
  {
    path: 'ganhos',
    loadChildren: () => import('./ganhos/ganhos.module').then( m => m.GanhosPageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: 'add-proc',
    loadChildren: () => import('./add-proc/add-proc.module').then( m => m.AddProcPageModule)
  },
  {
    path: 'edit-proc/:id',
    loadChildren: () => import('./edit-proc/edit-proc.module').then( m => m.EditProcPageModule)
  },
  {
    path: 'entregas',
    loadChildren: () => import('./entregas/entregas.module').then( m => m.EntregasPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'lista-chat',
    loadChildren: () => import('./lista-chat/lista-chat.module').then( m => m.ListaChatPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'politica',
    loadChildren: () => import('./politica/politica.module').then( m => m.PoliticaPageModule)
  },
  {
    path: 'perfil-loja',
    loadChildren: () => import('./perfil-loja/perfil-loja.module').then( m => m.PerfilLojaPageModule)
  },
  {
    path: 'modal-passos',
    loadChildren: () => import('./modal-passos/modal-passos.module').then( m => m.ModalPassosPageModule)
  },
  {
    path: 'root',
    loadChildren: () => import('./root/root.module').then( m => m.RootPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'add-filial',
    loadChildren: () => import('./add-filial/add-filial.module').then( m => m.AddFilialPageModule)
  },
  {
    path: 'item',
    loadChildren: () => import('./item/item.module').then( m => m.ItemPageModule)
  },
  {
    path: 'lista-pedidos',
    loadChildren: () => import('./lista-pedidos/lista-pedidos.module').then( m => m.ListaPedidosPageModule)
  },
  {
    path: 'lista-orcamentos',
    loadChildren: () => import('./lista-orcamentos/lista-orcamentos.module').then( m => m.ListaOrcamentosPageModule)
  },
  {
    path: 'orcamento',
    loadChildren: () => import('./orcamento/orcamento.module').then( m => m.OrcamentoPageModule)
  },
  {
    path: 'modal-orcamento',
    loadChildren: () => import('./modal-orcamento/modal-orcamento.module').then( m => m.ModalOrcamentoPageModule)
  },
  {
    path: 'modal-produtos',
    loadChildren: () => import('./modal-produtos/modal-produtos.module').then( m => m.ModalProdutosPageModule)
  },
  {
    path: 'modal-detalhes',
    loadChildren: () => import('./modal-detalhes/modal-detalhes.module').then( m => m.ModalDetalhesPageModule)
  },
  {
    path: 'lista-produtos',
    loadChildren: () => import('./lista-produtos/lista-produtos.module').then( m => m.ListaProdutosPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
