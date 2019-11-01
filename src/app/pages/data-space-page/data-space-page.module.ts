import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataSpacePageComponent} from './data-space-page.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../../shared/modules/material/material.module';
import {DataSpaceNavigationComponent} from './data-space-navigation/data-space-navigation.component';
import {NewDirectoryDialogComponent} from './dialogs/new-directory/new-directory-dialog.component';
import {CommonSharedModule} from '../../shared/modules/common/common-shared.module';

const routes: Routes = [
  {path: ':username', component: DataSpacePageComponent}
];

@NgModule({
  declarations: [
    DataSpacePageComponent,
    DataSpaceNavigationComponent,
    NewDirectoryDialogComponent
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
    NewDirectoryDialogComponent,
  ]
})
export class DataSpacePageModule {
}
