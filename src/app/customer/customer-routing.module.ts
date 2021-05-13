import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationComponent } from './chat/conversation/conversation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  { 
    path:'',
    component: HomeComponent, 
  },
  {path:'customer', component: HomeComponent},
  {path:'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
