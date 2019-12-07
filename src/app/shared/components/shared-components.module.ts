import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {RouterModule} from '@angular/router';
import {CommonSharedModule} from '../modules/common/common-shared.module';
import {MaterialModule} from '../modules/material/material.module';
import {MatFormComponent} from './mat-form/mat-form.component';
import {MatFormInputComponent} from './mat-form/fields/mat-form-input/mat-form-input.component';
import {MatFormAutocompleteInputComponent} from './mat-form/fields/mat-form-autocomplete-input/mat-form-autocomplete-input.component';

@NgModule({
  declarations: [
    NavigationBarComponent,
    MatFormComponent,
    MatFormInputComponent,
    MatFormAutocompleteInputComponent,
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
    MatFormInputComponent,
    MatFormAutocompleteInputComponent,
  ]
})
export class SharedComponentsModule { }
