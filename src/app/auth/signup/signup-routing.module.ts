import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup.component';
import { UserComponent } from './user/user.component';
import { JournalistComponent } from './journalist/journalist.component';

const routes: Routes = [
  { path: 'user', component:UserComponent},
  { path: 'journalist',component:JournalistComponent},
  { path: '', pathMatch: 'full', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
