import { Component, OnInit } from '@angular/core';
import { PostPayload } from '../pagesPosts/add-post/post-payload';
import { PostService } from '../common/post.service';
import { Observable } from 'rxjs';
import { LoginService } from '../auth/login.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  topHeadingDisplay: any | undefined = []

  posts!: Observable<PostPayload[]>;
  constructor(private postService: PostService, public _loginService: LoginService) { }
  ngOnInit() {
    this.posts = this.postService.getAllPosts();
    this.posts.subscribe((result: any) => {
      this.topHeadingDisplay = result;
    })
  }


}
