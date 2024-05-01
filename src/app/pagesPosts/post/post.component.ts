import { Component } from '@angular/core';
import { PostPayload } from '../add-post/post-payload';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/common/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  post!: PostPayload;
  permaLink!: Number;

  constructor(private router: ActivatedRoute, private postService: PostService) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.postService.getPost(this.permaLink).subscribe((data: PostPayload) => {
      this.post = data;
    }, (err: any) => {
      console.log('Failure Response');
    })
  }
}
