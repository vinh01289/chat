import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private route: Router) { }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {

    return this.authService.currentUser$.pipe(
      map( auth => {
        if (!auth) {
          this.route.navigate(['/login']);
          return false;
        }
        else{
          return true;
        }
      })
    );
  }

}
