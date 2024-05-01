import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostPayload } from 'src/app/pagesPosts/add-post/post-payload';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/common/post.service';

@Component({
  selector: 'app-health',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {

  posts!: Observable<Array<PostPayload>>;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts = this.postService.getAllHealth();
  }
}
