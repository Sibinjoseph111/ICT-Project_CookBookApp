import { Component, OnInit, Input } from '@angular/core';
import { RecipeModel } from 'src/app/recipe.model';
import { UserService } from 'src/app/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: RecipeModel;

  private userSub: Subscription;

  isAuthenticated = false;

  constructor(private authService: UserService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated = !!user; //!!user is same as !user? false : true
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onAddtoFav(){
    this.authService.addFavorites();
  }

  onAddToShoppingList(){
    this.authService.addToShoppingList();
  }

}
