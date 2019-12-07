import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Login2Component} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonSharedModule} from '../../shared/modules/common/common-shared.module';
import {MaterialModule} from '../../shared/modules/material/material.module';
import {Register2Component} from './register/register.component';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';

const routes: Routes = [
  {path: 'login', component: Login2Component},
  {path: 'join', component: Register2Component},
];

@NgModule({
  declarations: [
    Login2Component,
    Register2Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonSharedModule,
    SharedComponentsModule,
    MaterialModule
  ],
  exports: []
})
export class AuthenticationPageModule {
}
