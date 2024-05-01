import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _loginService: LoginService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this._loginService.getToken() !== null) {
      const role = route.data["role"] as Array<string>
      if (role) {
        const match = this._loginService.roleMatch(role);
        if (match) {
          return true;
        } else {
          this.router.navigate(['/forbidden'])
          return false;
        }
      }
    }
    this.router.navigate(['/auth/login'])
    return false;
  }
}
