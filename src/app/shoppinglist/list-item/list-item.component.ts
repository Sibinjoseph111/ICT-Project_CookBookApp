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

  item;

  editMode = false;
  quantity =0;

  constructor(private authService: UserService) { }

  ngOnInit(): void {

  }

  onItemDelete(){
    this.authService.listItemSelected.next(this.listItem);
    this.authService.removeFromShoppingList();
  }

  onItemEdit(){
    this.editMode = !this.editMode
    this.item = this.listItem;
  }

  onItemUpdate(){
    this.authService.listItemSelected.next(this.listItem);
    this.authService.updateListItem();
    this.editMode = !this.editMode;

  }

}
