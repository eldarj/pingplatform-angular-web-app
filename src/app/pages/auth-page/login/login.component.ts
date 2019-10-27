import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      phoneNumber: ['']
    });
  }

  onSubmit() {
    alert('submit');
  }
}
