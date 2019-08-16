import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthGuardService } from './auth-guard.service';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'register',
    component:RegisterComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'profile',
    component:ProfileComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
