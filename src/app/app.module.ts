import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { FavoriteListComponent } from './dashboard/favorite-list/favorite-list.component';
import { FavoriteItemComponent } from './dashboard/favorite-list/favorite-item/favorite-item.component';
import { FavoriteDetailComponent } from './dashboard/favorite-detail/favorite-detail.component';
import { ListItemComponent } from './shoppinglist/list-item/list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppHeaderComponent,
    RecipesComponent,
    DashboardComponent,
    ShoppinglistComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    FavoriteListComponent,
    FavoriteItemComponent,
    FavoriteDetailComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
