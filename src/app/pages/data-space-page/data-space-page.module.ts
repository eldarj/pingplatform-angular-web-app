import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataSpacePageComponent} from './data-space-page.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../../shared/modules/material/material.module';
import {DataSpaceNavigationComponent} from './data-space-navigation/data-space-navigation.component';
import {NewDirectoryDialogComponent} from './dialogs/new-directory/new-directory-dialog.component';
import {CommonSharedModule} from '../../shared/modules/common/common-shared.module';
import {OverwriteDirectoryDialogComponent} from './dialogs/overwrite-directory/overwrite-directory-dialog.component';
import {FilePreviewDialogComponent} from './dialogs/file-preview/file-preview-dialog.component';
import {FileUploadOverwriteComponent} from './dialogs/file-upload-overwrite/file-upload-overwrite.component';

const routes: Routes = [
  {path: ':username', component: DataSpacePageComponent}
];

@NgModule({
  declarations: [
    DataSpacePageComponent,
    DataSpaceNavigationComponent,
    NewDirectoryDialogComponent,
    OverwriteDirectoryDialogComponent,
    FilePreviewDialogComponent,
    FileUploadOverwriteComponent,
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
    OverwriteDirectoryDialogComponent,
    FilePreviewDialogComponent,
    FileUploadOverwriteComponent,
  ]
})
export class DataSpacePageModule {
}
