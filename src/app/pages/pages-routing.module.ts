import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  { path: 'business', loadComponent: () => import('./business/business.component').then(m => m.BusinessComponent) },
  { path: 'entertain', loadComponent: () => import('./entertainment/entertainment.component').then(m => m.EntertainmentComponent) },
  { path: 'health', loadComponent: () => import('./health/health.component').then(m => m.HealthComponent) },
  { path: 'science', loadComponent: () => import('./science/science.component').then(m => m.ScienceComponent) },
  { path: 'sports', loadComponent: () => import('./sports/sports.component').then(m => m.SportsComponent) },
  { path: 'tech', loadComponent: () => import('./tech/tech.component').then(m => m.TechComponent) },
  { path: 'economy', loadComponent: () => import('./economy/economy.component').then(m => m.EconomyComponent) },
  { path: '', pathMatch: 'full', component:PagesComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
