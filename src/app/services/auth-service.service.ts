import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {  BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Constant, HandleLocalStore } from '../model/HandleLocalSore';
import {  UserProfile } from '../model/user';
import { Token } from '../model/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentTokenSource = new BehaviorSubject<Token>(null);
  private currentUserSource = new ReplaySubject<UserProfile>(1);
  currentToken$ = this.currentTokenSource.asObservable();
  private authLogOut = new BehaviorSubject<boolean>(false);
  public Token: string;
  jwtHelper = new JwtHelperService();
  private currentUser = null;
  constructor(private route: Router, protected http: HttpClient) { 

  }
    login(phoneNumber: string, password: string): Observable<any> {
      return this.http.post(`${environment.apiUrl.tShopUrl}api/v1/sign-in/password`, {
        phoneNumber,
        password
      }).pipe(map((userLogin) => {
          if (userLogin){
            console.log(userLogin);
            localStorage.setItem('currentUser', JSON.stringify(userLogin));
            HandleLocalStore.writeaccessToken(userLogin[`accessToken`]);
            // TODO request user
          }
          else{
            this.logOut();
          }
      }));
    }

    logOut(): void{
      localStorage.removeItem(Constant.LOCALVARIABLENAME.accessToken);
      // localStorage.removeItem(Constant.LOCALVARIABLENAME.refreshToken);
      localStorage.removeItem('currentuser');
    }
    
    loginIn(): boolean{
      const token = HandleLocalStore.getToken();
      return token &&
       !this.jwtHelper.isTokenExpired(token);
    }

    getProfile(): Observable<UserProfile> {
      const that = this;
  
      return new Observable( obs => {
        if (that.loginIn())
        {
          const accessToken = localStorage.getItem('accessToken');
          const reqHeader = new HttpHeaders({
            // tslint:disable-next-line:object-literal-key-quotes
            'Authorization': `Bearer ${accessToken}`
          });
          this.http.get(`${environment.apiUrl.chatUrl}api/v1/users/get-profile-user`, {headers: reqHeader}).subscribe(
            (res: UserProfile) => {
                this.currentUser = res;
                this.currentUserSource.next(res);
                this.authLogOut.next(false);
  
                obs.next(res);
                obs.complete();
  
            },
            e => {
              this.currentUser = null;
              this.currentUserSource.next(null);
              this.authLogOut.next(true);
              obs.next(null);
              obs.complete();
            }
            );
        }else{
          this.currentUser = null;
          this.currentUserSource.next(null);
          this.authLogOut.next(true);
  
          obs.next(null);
          obs.complete();
        }
      });
    }
    getCurrentUser(): UserProfile
    {
      return this.currentUser;
    }
    loadCurrentUser(token: Token): Observable<any> {

      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token.accessToken}`);
  
      return this.http.get(`${environment.apiUrl.chatUrl}api/v1/users/get-profile-user`, {headers})
    }
    onLogOut(): Observable<boolean> {
      return this.authLogOut.asObservable();
    }
}


