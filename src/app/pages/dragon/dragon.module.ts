import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragonComponent} from '../dragon/dragon.component';
import {DragonRoutingModule} from './dragon-routing.module';
import { DragonDetailComponent } from './dragon-detail/dragon-detail.component';
import {MaterialModule} from '../../core/components/material/material.module';
import { DragonEditComponent } from './dragon-edit/dragon-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [DragonComponent, DragonDetailComponent, DragonEditComponent],
    imports: [CommonModule,
              DragonRoutingModule,
              MaterialModule,
              FormsModule,
              ReactiveFormsModule],
})
export class DragonModule {}
