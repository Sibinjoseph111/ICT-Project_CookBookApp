import { Component, OnInit, Input } from '@angular/core';
import { RecipeModel } from 'src/app/recipe.model';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-favorite-detail',
  templateUrl: './favorite-detail.component.html',
  styleUrls: ['./favorite-detail.component.css']
})
export class FavoriteDetailComponent implements OnInit {
  @Input() recipe: RecipeModel;
  
  constructor(private authService: UserService) { }

  ngOnInit(): void {
  }

  removeFav(){
    this.authService.removeFavorite();
    this.authService.favDeleted.next(true);

  }

}
