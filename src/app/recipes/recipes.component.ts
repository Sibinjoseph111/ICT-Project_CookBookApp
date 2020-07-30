import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RecipeModel } from '../recipe.model';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit, OnDestroy {

  selectedRecipe: RecipeModel;
  private recipeSubsriber: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeSubsriber = this.recipeService.recipeSelected.subscribe((recipe:RecipeModel)=>{
      this.selectedRecipe = recipe;
    })
  }
  ngOnDestroy(): void {
    this.recipeSubsriber.unsubscribe();
  }

}
