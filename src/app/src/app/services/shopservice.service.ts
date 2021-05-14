import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { orderDto } from '../model/orderDto';
import { Pagination } from '../model/Pagination';
import { ProductByShopDto } from '../model/productDto';
import { shopDto } from '../model/shopDto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class shopService {
  

  // getUserId: String;
  //  item = JSON.parse(localStorage.getItem("accessToken"));
  
  token = localStorage.getItem('accessToken');
  constructor(private authService: AuthService, private route: Router, protected http: HttpClient) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean{
    return this.authService.loginIn();
  }
  getList(): Observable<Pagination<shopDto>>  {
    
    var reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const url = `${environment.apiUrl.tShopUrl}api/v1/app-shops/list-by-employee`;
    return this.http.get<Pagination<shopDto>>(url, { headers: reqHeader }); 
  }
  
}