import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { UserModel } from '../user.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit, OnDestroy {

  listItems:[ {
    _id: String,
    name: String,
    quantity: String
  }]

  userSub: Subscription;

  user: UserModel;

  constructor(private authService: UserService) { }

  ngOnInit(): void {

    this.authService.user.pipe(take(1)).subscribe( user=>{
      this.user = user;
    });

    this.authService.getUserDetails(this.user._id).subscribe(user=>{
      this.listItems = user.shoppingList;
      // console.log(this.listItems)
    })

    this.authService.listDeleted.subscribe(deleted=>{
      if(deleted){
        this.authService.listDeleted.next(false);
        this.reload();
      }
    })

  }

  reload(){
    // console.log('keriiiii')
    
    this.ngOnInit();

  }

  ngOnDestroy():void{
    if(this.userSub) this.userSub.unsubscribe();
  }


}
