import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      MatSidenavModule,
      MatListModule,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatExpansionModule,
      MatCardModule,
      MatInputModule,
      MatButtonModule
  ],
    exports: [
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatExpansionModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
    ]
})
export class MaterialModule { }
