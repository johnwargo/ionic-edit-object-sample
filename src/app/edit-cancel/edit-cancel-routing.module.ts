import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCancelPage } from './edit-cancel.page';

const routes: Routes = [
  {
    path: '',
    component: EditCancelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCancelPageRoutingModule {}
