import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {RouterModule} from '@angular/router';
import {CommonSharedModule} from '../modules/common/common-shared.module';
import {MaterialModule} from '../modules/material/material.module';
import {MatFormComponent} from './mat-form/mat-form.component';

@NgModule({
  declarations: [
    NavigationBarComponent,
    MatFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CommonSharedModule,
    MaterialModule
  ],
  exports: [
    NavigationBarComponent,
    MatFormComponent,
  ]
})
export class SharedComponentsModule { }
