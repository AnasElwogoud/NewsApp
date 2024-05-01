import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormBuilder, FormGroup, NgModelGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { User } from './user';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from '../../register.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { ConfirmedValidator } from '../confirmed.validator';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule,
    ButtonModule, ToastModule,
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService]
})
export class UserComponent implements OnInit {
  user: User = {
    userName: '',
    email: '',
    passWD: '',
    cpassword: '',
    full_name: {
      firstName: '',
      lastName: ''
    }
  };
  form: FormGroup = new FormGroup({});

  constructor(private _registerService: RegisterService, private messageService: MessageService, private router: Router, private fb: FormBuilder) {
    this.form = fb.group({
      userName: ['', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(12)]],
      email: ['', [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      passWD: ['', [Validators.required,
      Validators.minLength(8)]],
      cpassword: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('passWD', "cpassword")
    })
  }

  get f() { return this.form.controls; }

  ngOnInit(): void { }

  userRegister() {
    this._registerService.registerUser(this.user).subscribe(resp => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: "Welcome " + this.user.full_name.firstName });
      setTimeout(() => {
        this.router.navigateByUrl('auth/login');
      }, 1500);
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Fail To Register', detail: error.message })
    }
    )
  }

}
