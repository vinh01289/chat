import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login/login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path:'', pathMatch: 'full',
  component: HomeComponent
  },
  { path:'shop',component:HomeComponent},
  { path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
