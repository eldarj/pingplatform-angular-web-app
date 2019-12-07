import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CountryCodesService} from '../../../services/country-codes.service';
import {finalize} from 'rxjs/operators';
import {ValidatorsExistsInCollection} from '../../../shared/validators/exists-in-collection.validator';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';
import {SnackbarService} from '../../../services/snackbar.service';
import {FormBaseHelper} from '../../../shared/components/helper/form.base.helper';

@Component({
  selector: 'app-register2',
  templateUrl: './register.component.html'
})
export class Register2Component implements OnInit {
  baseFormHelper = new FormBaseHelper();
  countryCodes: any[] = [];
  autocompleteCountryCodes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private countryCodesService: CountryCodesService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
  }

  ngOnInit() {
    this.countryCodesService.getCountryCodes()
      .pipe(finalize(() => this.baseFormHelper.formLoading = false))
      .subscribe(codes => {
        this.countryCodes = codes.map(code => code.labelValue);
        this.autocompleteCountryCodes = codes.map(code => code.labelValue);
      });

    this.baseFormHelper.form = this.fb.group({
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern('^[0-9\ ]{6,12}$')
      ]],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      callingCode: ['', [
        Validators.required,
        control => ValidatorsExistsInCollection(control, this.countryCodes)
      ]]
    });

  }

  doAction() {

  }

  doSubmit() {
    console.log(this.baseFormHelper.form.value);
  }
}
