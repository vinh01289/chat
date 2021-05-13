import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from 'src/shared/ng-zoro-antd.module';
import { ShareModule } from 'src/shared/share.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login/login.component';
import { ConversationComponent } from './chat/conversation/conversation.component';
import { MessageComponent } from './chat/message/message.component';


@NgModule({
  declarations: [HomeComponent, LoginComponent,ConversationComponent, MessageComponent ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule,
    ShareModule,
    CommonModule,
  ]
})
export class CustomerModule { }
