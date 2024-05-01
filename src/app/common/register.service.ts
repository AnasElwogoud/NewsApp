import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../auth/signup/user/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registerURL = "/rest/auth/signup"

  constructor(private _http: HttpClient) { }

  registerUser(user: User): Observable<Object> {
    return this._http.post(this.registerURL, user);
  }
}
