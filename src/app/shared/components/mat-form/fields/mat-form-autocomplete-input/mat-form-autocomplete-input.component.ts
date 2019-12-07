import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-mat-form-autocomplete-input',
  templateUrl: './mat-form-autocomplete-input.component.html'
})
export class MatFormAutocompleteInputComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() data: string[];

  @Input() label: string;
  @Input() placeholder: string;
  @Input() controlName: string;

  @Input() errors: any;

  private filteredData: string[];

  ngOnInit() {
    this.formGroup.get(this.controlName).valueChanges.subscribe(inputValue => {
      this.filteredData = this.data.filter(option => option.includes(inputValue));
    });
  }
}
