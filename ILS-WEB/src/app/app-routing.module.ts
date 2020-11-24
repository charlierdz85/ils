import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from './Layout/pages-layout/pages-layout.component';

import { HomeComponent } from './Home/home.component';
import { AboutComponent } from './Home/about.component';
import { LoginComponent } from './Home/login.component';
import { RouteNotFoundComponent } from './Home/routeNotFound.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {path: '', component: HomeComponent, data: {extraParameter: ''}},
      {path: 'home', component: HomeComponent, data: {extraParameter: ''}},
      {path: 'about', component: AboutComponent, data: {extraParameter: ''}},
      {path: '404', component: RouteNotFoundComponent, data: {extraParameter: ''}},
    ]

  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      // Autorization pages
      {path: 'login', component: LoginComponent, data: {extraParameter: ''}},

    ]
  },
  {path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
