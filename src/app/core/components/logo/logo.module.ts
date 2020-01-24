import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo.component';
import {MaterialModule} from '../material/material.module';

@NgModule({
    declarations: [LogoComponent],
    exports: [LogoComponent],
    imports: [CommonModule, MaterialModule],
})
export class LogoModule {}
