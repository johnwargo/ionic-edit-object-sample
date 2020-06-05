import { Component } from '@angular/core';

class DataObject {
  field1: string;
  field2: string;
}

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

  constructor() {
    console.log('HomePage: constructor()');
  }

  openRepo() {
    console.log('HomePage: openRepo()');
    window.open('https://github.com/johnwargo/ionic-edit-object-sample');
  }

  editNoCancel() {
    console.log('HomePage: editNoCancel()');

  }

  editWithCancel() {
    console.log('HomePage: editWithCancel()');

  }

}
