import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material/material.module';
import { PasswordComponent } from './components/password/password.component';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';



@NgModule({
  declarations: [
    HeaderComponent,
    PasswordComponent,
    AutoCompleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports : [
    ReactiveFormsModule,
    HeaderComponent,
    MaterialModule,
    PasswordComponent,
    AutoCompleteComponent
  ]
})
export class SharedModule { }
