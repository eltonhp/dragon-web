import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Dragon} from '../../../core/model/dragon';
import {switchMap} from 'rxjs/operators';
import {DragonService} from '../../../core/services/dragon.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ConfirmDialogComponent} from '../../../core/components/confirm-dialog/confirm-dialog.component';
import {MessageService} from '../../../core/services/message.service';

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
              private router: Router,
              private messageService: MessageService) { }

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

    private removeDragon() {
        this.dragonService.deleteById(this.dragon.id).subscribe(result => {
            const msg = `Dragon de código: ${result.id} foi removido com sucesso!`;
            this.messageService.success(msg, true, true);
            this.goBack();
        }, error => {
            this.messageService.error(`${error}  - o dragon não foi removido!`, 'danger', true);
        });

    }

    onEdit($event: MouseEvent) {
        this.router.navigate(['/nav/dragon/dragon-edit', this.dragon.id])
    }
}
