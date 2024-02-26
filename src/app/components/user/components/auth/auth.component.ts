import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
  formGroup! : FormGroup;
  password! : FormControl;
  hasError$! : Observable<boolean>;
  message$! : Observable<string>;
  loading$! : Observable<boolean>;

  constructor(private formBuilder : FormBuilder,
    private authService : AuthenticationService,
    private router : Router){

  }

  ngOnInit(): void {
    this.initAuthApiObservable();
    this.initGlobalFormGroup();
  }

  private initAuthApiObservable(){
    this.hasError$ = this.authService.loginHasError$;
    this.loading$ = this.authService.loginLoading$;
    this.message$ = this.authService.loginMessage$;
  }

  private initGlobalFormGroup(){
    this.password = new FormControl('', Validators.required);
    this.formGroup = this.formBuilder.group({
      username : ['', Validators.required],
      password : this.password,
    });
  } 

  onSubmit(){
    if(this.formGroup.valid){
      const username = this.formGroup.value.username;
      const password = this.formGroup.value.password;
      let login = this.authService.login(username, password).subscribe((isConnected)=>{
        if(isConnected){
          this.router.navigateByUrl("/user/check-code")
        }
        login?.unsubscribe();
      });
    }
  }

}
