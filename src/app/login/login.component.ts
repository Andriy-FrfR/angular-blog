import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../shared/local-storage.service';
import { LoginService } from '../shared/login.service';

export interface User {
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signUp = false; // Changes logIn and signUp forms

  // Forms

  logInForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(6),
      Validators.maxLength(30)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)
    ])
  });

  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(6),
      Validators.maxLength(30)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(14)
    ])
  });

  constructor(private loginService: LoginService, private localStorageServ: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.localStorageServ.getUser()) {
      this.router.navigate(['main/posts']);
    }
  }

  onLogIn(): void {
    if (this.logInForm.valid) {
      this.loginService.logIn({
        email: this.logInForm.controls.email.value,
        password: this.logInForm.controls.password.value
      });
    }
  }

  onSignUp(): void {
    if (this.signUpForm.valid) {
      this.loginService.signUp({
        name: this.signUpForm.controls.name.value,
        email: this.signUpForm.controls.email.value,
        password: this.signUpForm.controls.password.value,
        admin: false
      });
    }
  }

  switchSignUp(): void {
    this.signUp = !this.signUp;
  }

}
