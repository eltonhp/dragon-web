import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-dragon-detail',
  templateUrl: './dragon-detail.component.html',
  styleUrls: ['./dragon-detail.component.scss']
})
export class DragonDetailComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }


  goBack(event) {
      this.location.back();
  }

}
