import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from './shared/modules/material/material.module';
import {ProfilePageModule} from './pages/profile-page/profile-page.module';

const routes: Routes = [
  {path: '', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)},
  {path: 'get-started', loadChildren: () => import('./pages/auth-page/auth-page.module').then(m => m.AuthPageModule)},
  {path: 'profile', loadChildren: () => import('./pages/profile-page/profile-page.module').then(m => ProfilePageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
