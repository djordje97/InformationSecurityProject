import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService) { }
  newUser={};
  confirmPassword="";
  emailMessage=false;
  passwordMatch=false;
  ngOnInit() {
  }

  register(){
    console.log(this.confirmPassword);
  }

}
