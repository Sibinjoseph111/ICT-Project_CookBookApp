import { Component, OnInit, OnDestroy } from '@angular/core';

import { RecipeModel } from '../recipe.model';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  selectedRecipe: RecipeModel;
  private authSub: Subscription;
  userSub: Subscription;
  constructor(private authService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.authSub = this.authService.recipeSelected.subscribe((recipe:RecipeModel)=>{
      this.selectedRecipe = recipe;
    })

    
    this.userSub = this.authService.user.subscribe(user=>{
      if(!user) this.router.navigate(['/recipes']);
    })

    this.authService.recipeSelected.next(null);
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    this.userSub.unsubscribe();
  }

}
