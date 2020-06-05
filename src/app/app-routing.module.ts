import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  
  {
    path: 'edit-no-cancel',
    loadChildren: () => import('./edit-no-cancel/edit-no-cancel.module').then( m => m.EditNoCancelPageModule)
  },
  {
    path: 'edit-cancel',
    loadChildren: () => import('./edit-cancel/edit-cancel.module').then( m => m.EditCancelPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
