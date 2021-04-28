import { User } from '../../login/login.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getUser(): User {
    return JSON.parse(localStorage.getItem('loggedUser') || '{}');
  }

  setUser(user: User): void {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    console.log(this.getUser());
  }

  signOut(): void {
    localStorage.removeItem('loggedUser');
    console.log(this.getUser());
  }
}
