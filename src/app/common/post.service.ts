import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostPayload } from '../pagesPosts/add-post/post-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _httpClient: HttpClient) { }
  url: string = '/rest/posts/'

  public addPost(postPayload: FormData) {
    return this._httpClient.post<PostPayload>(this.url + "add", postPayload)
  }

  userPostsURL: string = '/rest/posts/?userName='
  getPostsByUserName(userName: string): Observable<Array<PostPayload>> {
    return this._httpClient.get<Array<PostPayload>>(this.userPostsURL + userName);
  }

  getPost(permaLink: Number): Observable<PostPayload> {
    return this._httpClient.get<PostPayload>(this.url + permaLink);
  }

  getAllPosts(): Observable<PostPayload[]> {
    return this._httpClient.get<PostPayload[]>(this.url + "all");
  }

  getAllBusiness(): Observable<Array<PostPayload>> {
    return this._httpClient.get<Array<PostPayload>>(this.url + "business");
  }

  getAllEntertain(): Observable<Array<PostPayload>> {
    return this._httpClient.get<Array<PostPayload>>(this.url + "entertain");
  }

  getAllHealth(): Observable<Array<PostPayload>> {
    return this._httpClient.get<Array<PostPayload>>(this.url + "health");
  }
  getAllSports(): Observable<Array<PostPayload>> {
    return this._httpClient.get<Array<PostPayload>>(this.url + "sports");
  }

  getAllScience(): Observable<Array<PostPayload>> {
    return this._httpClient.get<Array<PostPayload>>(this.url + "science");
  }

  getAllTechno(): Observable<Array<PostPayload>> {
    return this._httpClient.get<Array<PostPayload>>(this.url + "techno");
  }

  getAllEconomy(): Observable<Array<PostPayload>> {
    return this._httpClient.get<Array<PostPayload>>(this.url + "economy");
  }
}
