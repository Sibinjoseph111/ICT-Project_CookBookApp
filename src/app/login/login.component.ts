import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {UserService, UserResponseData} from '../user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginMode = true;
  isLoggedIn = false;
  error = null;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid) return;

    var email = form.value.email;
    var username = form.value.username;
    var password = form.value.password;

    let authObs: Observable<UserResponseData>;

    if(this.isLoginMode){
      authObs =  this.userService.loginUser(email,password);
    }else{
      authObs =  this.userService.signupUser(username,email,password);
    }

    authObs.subscribe(resData=>{
      console.log(resData);
      this.router.navigate(['/'])
    },errorMessage=>{
      this.error = errorMessage;
      console.log(errorMessage)
    });

    form.reset();
  }

}
