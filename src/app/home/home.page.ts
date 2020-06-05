import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import {DataObject} from '../classes/data-object';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dataObject: DataObject = {
    field1: 'Some random value',
    field2: 'Another random value',
  };

  constructor(public nav: NavController,) {
    console.log('HomePage: constructor()');
  }

  openRepo() {
    console.log('HomePage: openRepo()');
    window.open('https://github.com/johnwargo/ionic-edit-object-sample');
  }

  editNoCancel() {
    console.log('HomePage: editNoCancel()');
    this.nav.navigateForward('/edit-no-cancel', { state: { dataObject: this.dataObject } });
  }

  editWithCancel() {
    console.log('HomePage: editWithCancel()');
    this.nav.navigateForward('/edit-cancel', { state: { dataObject: this.dataObject } });
  }

}
