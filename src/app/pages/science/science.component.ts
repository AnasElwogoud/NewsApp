import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from 'src/app/common/post.service';
import { PostPayload } from 'src/app/pagesPosts/add-post/post-payload';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-science',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.scss']
})
export class ScienceComponent implements OnInit {

  posts!: Observable<Array<PostPayload>>;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts = this.postService.getAllScience();
  }
}
