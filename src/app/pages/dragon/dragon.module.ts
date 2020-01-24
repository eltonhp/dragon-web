import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragonComponent} from '../dragon/dragon.component';
import {DragonRoutingModule} from './dragon-routing.module';
import { DragonDetailComponent } from './dragon-detail/dragon-detail.component';
import {MaterialModule} from '../../core/components/material/material.module';
import { DragonEditComponent } from './dragon-edit/dragon-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmDialogComponent} from '../../core/components/confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [DragonComponent, DragonDetailComponent, DragonEditComponent, ConfirmDialogComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA],
    imports: [CommonModule,
              DragonRoutingModule,
              MaterialModule,
              FormsModule,
              ReactiveFormsModule],
    entryComponents: [ConfirmDialogComponent]
})
export class DragonModule {}
