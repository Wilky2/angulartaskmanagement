import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { UserApiService } from 'src/app/services/user/user-api.service';
import { confirmEqualValidator, emailValidator, getErrorMessage } from 'src/app/validators/validator.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formGroup! : FormGroup;
  password! : FormControl;
  confirmedPassword! : FormControl;
  passwordGroup! : FormGroup
  confirmPasswordEqualError$! : Observable<string>;
  emailForm! : FormControl;
  emailValidatorError$! : Observable<string>;
  hasError$! : Observable<boolean>;
  message$! : Observable<string>;
  loading$! : Observable<boolean>;

  constructor(private formBuilder : FormBuilder,
    private userApiService : UserApiService,
    private router : Router){

  }

  ngOnInit(): void {
    this.initGlobalFormGroup();
    this.initUserApiObservable();
  }

  private initUserApiObservable(){
    this.hasError$ = this.userApiService.registerHasError$;
    this.loading$ = this.userApiService.registerLoading$;
    this.message$ = this.userApiService.registerMessage$;
  }

  private initGlobalFormGroup (){
    this.initEmailForm();
    this.initPasswordFormGroup();
    this.formGroup = this.formBuilder.group({
      username : ['', Validators.required],
      lastname : ['', Validators.required],
      firstname : ['', Validators.required],
      email : this.emailForm,
      password : this.passwordGroup,
    });
  }

  private initEmailForm(){
    this.emailForm = new FormControl('', {validators : [Validators.required, emailValidator()]});
    this.emailValidatorError$ = this.emailForm.statusChanges.pipe(
      map(()=>{
        return getErrorMessage(this.emailForm, "mailValidator");
      })
    )
  }

  private initPasswordFormGroup(){
    this.initPasswordForms();
    this.passwordGroup = this.formBuilder.group({
      password : this.password,
      confirmedPassword : this.confirmedPassword
    },{
      validators : [confirmEqualValidator("password", "confirmedPassword")],
      updateOn : 'submit'
    })
    this.initConfirmPasswordError();
  }

  private initPasswordForms(){
    this.password = new FormControl('', Validators.required);
    this.confirmedPassword = new FormControl('', Validators.required);
  }

  private initConfirmPasswordError(){
    this.confirmPasswordEqualError$ = this.passwordGroup.statusChanges.pipe(
      map(()=>{
        return getErrorMessage(this.passwordGroup, "confirmEqualValidator", 
        "Les deux mots de passe doivent être égales");
      })
    );
  }

  onSubmit(){
    if(this.formGroup.valid){
      let {password, ...userGroup} = this.formGroup.value;
      let user : User = userGroup;
      let registerSub = this.userApiService.register(user, password.password).subscribe((isRegister)=>{
        if(isRegister){
          sessionStorage.setItem("username", user.username);
          sessionStorage.setItem("password", password.password);
          this.router.navigateByUrl("/user/check-code");
        }
        registerSub?.unsubscribe();
      });
    }
  }
}
