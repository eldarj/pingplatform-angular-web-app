import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataspacePageComponent} from './dataspace-page.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../../shared/modules/material/material.module';
import {CommonSharedModule} from '../../shared/modules/common/common-shared.module';

const routes: Routes = [
  {path: '', component: DataspacePageComponent},
  {path: ':username', component: DataspacePageComponent, children: [{
      path: '**', component: DataspacePageComponent
    }]
  },
];

@NgModule({
  declarations: [
    DataspacePageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    CommonSharedModule
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [
  ]
})
export class DataspacePageModule {
}
