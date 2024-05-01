import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from "primeng/checkbox";
import { ButtonModule } from "primeng/button";
import { ChipsModule } from "primeng/chips";
import { LoginService } from "../login.service";
import { FormsModule, NgForm } from "@angular/forms";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { Router } from '@angular/router';
import { MessageModule } from 'primeng/message';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CheckboxModule, ButtonModule, ChipsModule,
    FormsModule, HttpClientModule, ToastModule, MessageModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  constructor(private _loginService: LoginService, private _httpCleint: HttpClient,
    private messageService: MessageService, private _router: Router) { }

  ngOnInit(): void { }

  UserName: any;
  PassWd: any;
  IsCallingBkEnd = false;

  HandleLogin() {
    this.IsCallingBkEnd = true;
    let url = '/rest/auth/login';
    let body = {
      "userName": this.UserName,
      "passWD": this.PassWd,
    };
    let requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

    this._httpCleint.post(url, body, { headers: requestHeader }).subscribe((resp: any) => {
      if (resp.errorCode != null) {
        this.messageService.add({ severity: 'error', summary: 'Fail To Login', detail: resp.errorCode });
      } else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Welcome " + resp.fullName.firstName });
        this._loginService.loginMeIn(resp.fullName, resp.token, resp.role);
        const role = resp.role[0].roleName;
        if (role === "Admin") {
          setTimeout(() => {
            this._router.navigate(['/dashboard'])
          }, 1000);
        } else {
          setTimeout(() => {
            this._router.navigate(['/pages'])
          }, 1000);
        }
        // setTimeout(() => {
        //   this._router.navigate(['/pages'])
        // }, 1500);
      }
      this.IsCallingBkEnd = false;
    }, error => {
      this.IsCallingBkEnd = false;
      this.messageService.add({ severity: 'error', summary: 'Fail To Login', detail: "Username or Password is invalid" });
    });
  }

}
