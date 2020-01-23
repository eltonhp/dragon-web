import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule, MatTableModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

/**
 * @author Elton H. Paula
 */
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
      MatButtonModule,
      MatTableModule
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
        MatTableModule
    ]
})
export class MaterialModule { }
