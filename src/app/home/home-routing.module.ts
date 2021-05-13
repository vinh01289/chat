import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationComponent } from './chat/conversation/conversation.component';
// import { ShopComponent } from '../shop/shop/shop.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  { path:'', pathMatch: 'full',
  component: HomeComponent
  },
  { path:'shop',component:HomeComponent},
  { path:'login',component:LoginComponent},
  // { path: 'conversation', component: ConversationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
