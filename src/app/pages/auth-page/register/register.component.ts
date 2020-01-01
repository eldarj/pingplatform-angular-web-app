import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthHubClientService} from '../../../services/api/signalr/auth-hub-client.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {CallingCodeModel} from '../../../shared/models/data/calling-code.model';
import {AccountModel} from '../../../shared/models/data/account.model';
import {ResponseModel} from '../../../shared/models/wrappers/response.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  callingCodes: Array<CallingCodeModel> = [];

  formLoading = true;
  submitLoading = false;

  get f() {
    return this.registerForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthHubClientService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    if (this.authService.callingCodes && this.authService.callingCodes.length > 0) {
      this.callingCodes = this.authService.callingCodes;
      this.formLoading = false;
    }
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      phoneNumber: [this.authService.preloadedPhoneNumber, Validators.required],
      callingCode: [this.authService.preloadedCallingCountryCode, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.authService.callingCode$.subscribe(result => {
      this.callingCodes = result;
      this.formLoading = false;
    });

    this.authService.loggedInUser$.subscribe((result: ResponseModel<AccountModel>) => {
      if (result.messageCode === '200') {
        const username = result.content.firstName + '-' + result.content.lastName;
        this.router.navigate(['/profile', username]);
        this.openSnackBar(result.message);
      } else {
        this.openSnackBar(result.message);
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (!this.registerForm.invalid) {
      this.submitLoading = true;

      this.authService.register(
        this.registerForm.value.phoneNumber,
        this.registerForm.value.callingCode,
        this.registerForm.value.email,
        this.registerForm.value.firstName,
        this.registerForm.value.lastName
      );
    }
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 2000,
    });
  }
}
