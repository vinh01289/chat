import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {  BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Constant, HandleLocalStore } from '../model/HandleLocalSore';
import {  UserProfile } from '../model/user';
import { Conversation } from '../model/conversation';
import { shopDto } from '../model/shopDto';
import { Message } from '../model/message';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  token = localStorage.getItem('accessToken');
  listMessage: Message[] = [];
  listConversation: BehaviorSubject<Conversation[]>;
  listShop: BehaviorSubject<shopDto[]>;
  // shopInfo: shopDto;
  
  // jwtHelper = new JwtHelperService();
  // private currentUser = null;
  changeData(): Observable<any>{
    return this.listConversation.asObservable();
  }
  constructor(private router: Router, private http: HttpClient, private socketService: SocketService){
    this.listConversation = new BehaviorSubject<Conversation[]>([]);
    this.listShop= new BehaviorSubject<shopDto[]>([]);
  }
  getToken():  string | null {
    return localStorage.getItem('accessToken');
  }
  getMessage(id: string): Observable<any>{
    var reqHeader = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${environment.apiUrl.chatUrl}api/v1/messages/${id}`, { headers: reqHeader });
  }
  // getConversation(): void{
  //   const reqHeader = new HttpHeaders({
  //     'Authorization': `Bearer ${this.getToken()}`
  //   });
  //   this.http.get(`${environment.apiUrl.chatUrl}api/v1/conversation?isPublic=true`).subscribe(
  //     (res: Array<Conversation>) => {
  //       this.listConversation.next(res);
  //     }
  //   );
  // }
  changeDataListShop(): Observable<any>{
    return this.listShop.asObservable();
  }
  getListShop(): void{
    this.http.get(`${environment.apiUrl.tShopUrl}api/v1/app-shops/list-by-employee`).subscribe((res: shopDto[]) => {
      this.listShop.next(res);
    });
  }
  sentMessage(content: string, type: string, conversationId: string, messageType: number, attachmentIds: string[]): Observable<any> {
    const socketId = this.socketService.socket?.id;
    return new Observable(obs => {
      this.http.post(`${environment.apiUrl.chatUrl}api/v1/messages`, {
        content,
        type,
        conversationId,
        messageType,
        attachmentIds,
        socketId
      }, { responseType: 'text' }).subscribe(res => {
        obs.next(res);
        obs.complete();
      }, er => {
        obs.error('Loi');
        obs.complete();
      });
    });
  }
  getConversationShop(idShop: string): Observable<any>{
    var reqHeader = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${environment.apiUrl.chatUrl}api/v1/conversation/list-shop-conversation/${idShop}`, { headers: reqHeader });
  }

  getConversationCustomer(): Observable<any>{
   
    var reqHeader = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${environment.apiUrl.chatUrl}api/v1/conversation?isPublic=true`, { headers: reqHeader });
  }
}


