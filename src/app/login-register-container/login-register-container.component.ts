import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login-register-container',
  templateUrl: './login-register-container.component.html',
  styleUrls: ['./login-register-container.component.scss']
})
export class LoginRegisterContainerComponent implements OnInit {
  loading:any=0;
  display=false;
  loginForm:FormGroup
  error="";
  msg="";
  valid:boolean=false;
  registerForm: FormGroup;
  constructor(private dataService:DataService,private router: Router  ) { }

  confirmPassword(event:any){
   // console.log(event.target.value);
    if(event.target.value!=this.registerForm.controls['password'].value){
      this.error="confirm password is wrong";
    }else{
      this.error="";
    }
  }

  onRegister(){
    this.loading=1;
    if(this.error==""){
     // console.log("calling service");
    this.dataService.setForm(this.registerForm.value);
    this.router.navigate(["user-detail"]);
    this.loading=0;
  }
  }
  ngOnInit(): void {
   // console.log("hello from login")

    this.dataService.msgLoader.subscribe(()=>{
      this.msg=this.dataService.msg;
    })
    this.loginForm=new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
    this.registerForm=new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, Validators.required),
    });
  }
  onSubmit(){
    this.loading=1;
    this.dataService.login(this.loginForm.value)
    this.loading=0;
  }
  onChange(){
    this.loading=1;
    this.display=!this.display;
    this.loading=0;
  }

}
