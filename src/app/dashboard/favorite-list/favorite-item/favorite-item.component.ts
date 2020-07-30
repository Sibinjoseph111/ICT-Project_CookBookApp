import { Component, OnInit, Input } from '@angular/core';
import { RecipeModel } from 'src/app/recipe.model';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.css']
})
export class FavoriteItemComponent implements OnInit {

  @Input() recipe: RecipeModel;

  constructor(private authService: UserService ) { }

  ngOnInit(): void {
  }

  onRecipeSelected(){
    this.authService.recipeSelected.next(this.recipe);
  }

}
