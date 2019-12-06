import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CountryCodesService} from '../../../services/country-codes.service';
import {finalize} from 'rxjs/operators';
import {ValidatorsExistsInCollection} from '../../../shared/validators/exists-in-collection.validator';
import {MatSnackBar} from '@angular/material';
import {FormBaseHelper} from '../../../shared/component-base-helpers/form.base.helper';
import {GeneralBaseHelper} from '../../../shared/component-base-helpers/general.base.helper';

@Component({
  selector: 'app-login2',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class Login2Component implements OnInit {
  baseFormHelper = new FormBaseHelper();
  generalHelper: GeneralBaseHelper;

  loginForm: FormGroup;

  countryCodes: any[] = [];
  filteredCountryCodes: any[] = [];

  formLoading = true;
  submitLoading = false;

  get f() {
    return this.loginForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private authenticationService: CountryCodesService,
    snackbar: MatSnackBar
  ) {
    this.generalHelper = new GeneralBaseHelper(snackbar);
  }

  ngOnInit() {
    this.authenticationService.getCountryCodes()
      .pipe(finalize(() => this.formLoading = false))
      .subscribe(codes => {
        this.countryCodes = this.filteredCountryCodes = codes;
      });

    this.loginForm = this.fb.group({
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern('^[0-9\ ]{6,12}$')
      ]],
      callingCode: ['', [
        Validators.required,
        control => ValidatorsExistsInCollection(control, this.countryCodes.map(code => code.labelValue))
      ]]
    });
    this.loginForm.controls.callingCode.valueChanges.subscribe(value => this.filterCountryCodes(value));
  }

  onSubmit() {
    this.generalHelper.openSnackBar('Submit', 'hel');
    this.loginForm.markAllAsTouched();
    if (!this.loginForm.invalid) {
      this.submitLoading = true;
    }
  }

  private filterCountryCodes(inputValue: string) {
    this.filteredCountryCodes = this.countryCodes.filter(code => code.labelValue.includes(inputValue));
  }
}
