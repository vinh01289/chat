import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from '../model/token';
import * as io from 'socket.io-client';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socketUrl = environment.apiUrl.socketUrl;
  socket: any;
  token: Token;

  constructor(public auth: AuthService) {
    this.auth.currentToken$.subscribe(token => {
      this.token = token;
      if (this.token) {
        console.log('tocken', this.token);
        this.initSocket();
      }
    });


  }
  initSocket(): void {
    this.socket = io(`${this.socketUrl}`);
    this.socket.on('connect', () => {
      this.socket.emit('authenticate', this.token.accessToken);
      console.log('socket', this.socket.id); // x8WIv7-mJelg7on_ALbx
    });
  }
  disconnectSocket(): void {
    this.socket.close();
  }
  /**
   * @description listen data from event
   * @param eventName name of event
   * @returns Observable of data
   */
  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      console.log(eventName);
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }
}



