import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {
   }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestOption: any = {};
    if (this.auth.getToken()) {
      requestOption.setHeaders = {
        Authorization: `Bearer ${this.auth.getToken()}`
      };
    }

    request = request.clone(requestOption);
    return next.handle(request);
}
}
