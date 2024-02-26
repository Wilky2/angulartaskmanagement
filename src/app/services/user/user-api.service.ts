import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private baseUrl = environment.api_base_url;

  private _registerLoading$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get registerLoading$() : Observable<boolean>{
    return this._registerLoading$.asObservable();
  }

  private _registerHasError$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get registerHasError$() : Observable<boolean>{
    return this._registerHasError$.asObservable();
  }

  private _registerMessage$ : BehaviorSubject<string> = new BehaviorSubject<string>("");
  get registerMessage$() : Observable<string> {
    return this._registerMessage$.asObservable();
  }

  constructor(private http : HttpClient) { }

  register(user : User, password : string){
    this._registerMessage$.next("");
    this._registerHasError$.next(false);
    this._registerLoading$.next(true);
    let body = {
      ...user,
      password : password
    }
    return this.http.post<any>(`${this.baseUrl}/register`, body, {observe: 'response' }).pipe(
      map((response) => {    
        if(response.status === 201){
          this._registerMessage$.next("Utilisateur créé avec succès");
          this._registerLoading$.next(false);
          this._registerHasError$.next(false);
          return true
        }
        else{
          this._registerLoading$.next(false);
          this._registerHasError$.next(true);
          this._registerMessage$.next("Une erreur s'est produite lors de la création de l'utilisateur");
          return false;
        }
      }),
      catchError((error : HttpErrorResponse)=>{
        this._registerLoading$.next(false);
        this._registerHasError$.next(true);
        this._registerMessage$.next(error.error as string);
        return "";
      }),
    );
  }
  
}
