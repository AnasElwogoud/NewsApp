import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PostPayload } from './post-payload';
import { PostService } from 'src/app/common/post.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, ToastModule, FormsModule, ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  providers: [MessageService]
})
export class AddPostComponent implements OnInit {

  fullName: any = {}
  postPayload: PostPayload = {
    id: '',
    title: '',
    content: '',
    category: '',
    createdOn: '',
    filePath: '',
    userName: ''
  }

  selectedFile!: File;
  createdOn = new Date();
  userName = localStorage.getItem("userName");
  constructor(private postService: PostService, private router: Router
    , private messageService: MessageService) { }
  ngOnInit() { }

  addPost() {
    const postFormData = this.prepareFormData(this.postPayload)
    this.postService.addPost(postFormData).subscribe((data: PostPayload) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Post is Added Successfully " });
      setTimeout(() => {
        this.router.navigateByUrl('/');
      }, 2000);
      this.router.navigateByUrl('/');
    }, (error: any) => {
    })
  }

  prepareFormData(postPayload: PostPayload): FormData {
    let formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    formData.append('title', postPayload.title);
    formData.append('content', postPayload.content);
    formData.append('category', postPayload.category);
    formData.append('createdOn', postPayload.createdOn);
    formData.append('userName', postPayload.userName)
    return formData
  }
  
  public onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(event.target.files[0].name)
  }
}
