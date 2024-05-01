import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { AddPostComponent } from './pagesPosts/add-post/add-post.component';
import { PostComponent } from './pagesPosts/post/post.component';
import { UserPostsComponent } from './pagesPosts/user-posts/user-posts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [
  { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'auth/login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'auth/signup', loadChildren: () => import('./auth/signup/signup.module').then(m => m.SignupModule) },
  { path: '', pathMatch: "full", redirectTo: "pages" },
  { path: 'addPost', component: AddPostComponent, canActivate: [AuthGuard], data: { role: ['Jour'] } },
  { path: 'post/:id', component: PostComponent },
  // { path:'editPost/:id', component:EditPostComponent,canActivate:[AuthGuard]},
  { path: 'user/:userName', component: UserPostsComponent },

  {
    path: "dashboard", loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
    , canActivate: [AuthGuard], data: { role: ['Admin'] }
  },
  { path: "forbidden", component: ForbiddenComponent },

  { path: 'error', loadComponent: () => import("./pages/error/error.component").then(m => m.ErrorComponent) },
  { path: '**', redirectTo: "error" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
