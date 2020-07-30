import { Component, OnInit, Input} from '@angular/core';

import {RecipeModel} from '../../../recipe.model';
import { RecipeService } from 'src/app/recipe.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: RecipeModel;

  constructor(private recipeService: RecipeService, private authService: UserService) { }

  ngOnInit(): void {
  }

  onRecipeSelected(){
    this.recipeService.recipeSelected.next(this.recipe);
    this.authService.recipeSelected.next(this.recipe);
  }

}
