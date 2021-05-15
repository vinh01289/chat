import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { DemoNgZorroAntdModule } from 'src/shared/ng-zoro-antd.module';
import { AuthInterceptor } from './http-interceptor.ts/auth-interceptor';
import { ErrInterceptor } from './http-interceptor.ts/error-interceptor';
import { LoginModule } from './login/login.module';
import { ConversationComponent } from './home/chat/conversation/conversation.component';
import { MessageComponent } from './home/chat/message/message.component';
import { HomeComponent } from './home/home/home.component';
import { ShopOrderComponent } from './home/shop-order/shop-order.component';
import { ShopProductComponent } from './home/shop-product/shop-product.component';
import { ShareModule } from 'src/shared/share.module';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopOrderComponent,
    ShopProductComponent,
    ConversationComponent,
    MessageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    DemoNgZorroAntdModule,
    LoginModule,
    ShareModule,
  ],

  providers: [{ provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptor,
     multi: true,
   },
   {
       provide: HTTP_INTERCEPTORS,
       useClass: ErrInterceptor,
       multi: true
   },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
