import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Login2Component} from './components/login.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonSharedModule} from '../../shared/modules/common/common-shared.module';
import {MaterialModule} from '../../shared/modules/material/material.module';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';

const routes: Routes = [
  {path: '', component: Login2Component}
];

@NgModule({
  declarations: [
    Login2Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonSharedModule,
    MaterialModule
  ],
  exports: [
  ]
})
export class AuthenticationPageModule {
}
