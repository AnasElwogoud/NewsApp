import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Journalist } from '../auth/signup/journalist/journalist';

@Injectable({
  providedIn: 'root'
})
export class JournalistService {
  url: string = '/rest/auth/journalists'
  public registerJournalist(journalist: FormData) {
    return this._httpClient.post<Journalist>(this.url + "/signup", journalist)
  }
  constructor(private _httpClient: HttpClient) { }
}
