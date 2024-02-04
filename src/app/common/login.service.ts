import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  IsLogin = false;
  FullName: any = {};
  token: any = '';
  userName: any = ''
  constructor(public _router: Router) {
    if (localStorage.getItem('isLogin') == 'true') {
      this.IsLogin = true;
      this.FullName = localStorage.getItem('fullName')
    }
  }


  loginMeIn(FullName: string, token: string, userName: string) {
    this.IsLogin = true;
    this.FullName = FullName;
    this.token = token;
    this.userName = userName
    localStorage.setItem('fullName', FullName);
    localStorage.setItem('isLogin', 'true');
    localStorage.setItem('token', token)
    localStorage.setItem('userName', userName)
  }

  LogMeOut() {
    this.IsLogin = false;
    this.FullName = '';
    this.token = '';
    localStorage.clear();
    this._router.navigate(['/auth/login'])
  }

  isAuthenticated(): Boolean {
    return localStorage.getItem("token") != null;
  }
}
