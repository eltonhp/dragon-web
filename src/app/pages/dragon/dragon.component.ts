import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Component,
    DoCheck, HostListener,
    OnChanges,
    OnDestroy,
    OnInit, SimpleChanges
} from '@angular/core';
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
export class DragonComponent implements OnInit, OnDestroy, AfterContentChecked  {

  public displayedColumns = ['createdAt', 'name', 'type', 'details'];
  public dataSource = new MatTableDataSource<Dragon>();

  constructor(private dragonService: DragonService, private router: Router) { }

  ngOnInit() {
      this.loadDataSourceDragon();

  }

  loadDataSourceDragon() {
      if(this.dataSource.data.length === 0) {
          this.dragonService.getList().subscribe(value => {
              console.log('lista de dragões', value);
              this.dataSource.data = value;
          });
      }
  }


    onDetails(id: number) {
        this.router.navigate(['/nav/dragon/dragon-detail', id]);
    }

     ngOnDestroy() {
        console.log('destroi');
    }

    ngAfterContentChecked(): void {
         this.loadDataSourceDragon();
    }


    onAddDragon() {
        this.router.navigate(['/nav/dragon/dragon-edit']);
        this.clearDataSourceDragon();
    }


    private clearDataSourceDragon() {
        this.dataSource.data = [];
    }
}
