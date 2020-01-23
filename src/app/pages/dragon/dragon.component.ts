import { Component, OnInit } from '@angular/core';
import {DragonService} from '../../core/services/dragon.service';
import {MatTableDataSource} from '@angular/material';
import {Dragon} from '../../core/model/dragon';
import {Router} from '@angular/router';

/**
 * @author Elton H. Paula
 */
@Component({
  selector: 'app-dragon',
  templateUrl: './dragon.component.html',
  styleUrls: ['./dragon.component.scss']
})
export class DragonComponent implements OnInit {
  public displayedColumns = ['createdAt', 'name', 'type', 'details'];
  public dataSource = new MatTableDataSource<Dragon>();

  constructor(private dragonService: DragonService, private router: Router) { }

  ngOnInit() {
        this.dragonService.getList().subscribe(value => {
            console.log('lista de dragões', value);
            this.dataSource.data = value;
        });
  }


    onDetails(id: number) {
        this.router.navigate(['/nav/dragon/dragon-detail', id]);
    }
}
