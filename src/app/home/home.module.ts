import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoNgZorroAntdModule } from 'src/shared/ng-zoro-antd.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ShopOrderComponent } from './shop-order/shop-order.component';
import { ShopProductComponent } from './shop-product/shop-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConversationComponent } from './chat/conversation/conversation.component';
import { ShareModule } from 'src/shared/share.module';
import { MessageComponent } from './chat/message/message.component';
import { LoginModule } from '../login/login.module';



@NgModule({
  declarations: [
    // HomeComponent,
    // ShopOrderComponent,
    // ShopProductComponent,
    // ConversationComponent,
    // MessageComponent,
  ],
  
  exports:[],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    DemoNgZorroAntdModule,
    ShareModule,
    LoginModule,
  ]
})
export class HomeModule { }
