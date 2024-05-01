import { Component, OnInit } from '@angular/core';
import { PostPayload } from '../add-post/post-payload';

import { PostService } from 'src/app/common/post.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {
  constructor(private router: ActivatedRoute, private postService: PostService) { }
  posts!: Observable<PostPayload[]>;
  userName!: string;
  ngOnInit() {
    this.router.params.subscribe(params => {
      this.userName = params['userName'];
    });
    this.posts = this.postService.getAllPosts();
    this.posts.subscribe((result: any) => {
      console.log(result)
    })
  }

};



