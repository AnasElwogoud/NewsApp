import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = '/rest/auth/login';

  requestHeader = new HttpHeaders(
    { "No-Auth": "True" })

  public login(loginData: any) {
    return this._httpClient.post(this.url, loginData, { headers: this.requestHeader })
  }

  IsLogin = false;
  FullName: any = {};
  token: any = '';
  role: any = [];
  constructor(public _router: Router, private _httpClient: HttpClient) {
    if (localStorage.getItem('isLogin') == 'true') {
      this.IsLogin = true;
      this.FullName = localStorage.getItem('fullName')
    }
  }

  loginMeIn(FullName: string, token: string, role: string) {
    this.IsLogin = true;
    this.FullName = FullName;
    this.token = token;
    this.role = role;
    localStorage.setItem('fullName', JSON.stringify(FullName));
    localStorage.setItem('isLogin', 'true');
    localStorage.setItem('token', token)
    localStorage.setItem('role', JSON.stringify(role))
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('role') || '{}')
  }

  public getToken(): string {
    return localStorage.getItem("token") || ''
  }

  isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  LogMeOut() {
    localStorage.clear();
    this._router.navigate(['/auth/login'])
  }

  public roleMatch(allowedRoles: any[]): boolean | undefined {
    let isMatch = false;
    const userRoles: any = this.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}
