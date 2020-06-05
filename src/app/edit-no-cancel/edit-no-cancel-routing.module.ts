import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditNoCancelPage } from './edit-no-cancel.page';

const routes: Routes = [
  {
    path: '',
    component: EditNoCancelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditNoCancelPageRoutingModule {}
