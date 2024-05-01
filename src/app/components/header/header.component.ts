import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { LoginService } from '../../auth/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public _loginService: LoginService) {
  }

  items: MenuItem[] = [
    { label: 'Business', routerLink: '/pages/business', routerLinkActiveOptions: 'true', },
    { label: 'Entertainment', routerLink: '/pages/entertain' },
    { label: 'Health', routerLink: '/pages/health' },
    { label: 'Science', routerLink: '/pages/science' },
    { label: 'Sports', routerLink: '/pages/sports' },
    { label: 'Technology', routerLink: '/pages/tech' },
    { label: 'Economy', routerLink: '/pages/economy' },
  ];

  // settingItems: MenuItem[] = [
  //   { label: 'Settings', routerLink: '/user/{id}', routerLinkActiveOptions: 'true' },
  //   {
  //     label: 'Logout', routerLink: '/#', command(event) {
  //       ' (click)="handleLogOut($event)"'
  //     },
  //   },
  // ]

  handleLogOut($event: MouseEvent) {
    $event.preventDefault();
    this._loginService.LogMeOut();
  }

  public isLoggedIn() {
    return this._loginService.isLoggedIn();
  }

}
