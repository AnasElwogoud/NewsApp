import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PostPayload } from '../../pagesPosts/add-post/post-payload';
import { PostService } from 'src/app/common/post.service';

@Component({
  selector: 'app-tech',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.scss']
})
export class TechComponent implements OnInit {

  posts!: Observable<Array<PostPayload>>;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts = this.postService.getAllTechno();
  }
}
