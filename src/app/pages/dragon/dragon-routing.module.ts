import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DragonComponent} from '../dragon/dragon.component';
import {DragonDetailComponent} from './dragon-detail/dragon-detail.component';
import {DragonEditComponent} from './dragon-edit/dragon-edit.component';
import {ConfirmDialogComponent} from '../../core/components/confirm-dialog/confirm-dialog.component';

const routes: Routes = [
    { path: '', data: { shouldReuse: true, key: 'dragon' }, component: DragonComponent},
    { path: 'dragon-detail/:id', component: DragonDetailComponent},
    { path: 'dragon-edit', component: DragonEditComponent},
    { path: 'dragon-edit/:id', component: DragonEditComponent}


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]

})
export class DragonRoutingModule {}
