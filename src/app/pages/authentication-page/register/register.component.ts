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
        this.countryCodes = codes;
        this.autocompleteCountryCodes = codes.map(code => code.labelValue);
      });

    this.baseFormHelper.form = this.fb.group({
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern('^[0-9\ ]{6,12}$')
      ]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]{3,25}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9#!%&=]{6,50}$')
      ]],
      callingCode: ['', [
        Validators.required,
        control => ValidatorsExistsInCollection(control, this.autocompleteCountryCodes)
      ]]
    });

  }

  doAction() {
    this.router.navigate(['/get-started/join']);
  }

  doSubmit() {
    this.baseFormHelper.form.markAllAsTouched();
    if (!this.baseFormHelper.form.invalid) {
      this.baseFormHelper.submitLoading = true;

      const newUser = this.baseFormHelper.form.value;
      newUser.countryCode = {dialCode: this.countryCodes.find(code => code.labelValue === newUser.callingCode).dialCode};
      newUser.phoneNumber = newUser.phoneNumber.replace(/ /g, '');

      this.authenticationService.register(newUser).subscribe(
        (response: any) => {
          this.baseFormHelper.submitLoading = false;
          if (response != null) {
            this.snackbarService.openSnackBar('Successfully registered.');
            this.router.navigate(['/profile/' + response.username], {state: {data: response}});
          }
        },
        error => {
          console.error(error);
          this.baseFormHelper.submitLoading = false;
          this.snackbarService.permaSnackBar('Something went wrong, please try again.', 'Signup');
        }
      );
    }
  }
}
