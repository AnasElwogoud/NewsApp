import { Component, OnInit } from '@angular/core';

import { PostService } from '../common/post.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { PostPayload } from '../pagesPosts/add-post/post-payload';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [TableModule, ButtonModule, CommonModule, DialogModule, FormsModule, ReactiveFormsModule,
    ToastModule],
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {

  posts: any[] = [{}]
  isLoading = true;
  showAddDialog: any = false
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


  constructor(private postService: PostService, private messageService: MessageService) { }

  ngOnInit() {
    this.postService.getAllPosts().subscribe(resp => {
      this.posts = resp
      this.isLoading = false
    }, err => {
      console.log(err.message)
    })
  }

  AddButton() {
    this.showAddDialog = true;
  }


  addPost() {
    const postFormData = this.prepareFormData(this.postPayload)
    this.postService.addPost(postFormData).subscribe((resp: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Post is Added Successfully " });
      location.reload();
      this.posts = resp;
      this.showAddDialog = false;
    }, (err: any) => {
      console.log(err.message)
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
  // EditButton(post: any) {
  //   this.postPayload = { ...post };
  //   this.showAddDialog = true
  // }
}
