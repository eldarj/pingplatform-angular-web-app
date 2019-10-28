import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonSharedModule} from '../../shared/modules/common/common-shared.module';
import {MaterialModule} from '../../shared/modules/material/material.module';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'join', component: RegisterComponent}
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
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
export class AuthPageModule {
}
