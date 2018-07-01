import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from './user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService) { }
  newUser:User=new User();
  confirmPassword;
  emailMessage=false;
  passwordMatch=false;
  success=false;
  allUsernames;
  @ViewChild('f')ngform:NgForm;
  ngOnInit() {
    this.userService.getUsernames().subscribe(data =>{
      this.allUsernames=data;
      console.log(data);
    });
  }

  register(){
    if(this.allUsernames.find(x => x === this.newUser.emailU)){
      this.emailMessage=true;
      return
    }
   else if(this.newUser.passwordU != this.confirmPassword){
      this.passwordMatch=true;
      return
    }
    else{
      this.userService.register(this.newUser).subscribe(data =>{
        this.success=true;
        this.ngform.reset();
      });
    }
  }

  focus(){
    this.passwordMatch=false;
    this.emailMessage=false;
  }

}
