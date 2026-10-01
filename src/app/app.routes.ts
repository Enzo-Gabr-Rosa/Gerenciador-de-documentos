import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'autenticacao',
    loadComponent: () => import('./autenticacao/autenticacao.page').then( m => m.AutenticacaoPage)
  },
  {
    path: 'detalhes/:id',
    loadComponent: () => import('./detalhes/detalhes.page').then( m => m.DetalhesPage)
  },
];
