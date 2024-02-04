import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { PostPayload } from '../../pagesPosts/add-post/post-payload';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/common/post.service';

@Component({
  selector: 'app-business',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  posts!: Observable<Array<PostPayload>>;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts = this.postService.getAllBusiness();

  }
}
