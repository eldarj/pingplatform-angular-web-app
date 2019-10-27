import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../modules/material/material.module';

@NgModule({
  declarations: [
    NavigationBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    NavigationBarComponent,
  ]
})
export class SharedComponentsModule { }
