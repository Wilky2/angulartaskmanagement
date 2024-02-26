import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-check-code',
  templateUrl: './check-code.component.html',
  styleUrls: ['./check-code.component.scss']
})
export class CheckCodeComponent implements OnInit, OnDestroy {

  formGroup! : FormGroup;
  checkCodeForm! : FormControl;
  checkCodeFormValueChangeSub! : Subscription;
  hasError$! : Observable<boolean>;
  message$! : Observable<string>;
  loading$! : Observable<boolean>;
  private username! : string;
  private password! : string;

  constructor(private formBuilder : FormBuilder,
    private authService : AuthenticationService,
    private router : Router){}

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username") ?? "";
    this.password = sessionStorage.getItem("password") ?? "";
    this.initAuthApiObservable();
    this.initGlobalForm(); 
  }

  ngOnDestroy(): void {
    this.checkCodeFormValueChangeSub?.unsubscribe();
  }

  private initAuthApiObservable(){
    this.hasError$ = this.authService.loginHasError$;
    this.loading$ = this.authService.loginLoading$;
    this.message$ = this.authService.loginMessage$;
  }

  private initGlobalForm(){
    this.initCheckCodeForm();
    this.formGroup = this.formBuilder.group({
      'checkcode' : this.checkCodeForm
    })
  }

  private initCheckCodeForm(){
    this.checkCodeForm = new FormControl("");
    this.checkCodeForm.addValidators([Validators.required]);
    this.checkCodeFormValueChangeSub = this.checkCodeForm.valueChanges.pipe(
      tap(value=>{
        let formatValue = this.removeAllNonNumberChar(value);
        if(formatValue!=value){
          this.checkCodeForm.setValue(formatValue);
        }
      })
    ).subscribe();
  }

  private removeAllNonNumberChar(value : string) : string{
    value = value? value as string : "";
    value = value.replaceAll(/\D/g,"");
    return value
  }

  onSubmit(){
    if(this.formGroup.valid){
      const checkcode = this.formGroup.value.checkcode;
      let login = this.authService.login(this.username, this.password, checkcode).subscribe((isConnected)=>{
        if(isConnected){
          if(this.authService.connectedUser){
            this.router.navigateByUrl("/user/home")
          }
        }
        login?.unsubscribe();
      });
    }
  }

  onResend(){
    let login = this.authService.login(this.username, this.password).subscribe((isConnected)=>{
      console.log(isConnected);
      login?.unsubscribe();
    });
  }

}
