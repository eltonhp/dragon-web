import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DragonComponent} from '../dragon/dragon.component';
import {DragonDetailComponent} from './dragon-detail/dragon-detail.component';

const routes: Routes = [
    { path: '', data: { shouldReuse: true, key: 'dragon' }, component: DragonComponent},
    { path: 'dragon-detail', component: DragonDetailComponent}


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DragonRoutingModule {}
