import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError, Subject } from 'rxjs';
import { catchError, tap, take } from 'rxjs/operators'

import {UserModel} from './user.model';
import {RecipeModel} from './recipe.model';
import { RecipeService } from './recipe.service';
import { Router } from '@angular/router';
import { IngredientsModel } from './ingredients.model';

export interface UserResponseData{
  _id: String,
  username: String,
  email: String,
  password: String,
  tokens:[{
    access: {
      type: String,
      // required: true
    },
    token: {
      type: String,
      // required: true
    }
}],
  favorites?:RecipeModel[],
  shoppingList?: [{
    _id: String,
    name: String,
    quantity: String
  }]
}

interface ShoppingListItem{
  _id: String,
  quantity: String,
  name: String
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  recipeSelected = new BehaviorSubject<RecipeModel>(null);
  listItemSelected = new BehaviorSubject<ShoppingListItem>(null)
  user = new BehaviorSubject<UserModel>(null);

  favDeleted = new BehaviorSubject<Boolean>(false);
  listDeleted = new BehaviorSubject<Boolean>(false);


  constructor(private http: HttpClient, private router: Router) {}

  loginUser(email, password){
    return this.http.post<UserResponseData>('http://localhost:3000/user/login',
    { 
      email,
      password
    }
    ).pipe(catchError(errorRes =>{
      let errorMessage = 'An error occurred';
      errorMessage = errorRes.error;
      return throwError(errorMessage);
    }),
    tap(resData=>{
     this.handleAuthentication(resData._id, resData.username,resData.email,resData.password,resData.tokens,resData.favorites,resData.shoppingList);
    })
    )
  }

  signupUser(username, email, password){
    return this.http.post<UserResponseData>('http://localhost:3000/user/signup',
    {
      username,
      email,
      password
    }
    ).pipe(catchError(errorRes =>{
        let errorMessage = 'An error occurred';
        errorMessage = errorRes;
        return throwError(errorMessage);
      }),
      tap(resData=>{
       this.handleAuthentication(resData._id, resData.username,resData.email,resData.password,resData.tokens,resData.favorites,resData.shoppingList);
      })
    );
  }

  autoLogin(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return
    }

    const loadedUser = new UserModel(userData._id, userData.username,userData.email,userData.password,userData.tokens,userData.favorites,userData.shoppinhList);

    if(loadedUser.tokens[0]){
      this.user.next(loadedUser);
    }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/login'])

    localStorage.removeItem('userData');
  }

  getUserDetails(id){
    return this.http.get<UserResponseData>(`http://localhost:3000/user/${id}`);
  
  }

  addFavorites(){

    var id;
    var recipe;
    this.user.pipe(take(1)).subscribe(user =>{
      id = user._id;
    });

    this.recipeSelected.subscribe((recipeSelected:RecipeModel) =>{
      recipe = recipeSelected;
      // console.log(recipeSelected);
    });

    // console.log(id, recipe);

    return this.http.post('http://localhost:3000/user/addfavorites',{
      id,
      recipe
    }
    ).subscribe(resData => {
      console.log(resData)
      this.router.navigate(['/dashboard'])
    },err=>{
      alert(err.error.text)
    })
  }

  removeFavorite(){
    var id;
    var name;

    this.user.pipe(take(1)).subscribe(user =>{
      id = user._id;
    });

    this.recipeSelected.subscribe((recipeSelected:RecipeModel) =>{

      if(recipeSelected) name = recipeSelected.name;
      // console.log(recipeSelected);
    });

    return this.http.post('http://localhost:3000/user/removefavorites',{
      id,
      name
    }).subscribe(resData => {
      console.log(resData);
      this.router.navigate(['dashboard']);
      this.favDeleted.next(true);
    })
  }

  addToShoppingList(){
    var id;
    var items: IngredientsModel[];

    this.user.pipe(take(1)).subscribe(user =>{
      id = user._id;
    });

    this.recipeSelected.subscribe((recipeSelected:RecipeModel) =>{

      if(recipeSelected) items = recipeSelected.ingredients;
      // console.log(recipeSelected);
    });

    return this.http.post('http://localhost:3000/user/addtolist',{
      id,
      items
    }).subscribe(resData=>{
      this.router.navigate(['/shoppinglist']);
    });

  }

  removeFromShoppingList(){
    var id;
    var itemId;

    this.user.pipe(take(1)).subscribe(user =>{
      id = user._id;
    });

    this.listItemSelected.subscribe((item: ShoppingListItem)=>{

      if(item) itemId= item._id;

    });

    return this.http.post('http://localhost:3000/user/removefromlist',{
      id,
      itemId
    }).subscribe(resData=>{
      this.listItemSelected.next(null);
      this.listDeleted.next(true);
    })
  }

  updateListItem(){
    var id;
    var item;

    this.user.pipe(take(1)).subscribe(user =>{
      id = user._id;
    });

    this.listItemSelected.subscribe((listItem: ShoppingListItem)=>{

      if(listItem) item = listItem;

      console.log(item);

    });

    return this.http.post('http://localhost:3000/user/updateList',{
      id,
      item
    }).subscribe(resData=>{
      this.listItemSelected.next(null);
      // this.listDeleted.next(true);
    })

  }

  private handleAuthentication(id, name, email, password, tokens, favorites, shoppingList){
    const user = new UserModel(id, name, email, password, tokens, favorites,shoppingList);
    this.user.next(user); 

    localStorage.setItem('userData',JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse){

  }
}
