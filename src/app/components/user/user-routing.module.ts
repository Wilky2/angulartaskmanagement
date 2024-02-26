import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/register/register.component';
import { CheckCodeComponent } from './components/check-code/check-code.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path : 'login',
    component : AuthComponent,
    pathMatch : 'full'
  },
  {
    path : 'register',
    component : RegisterComponent,
    pathMatch : 'full'
  },
  {
    path : 'check-code',
    component : CheckCodeComponent,
    pathMatch : 'full'
  },
  {
    path : 'home',
    component : HomeComponent,
    pathMatch : 'full'
  },
  {
    path : '',
    redirectTo : 'login',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
