import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {DataObject} from '../classes/data-object';

@Component({
  selector: 'app-edit-no-cancel',
  templateUrl: './edit-no-cancel.page.html',
  styleUrls: ['./edit-no-cancel.page.scss'],
})
export class EditNoCancelPage implements OnInit {

  dataObject: DataObject;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('EditNoCancelPage: constructor()');
   }

  ngOnInit() {
    console.log('EditNoCancelPage: ngOnInit()');
    this.route.queryParams.subscribe(params => {
      const state = this.router.getCurrentNavigation().extras.state;
      this.dataObject = state.dataObject;
      // console.table(this.dataObject);
    });
  }

}
