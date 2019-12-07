import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CountryCodesService} from '../../../services/country-codes.service';
import {finalize} from 'rxjs/operators';
import {ValidatorsExistsInCollection} from '../../../shared/validators/exists-in-collection.validator';
import {MatSnackBar} from '@angular/material';
import {FormBaseHelper} from '../../../shared/component-base-helpers/form.base.helper';
import {GeneralBaseHelper} from '../../../shared/component-base-helpers/general.base.helper';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register2',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class Register2Component implements OnInit {
  baseFormHelper = new FormBaseHelper();
  generalHelper: GeneralBaseHelper;

  countryCodes: any[] = [];
  filteredCountryCodes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private countryCodesService: CountryCodesService,
    private authenticationService: AuthenticationService,
    private router: Router,
    snackbar: MatSnackBar
  ) {
    this.generalHelper = new GeneralBaseHelper(snackbar);
  }

  ngOnInit() {
    this.countryCodesService.getCountryCodes()
      .pipe(finalize(() => this.baseFormHelper.formLoading = false))
      .subscribe(codes => {
        this.countryCodes = this.filteredCountryCodes = codes;
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
    this.baseFormHelper.form.controls.callingCode.valueChanges.subscribe(value => this.filterCountryCodes(value));
  }

  onSubmit() {
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
              this.redirectToProfilePage(response.data);
              this.generalHelper.openSnackBar('Successfully logged in.');
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
            this.generalHelper.permaSnackBar(snackMessage, snackBtnLabel);
          }
        );
    }
  }

  private filterCountryCodes(inputValue: string) {
    this.filteredCountryCodes = this.countryCodes.filter(code => code.labelValue.includes(inputValue));
  }

  private redirectToProfilePage(data: any) {
    this.router.navigate(['/profile/' + data.screenName], {state: {data}});
  }
}
