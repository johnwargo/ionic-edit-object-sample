import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCancelPageRoutingModule } from './edit-cancel-routing.module';

import { EditCancelPage } from './edit-cancel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCancelPageRoutingModule
  ],
  declarations: [EditCancelPage]
})
export class EditCancelPageModule {}
