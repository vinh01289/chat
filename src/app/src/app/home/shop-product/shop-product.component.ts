import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDto } from 'src/app/model/productDto';
import { AuthService } from 'src/app/services/auth.service';
import { productService } from '../../services/productservice';

@Component({
  selector: 'app-shop-product',
  templateUrl: './shop-product.component.html',
  styleUrls: ['./shop-product.component.css']
})
export class ShopProductComponent implements OnInit,OnChanges {
  @Input() idShop!: string;
  active = 1;
  visible = false;
  lsProduct: ProductDto[] = [];// decorate the property with @Input()
  listOfDisplayData: ProductDto[] = [];
  searchValue = '';
  constructor(private auth: AuthService, private router: Router, private productService: productService) { }

  ngOnInit() {
    this.getProductByShopId(this.idShop);
  }
  ngOnChanges() {
    this.getProductByShopId(this.idShop);
  }

  getProductByShopId(idShop: string){
    this.idShop = idShop;
    if (this.idShop != null)
    {
      this.productService.getListProduct(idShop).subscribe((res: any)=>{
        console.log(res);
          this.lsProduct = res.items;
          this.listOfDisplayData = this.lsProduct;
      });
    }
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.lsProduct.filter((item: ProductDto) => item.name.indexOf(this.searchValue) !== -1);
  }
}
