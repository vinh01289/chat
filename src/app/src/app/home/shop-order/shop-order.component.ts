import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { orderDto } from 'src/app/model/orderDto';
import { AuthService } from 'src/app/services/auth.service';
import { orderService } from 'src/app/services/orderservice.service';

@Component({
  selector: 'app-shop-order',
  templateUrl: './shop-order.component.html',
  styleUrls: ['./shop-order.component.css']
})
export class ShopOrderComponent implements OnInit,OnChanges {
  expand = false;
  @Input() idShop!: string; 
  active = 1;
  
  lsOrder: orderDto[] = [];// decorate the property with @Input()
  constructor(private auth: AuthService, private router: Router, private orderService: orderService) { }

  ngOnInit() {
    this.getIdShop(this.idShop);
  }
  ngOnChanges() {
    this.getIdShop(this.idShop);
  }

  getIdShop(idShop: string){
    this.idShop = idShop;
    if (this.idShop != null)
    {
      this.orderService.getListOrder(idShop).subscribe((res: any)=>{
        console.log(res);
          this.lsOrder = res.items;
      });
    }
  }
}
