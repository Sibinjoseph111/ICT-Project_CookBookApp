import { Injectable, EventEmitter } from '@angular/core';
import { RecipeModel } from './recipe.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new BehaviorSubject<RecipeModel>(null);

  private recipes: RecipeModel[] ;
  
  constructor(private http: HttpClient) { }

  getRecipes(){
    return this.http.get<RecipeModel[]>('http://localhost:3000/recipes');
  }

}
