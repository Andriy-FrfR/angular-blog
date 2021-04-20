import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, take } from 'rxjs/operators';

import { User } from './../login/login.component';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedUser: User = {
    name: '',
    email: '',
    password: '',
    admin: false
  };

  constructor(private http: HttpClient, private router: Router) { }

  logIn(user: any): void {
    this.http.get<User[]>(`${environment.baseUrl}/users?email=${user.email}&password=${user.password}`)
      .pipe(take(1))
      .subscribe((receivedUser: User[]): void => {
        if (receivedUser.length === 0) {
          console.log('Wrong email or password');
        } else {
          this.loggedUser = receivedUser[0];
          this.router.navigate(['/main']);
          console.log(this.loggedUser);
        }
      });
  }

  signUp(user: any): void {
    this.http.get<User[]>(`${environment.baseUrl}/users?email=${user.email}`)
      .pipe(
        take(1),
        switchMap ((receivedUser: User[]): Observable<User>  => {
          if (receivedUser.length !== 0) {
            console.log('There is user with that email!');
            return throwError({});
          } else {
            return this.http.post<User>(`${environment.baseUrl}/users/`, user)
              .pipe(take(1));
          }
        })
      ).subscribe((newUser: User) => {
        console.log(newUser);
        this.loggedUser = newUser;
        this.router.navigate(['/main']);
      }, () => {
        console.log('Error!');
      });
  }
}
