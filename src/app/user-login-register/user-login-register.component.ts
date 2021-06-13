import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-login-register',
  templateUrl: './user-login-register.component.html',
  styleUrls: ['./user-login-register.component.scss']
})
export class UserLoginRegisterComponent implements OnInit {

  display=false;
  loginForm:FormGroup;
  error="";
  registerForm: FormGroup;
  msg="";
  valid:boolean=false;
  constructor(private user:UserService,private router: Router){
  };
  // constructor(private dataService:DataService,private router: Router  ) { }
  confirmPassword(event:any){
   // console.log(event.target.value);
    if(event.target.value!=this.registerForm.controls['password'].value){
      this.error="confirm password is wrong";
    }else{
      this.error="";
    }
  }
  onRegister(){
    if(this.error==""){
    //  console.log("calling service");
     // console.log(this.registerForm.value);
       this.user.userRegister (this.registerForm.value);
       this.router.navigate(["home"]);
  }
  }
  onChange(){
    this.display=!this.display;
  }
  ngOnInit(): void {
    this.user.msgLoader.subscribe(()=>{
      this.msg=this.user.msg;
    })
   // console.log("hello from login")
    this.loginForm=new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, Validators.required),
    });
    this.registerForm=new FormGroup({
      name:new FormControl(null,Validators.required),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null,Validators.required)
    });
  }
  onSubmit(){
    this.user.userLogin(this.loginForm.value);
  }
  // onChange(){
  //   this.display=!this.display;
  // }
}


