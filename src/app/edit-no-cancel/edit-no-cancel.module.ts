import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditNoCancelPageRoutingModule } from './edit-no-cancel-routing.module';

import { EditNoCancelPage } from './edit-no-cancel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditNoCancelPageRoutingModule
  ],
  declarations: [EditNoCancelPage]
})
export class EditNoCancelPageModule {}
