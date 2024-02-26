import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { CheckCodeComponent } from './components/check-code/check-code.component';
import { HomeComponent } from './components/home/home.component';
import { TaskModule } from '../task/task.module';


@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    CheckCodeComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    TaskModule
  ]
})
export class UserModule { }
