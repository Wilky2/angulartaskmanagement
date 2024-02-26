import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = environment.api_base_url;

  private _loginLoading$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get loginLoading$() : Observable<boolean>{
    return this._loginLoading$.asObservable();
  }

  private _loginHasError$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get loginHasError$() : Observable<boolean>{
    return this._loginHasError$.asObservable();
  }

  private _loginMessage$ : BehaviorSubject<string> = new BehaviorSubject<string>("");
  get loginMessage$() : Observable<string> {
    return this._loginMessage$.asObservable();
  }

  private _connectedUser : User | undefined;
  get connectedUser() : User | undefined{
    return this._connectedUser
  }

  constructor(private http : HttpClient, private router : Router) {
    const data = sessionStorage.getItem("user");
    if(data){
      this._connectedUser = JSON.parse(data);
    }
   }

  login(username : string, password : string, checkcode? : string | undefined){
    this._loginMessage$.next("");
    this._loginHasError$.next(false);
    this._loginLoading$.next(true);
    const body = checkcode ? {
      "username" : username,
      "password" : password,
      "checkcode" : checkcode
    } : {
      "username" : username,
      "password" : password,
    }
    return this.http.post<any>(`${this.baseUrl}/login`, body, {observe: 'response' }).pipe(
      map((response) => {    
        if(response.status === 200){
          const data = response.body
          if(data.message){
            this._loginMessage$.next(data.message);
          }
          else{
            sessionStorage.setItem("user", JSON.stringify(data));
            this._connectedUser = data; 
            this._loginMessage$.next("");
          }
          this._loginLoading$.next(false);
          this._loginHasError$.next(false);
          return true;
        }
        else{
          this._loginLoading$.next(false);
          this._loginHasError$.next(true);
          this._loginMessage$.next("Nom d'utilisateur ou mot de passe incorrect");
          return false
        }
      }),
      catchError((error : HttpErrorResponse)=>{
        this._loginLoading$.next(false);
        this._loginHasError$.next(true);
        this._loginMessage$.next(error.error as string ?? "Nom d'utilisateur ou mot de passe incorrect");
        return "";
      }),
    );
  }

  logout(){
    sessionStorage.removeItem("user");
    this._connectedUser = undefined;
    let logoutSub = this.http.post<any>(`${this.baseUrl}/logout-user`, this.connectedUser).subscribe(()=>{
      logoutSub?.unsubscribe();
    })
    this.router.navigateByUrl("/user/login");
  }

}
