import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePageComponent} from './profile-page.component';
import {MaterialModule} from '../../shared/modules/material/material.module';

const routes: Routes = [
  {path: '', component: ProfilePageComponent},
  {path: ':username', component: ProfilePageComponent}
];

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class ProfilePageModule {
}
