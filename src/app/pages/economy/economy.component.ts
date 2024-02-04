import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostPayload } from 'src/app/pagesPosts/add-post/post-payload';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/common/post.service';

@Component({
  selector: 'app-economy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './economy.component.html',
  styleUrls: ['./economy.component.scss']
})
export class EconomyComponent implements OnInit {

  posts!: Observable<Array<PostPayload>>;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts = this.postService.getAllEconomy();
  }

}
