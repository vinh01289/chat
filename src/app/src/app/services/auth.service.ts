import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, observable, Observable, of, ReplaySubject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { SocketService } from './socket.service';
import { Socket } from 'socket.io-client';
import { Token } from '../model/token';
import { UserLogin, UserProfile } from '../model/user';
import { Constant, HandleLocalStore } from '../model/HandleLocalSore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public accessToken: string;
  jwtHelper = new JwtHelperService();
  private currentTokenSource = new BehaviorSubject<Token>(null);
  currentToken$ = this.currentTokenSource.asObservable();
  private currentUserSource = new ReplaySubject<UserProfile>(1);
  currentUser$ = this.currentUserSource.asObservable();
  private authLogOut = new BehaviorSubject<boolean>(false);
  private currentUser = null;
  constructor(private route: Router, protected http: HttpClient) {
  }
  login(phoneNumber: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl.tShopUrl}api/v1/sign-in/password`, {
      phoneNumber,
      password
    }).pipe(map((userLogin: UserLogin) => {
      
      if (userLogin) {
        const token = {} as Token;
        token.accessToken = userLogin.accessToken;
        token.refreshToken = userLogin.refreshToken;
        HandleLocalStore.writeaccessToken(userLogin[`accessToken`]);
        HandleLocalStore.writerefreshToken(userLogin[`refreshToken`]);
        this.currentTokenSource.next(token);
      }
        else{
          this.logOut();
        }
    }));
  }
 getToken(): string
   {
     return localStorage.getItem('accessToken');
   }
  logOut(): void{
    localStorage.removeItem(Constant.LOCALVARIABLENAME.accessToken);
    localStorage.removeItem(Constant.LOCALVARIABLENAME.refreshToken);
    this.currentUserSource.next(null);
    // this.currentTokenSource.next(null);
    this.authLogOut.next(true);
  }
  loginIn(): boolean{
    const token = HandleLocalStore.getToken();
    return token &&
     !this.jwtHelper.isTokenExpired(token);
  }
  sentOtp(phoneNumber: string): Observable<any>{
    return this.http.post(`${environment.apiUrl.chatUrl}api/v1/users/sign-up/send-otpsms`, {
      phoneNumber
    }).pipe(map(res => {
      return res;
    }));
  }
  verifyOtp(phoneNumber: string, otpcode: string): Observable<any>{
      return this.http.post(`${environment.apiUrl.chatUrl}api/v1/users/sign-up/verify-otpsms`, {
        phoneNumber,
        otpcode
      }).pipe(map(res => {
         localStorage.setItem('smstoken', res[`smsOtpToken`]);
         return res;
      }));
  }
  signUp(name: string, email: string, password: string,
         phoneNumber: string, smsOtpToken: string, otpCode: string): Observable<any>{
    return this.http.post(`${environment.apiUrl.chatUrl}api/v1/users/sign-up`, {
      name,
      email,
      password,
      phoneNumber,
      smsOtpToken,
      otpCode
    }).pipe(map(res => {
      return res;
    }));
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
  loadCurrentUser(token: Token): Observable<boolean>{

    return new Observable<boolean>(res=>{
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token.accessToken}`);
  
      this.http.get(`${environment.apiUrl.chatUrl}api/v1/users/get-profile-user`, {headers})
      .subscribe((user: UserProfile) => {
        if (user) {
            // debugger;
            this.currentTokenSource.next(token);
            this.currentUserSource.next(user);
            this.currentUser = user;
            this.authLogOut.next(false);
            res.next(true);
          }
          else {
            // this.currentTokenSource.next(null);
            this.currentUserSource.next(null);
            this.currentUser = null;
            this.authLogOut.next(true);
            res.next(false);
          }
          res.complete();
        },err=>{
          res.error(err);
          res.complete();
        }
      );
    })
   
  }
  onLogOut(): Observable<boolean> {
    return this.authLogOut.asObservable();
  }
}
