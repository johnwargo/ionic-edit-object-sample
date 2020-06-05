import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataObject } from '../classes/data-object';


@Component({
  selector: 'app-edit-cancel',
  templateUrl: './edit-cancel.page.html',
  styleUrls: ['./edit-cancel.page.scss'],
})
export class EditCancelPage implements OnInit {

  dataObject: DataObject;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('EditCancelPage: constructor()');
  }

  ngOnInit() {
    console.log('EditCancelPage: ngOnInit()');
    this.route.queryParams.subscribe(params => {
      const state = this.router.getCurrentNavigation().extras.state;
      this.dataObject = state.dataObject;
    });
  }

  dismiss() {

  }

  save() {

  }
}
