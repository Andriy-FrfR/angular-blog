import { LocalStorageService } from '../services/local-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private localStorageServ: LocalStorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.localStorageServ.getUser()) {
      if (this.localStorageServ.getUser().admin === true) {
        return true;
      } else {
        this.router.navigate(['main']);
        return false;
      }
    } else {
      return false;
    }
  }
}
