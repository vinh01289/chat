import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socketUrl = environment.apiUrl.socketUrl;
  socket: any;
  user: any;

  constructor(public authen: AuthService) {
   this.user = this.authen.getCurrentUser();
   if(this.user){
    this.socket = io(`${this.socketUrl}?userId=${this.user.id}`);
   }
    // this.authen.getUserChange().subscribe((res: any) => {

    //   console.log('getUserChange', this.socket);
    //   if (res){
    //     this.user = res;
    //     console.log('userid', this.user.id);

    //     this.socket = io(`${this.socketUrl}?userId=${this.user.id}`);
    //   }
    // });
  }


  /**
   * @description listen data from event
   * @param eventName name of event
   * @returns Observable of data
   */
  listen(eventName: string): Observable<any>{
    return new Observable((subscriber) => {
      console.log(eventName);
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }
  // public videoCallRejected(toId): void {
  //   this.socket.emit('video-call-reject', {
  //      toId
  //    });
  // }
}
function io(arg0: string): any {
  throw new Error('Function not implemented.');
}

