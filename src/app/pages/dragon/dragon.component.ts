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
          this.dragonService.getList().subscribe(result => {
             this.updateDataSource(result);
          });
      }
  }

  updateDataSource(dragonList: Dragon[]) {
      this.dataSource.data = dragonList.sort(compare);

      function compare(dragonA, dragonB) {
          const a = dragonA.name ? dragonA.name : '';
          const b = dragonB.name ? dragonB.name : '';
          if (a > b) { return 1; }
          if (b > a) { return -1; }
          return 0;
      }
  }

    onDetails(id: number) {
        this.router.navigate(['/nav/dragon/dragon-detail', id]);
        this.clearDataSourceDragon();
    }

     ngOnDestroy() {}

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
