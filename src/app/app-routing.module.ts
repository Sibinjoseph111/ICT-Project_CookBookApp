import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecipesComponent } from './recipes/recipes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import {AuthGuard} from './auth.guard';


const routes: Routes = [
  {path:'', redirectTo: '/recipes', pathMatch: 'full'},
  // {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'login',component: LoginComponent},
  {path:'recipes', component:RecipesComponent},
  {path: 'dashboard',component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'shoppinglist',component: ShoppinglistComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
