import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MAT_DIALOG_DEFAULT_OPTIONS, MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule, MatChipsModule, MatDialogConfig, MatDialogModule, MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule, MatSort, MatSortModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDividerModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatChipsModule,
    MatDialogModule,
    MatAutocompleteModule,
  ],
  exports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDividerModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatChipsModule,
    MatDialogModule,
    MatAutocompleteModule,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        ...new MatDialogConfig(),
        hasBackdrop: true,
        minWidth: 400,
        maxWidth: 400
      } as MatDialogConfig,
    }
  ]
})
export class MaterialModule {
}
