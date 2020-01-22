import { Component, OnInit } from '@angular/core';
import {DragonService} from '../../core/services/dragon.service';

@Component({
  selector: 'app-dragon',
  templateUrl: './dragon.component.html',
  styleUrls: ['./dragon.component.scss']
})
export class DragonComponent implements OnInit {

  constructor(private dragonService: DragonService) { }

  ngOnInit() {
        this.dragonService.getList().subscribe(value => {
            console.log('lista de dragões', value);
        });
  }



}
