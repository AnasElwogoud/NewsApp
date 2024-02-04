import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../confirmed.validator';
import { Journalist } from './journalist';
import { JournalistService } from 'src/app/common/journalist.service';

@Component({
  selector: 'app-journalist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule,
    ButtonModule, ToastModule,],
  templateUrl: './journalist.component.html',
  styleUrls: ['./journalist.component.scss'],
  providers: [MessageService]
})
export class JournalistComponent implements OnInit {
  IsCallingBkEnd = false;
  journalist: Journalist = {
    userName: '',
    email: '',
    passWD: '',
    cpassword: '',
    firstName: '',
    lastName: '',
    profilePic: ''
  };
  form: FormGroup = new FormGroup({});
  ngOnInit(): void { }
  constructor(private _journalistService: JournalistService, private messageService: MessageService, private router: Router, private fb: FormBuilder) {
    this.form = fb.group({
      userName: ['', [Validators.required,
      Validators.minLength(5)]],
      email: ['', [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      passWD: ['', [Validators.required,
      Validators.minLength(8)]],
      cpassword: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      profilePic: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('passWD', "cpassword")
    })
  }


  selectedFile!: File;
  public onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(event.target.files[0].name)
  }
  get f() {
    return this.form.controls;
  }

  prepareFormData(journalist: Journalist): FormData {
    let formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    formData.append('userName', journalist.userName);
    formData.append('email', journalist.email);
    formData.append('passWD', journalist.passWD);
    formData.append('firstName', journalist.firstName);
    formData.append('lastName', journalist.lastName)
    return formData
  }
  journalistRegister() {
    const postFormData = this.prepareFormData(this.journalist)
    this._journalistService.registerJournalist(postFormData).subscribe((data: Journalist) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Journalist has been created Successfully But it's pending until Admin aprove it." });
      setTimeout(() => {
        this.router.navigateByUrl('/');
      }, 2000);
      console.log(data)
    }, (error: any) => {
      console.log(error)
    })
  }
}
