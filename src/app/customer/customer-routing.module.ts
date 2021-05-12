import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationComponent } from './chat/conversation/conversation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  { 
    path:'',
    pathMatch: 'full',
    component: HomeComponent, 
  },
  {path:'customer', component: HomeComponent,
    children: [
      {path:'login', component: LoginComponent}
    ]
  },
  {path:'login', component:LoginComponent},
  { path: 'conversation', component: ConversationComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
