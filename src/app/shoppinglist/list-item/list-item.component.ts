import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() listItem: {
    _id: String,
    name: String,
    quantity: String
  }

  constructor(private authService: UserService) { }

  ngOnInit(): void {

  }

  onItemDelete(){
    this.authService.listItemSelected.next(this.listItem);
    this.authService.removeFromShoppingList();
  }

}
