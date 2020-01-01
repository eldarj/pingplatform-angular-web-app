import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePageModule} from './pages/profile-page/profile-page.module';
import {DataSpacePageModule} from './pages/data-space-page/data-space-page.module';
import {DataspacePageModule} from './pages/dataspace-page/dataspace-page.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'get-started',
    loadChildren: () => import('./pages/authentication-page/authentication-page.module').then(m => m.AuthenticationPageModule)
  },
  {
    path: 'get-started2',
    loadChildren: () => import('./pages/auth-page/auth-page.module').then(m => m.AuthPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile-page/profile-page.module').then(m => ProfilePageModule)
  },
  {
    path: 'dataspace',
    loadChildren: () => import('./pages/dataspace-page/dataspace-page.module').then(m => DataspacePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
