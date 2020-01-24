import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Dragon} from '../../../core/model/dragon';
import {switchMap} from 'rxjs/operators';
import {DragonService} from '../../../core/services/dragon.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ConfirmDialogComponent} from '../../../core/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-dragon-detail',
  templateUrl: './dragon-detail.component.html',
  styleUrls: ['./dragon-detail.component.scss']
})
export class DragonDetailComponent implements OnInit {

  dragon: Dragon;
  constructor(private location: Location,
              private dragonService: DragonService,
              private route: ActivatedRoute,
              private confirmDialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
      this.route.paramMap.pipe(
              switchMap((params: ParamMap) =>
              this.dragonService.get(params.get('id')))
      ).subscribe((result: Dragon) => {
          this.dragon = result;
      });
  }


  goBack(event?) {
      this.location.back();
  }

    onConfirmRemove(event: MouseEvent) {
        event.preventDefault();

        const dialogConfig = new MatDialogConfig();

        dialogConfig.data = {
            title: 'Deseja realmente remover o registro?'
        };

        const confirmRemoveDialogRef = this.confirmDialog.open(ConfirmDialogComponent, dialogConfig);

        confirmRemoveDialogRef.afterClosed().subscribe(result => {
            if (result === ConfirmDialogComponent.YES) {
               this.removeDragon();
            }
        });

    }

    private async  removeDragon() {
        const result = await this.dragonService.deleteById(this.dragon.id);
        this.goBack();
    }

    onEdit($event: MouseEvent) {
        this.router.navigate(['/nav/dragon/dragon-edit', this.dragon.id])
    }
}
