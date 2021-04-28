import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, take } from 'rxjs/operators';

import { User } from '../../login/login.component';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router, private localStorageServ: LocalStorageService) { }

  logIn(user: any): void {
    this.http.get<User[]>(`${environment.baseUrl}/users?email=${user.email}&password=${user.password}`)
      .pipe(take(1))
      .subscribe((receivedUser: User[]): void => {
        if (receivedUser.length === 0) {
          console.log('Wrong email or password');
        } else {
          this.localStorageServ.setUser(receivedUser[0]);
          this.router.navigate(['/main/posts']);
          console.log(this.localStorageServ.getUser());
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
        this.localStorageServ.setUser(newUser);
        this.router.navigate(['/main/posts']);
      }, () => {
        console.log('Error!');
      });
  }
}
