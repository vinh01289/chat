import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { orderDto } from '../model/orderDto';
import { Pagination } from '../model/Pagination';
import { ProductDto } from '../model/productDto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class productService {
  

  // getUserId: String;
  //  item = JSON.parse(localStorage.getItem("accessToken"));
  
  token = localStorage.getItem('accessToken');
  constructor(private authService: AuthService, private route: Router, protected http: HttpClient) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean{
    return this.authService.loginIn();
  }
  getListProduct(idShop: string): Observable<ProductDto[]>  {
    
    var reqHeader = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    const url = `${environment.apiUrl.tShopUrl}api/v1/app-products/list-by-shopid?ShopId=${idShop}`;
    return this.http.get<ProductDto[]>(url, { headers: reqHeader }).pipe(); 
  }
}