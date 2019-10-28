import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ProfilePageComponent } from './profile-page.component';

const routes: Routes = [
  {path: ':username', component: ProfilePageComponent}
];

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfilePageModule { }
