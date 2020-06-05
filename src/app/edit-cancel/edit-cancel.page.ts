import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataObject } from '../classes/data-object';
import clone from '../utils';

@Component({
  selector: 'app-edit-cancel',
  templateUrl: './edit-cancel.page.html',
  styleUrls: ['./edit-cancel.page.scss'],
})
export class EditCancelPage implements OnInit {

  dataObject: DataObject;
  tempObject: DataObject;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router
  ) {
    console.log('EditCancelPage: constructor()');
  }

  ngOnInit() {
    console.log('EditCancelPage: ngOnInit()');
    this.route.queryParams.subscribe(params => {
      // Pull state off the router
      const state = this.router.getCurrentNavigation().extras.state;
      // Get the data object off the state
      this.dataObject = state.dataObject;
      // Clone it to work with it locally
      this.tempObject = clone(this.dataObject);
    });
  }

  dismiss() {
    console.log('EditCancelPage: dismiss()');
    // Pop the page off the stack
    this.navCtrl.pop();
  }

  save() {
    console.log('EditCancelPage: save()');
    // Have to directly modify the properties to get Ionic to pass the values back
    this.dataObject.field1 = this.tempObject.field1;
    this.dataObject.field2 = this.tempObject.field2;
    // Pop the page off the stack
    this.navCtrl.pop();
  }
}
