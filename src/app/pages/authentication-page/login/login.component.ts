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
  selector: 'app-login2',
  templateUrl: './login.component.html'
})
export class Login2Component implements OnInit {
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
        this.countryCodes = codes;
        this.autocompleteCountryCodes = codes.map(code => code.labelValue);
      });

    this.baseFormHelper.form = this.fb.group({
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern('^[0-9\ ]{6,12}$')
      ]],
      callingCode: ['', [
        Validators.required,
        control => ValidatorsExistsInCollection(control, this.countryCodes.map(code => code.labelValue))
      ]]
    });
  }

  doSubmit() {
    this.baseFormHelper.form.markAllAsTouched();
    if (!this.baseFormHelper.form.invalid) {
      this.baseFormHelper.submitLoading = true;

      const dialCode = this.countryCodes.find(code => code.labelValue === this.baseFormHelper.form.value.callingCode).dialCode;
      const phoneNumber = this.baseFormHelper.form.value.phoneNumber.replace(/ /g, '');
      this.authenticationService.authenticate(dialCode + phoneNumber, 'password')
        .subscribe(
          response => {
            this.baseFormHelper.submitLoading = false;
            if (response.status === 200) {
              console.log(response);
              this.snackbarService.openSnackBar('Successfully logged in.');
              this.router.navigate(['/profile/' + response.data.screenName], {state: {data: response.data}});
            }
          },
          error => {
            this.baseFormHelper.submitLoading = false;
            let snackMessage = '';
            let snackBtnLabel = '';
            if (error.status === 403) {
              snackMessage = 'Do you have an account? Join now';
              snackBtnLabel = 'Signup';
            } else {
              snackMessage = 'Something went wron, please try again.';
              console.error(snackMessage, error);
            }
            this.snackbarService.permaSnackBar(snackMessage, snackBtnLabel);
          }
        );
    }
  }

  doAction() {
    this.router.navigate(['/get-started/join']);
  }
}
