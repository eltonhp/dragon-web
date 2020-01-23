import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Dragon} from '../../../core/model/dragon';
import {switchMap} from 'rxjs/operators';
import {DragonService} from '../../../core/services/dragon.service';

@Component({
  selector: 'app-dragon-detail',
  templateUrl: './dragon-detail.component.html',
  styleUrls: ['./dragon-detail.component.scss']
})
export class DragonDetailComponent implements OnInit {

  dragon: Dragon;
  constructor(private location: Location,
              private dragonService: DragonService,
              private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.paramMap.pipe(
              switchMap((params: ParamMap) =>
              this.dragonService.get(params.get('id')))
      ).subscribe((result: Dragon) => {
          this.dragon = result;
          console.log('detalhe', this.dragon);
      });
  }


  goBack(event) {
      this.location.back();
  }

}
