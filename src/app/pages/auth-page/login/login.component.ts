import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {CallingCode} from '../../../shared/models/calling-code.model';
import {Router} from '@angular/router';
import {AccountModel} from '../../../shared/models/account-model';
import {ResponseModel} from '../../../shared/models/response.model';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  callingCodes: Array<CallingCode> = [];

  formLoading = true;
  submitLoading = false;

  get f() {
    return this.loginForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.authService.callingCode$.subscribe(result => {
      this.callingCodes = result;
      this.formLoading = false;
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      callingCode: ['', Validators.required]
    });


    if (this.authService.callingCodes && this.authService.callingCodes.length > 0) {
      this.callingCodes = this.authService.callingCodes;
      this.formLoading = false;
    }

    this.authService.loggedInUser$.subscribe((result: ResponseModel<AccountModel>) => {
      if (result.messageCode !== '401') {
        const username = result.content.firstname + '-' + result.content.lastname;
        this.router.navigate(['/profile', username]);
        this.openSnackBar(result.message);
      } else {
        this.openSnackBar(result.message);

        this.authService.hasPreloadedData = true;
        this.authService.preloadedCallingCountryCode = result.content.callingCountryCode;
        this.authService.preloadedPhoneNumber = result.content.phoneNumber;

        this.router.navigate(['/get-started', 'join']);
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (!this.loginForm.invalid) {
      this.submitLoading = true;

      this.authService.login(this.loginForm.value.phoneNumber, this.loginForm.value.callingCode);
    }
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000,
    });
  }
}
