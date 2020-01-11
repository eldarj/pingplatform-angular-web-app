import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataspacePageComponent} from './dataspace-page.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../../shared/modules/material/material.module';
import {CommonSharedModule} from '../../shared/modules/common/common-shared.module';
import {FilePreviewComponent} from './file-preview/file-preview.component';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';

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
    FilePreviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    CommonSharedModule,
    SharedComponentsModule
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [
  ]
})
export class DataspacePageModule {
}
