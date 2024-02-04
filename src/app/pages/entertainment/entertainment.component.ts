import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PostPayload } from 'src/app/pagesPosts/add-post/post-payload';
import { PostService } from 'src/app/common/post.service';

@Component({
  selector: 'app-entertainment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entertainment.component.html',
  styleUrls: ['./entertainment.component.scss']
})
export class EntertainmentComponent implements OnInit {

  posts!: Observable<Array<PostPayload>>;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts = this.postService.getAllEntertain();
  }
}
