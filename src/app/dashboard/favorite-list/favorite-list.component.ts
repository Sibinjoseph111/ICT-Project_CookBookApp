import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeModel } from 'src/app/recipe.model';
import { UserService } from 'src/app/user.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit, OnDestroy {

  userSub: Subscription;
  reloadSub: Subscription;

  recipes: RecipeModel[];

  constructor( private authService: UserService) { }

  ngOnInit(): void {

    this.authService.user.pipe(take(1)).subscribe(user=>{

      if(user){
        this.userSub = this.authService.getUserDetails(user._id).subscribe(user =>{
          // console.log(user)
          this.recipes = user.favorites;
        });
      }
    });

    this.reloadSub = this.authService.favDeleted.subscribe((deleted: Boolean)=>{
      if(deleted) {
        this.authService.favDeleted.next(false);
        this.reload();
      }
    })
  }

  reload(){
    // console.log('keriiiii')
    
    this.ngOnInit();

    this.authService.recipeSelected.next(null);

  }

  ngOnDestroy(): void {
    if(this.userSub) this.userSub.unsubscribe();
    
    this.reloadSub.unsubscribe();
  }

}
