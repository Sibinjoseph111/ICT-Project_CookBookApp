import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CookBook';

  constructor(private authService: UserService){}

  ngOnInit(): void{
    this.authService.autoLogin();
  }
}
