import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragonComponent} from '../dragon/dragon.component';
import {DragonRoutingModule} from './dragon-routing.module';
import { DragonDetailComponent } from './dragon-detail/dragon-detail.component';

@NgModule({
    declarations: [DragonComponent, DragonDetailComponent],
    imports: [CommonModule, DragonRoutingModule],
})
export class DragonModule {}
