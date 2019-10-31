import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule, MatDividerModule,
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
  ]
})
export class MaterialModule {
}
