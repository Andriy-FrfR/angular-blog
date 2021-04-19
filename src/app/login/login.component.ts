import { Component, OnInit } from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
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
  user: User = {
    name: '',
    email: '',
    password: '',
    admin: false
  };

  signUp = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onLogIn(form: NgForm): void {
    if (form.valid) {
      this.loginService.logIn(this.user);
    }
  }

  onSignUp(form: NgForm): void {
    if (form.valid) {
      this.loginService.signUp(this.user);
    }
  }

  switchSignUp(): void {
    this.signUp = !this.signUp;
  }

}
