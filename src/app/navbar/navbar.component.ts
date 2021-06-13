import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {DataService} from '../data.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy {

  isLoggedUserIn:boolean;
  isLoggedBusinessIn : boolean;

  dataService:DataService;
  userService:UserService;
  isCustomer:boolean;
  isBusiness:boolean;

  subscription:Subscription;
  token:any = '';
  userId:any = '';

  constructor(dataService : DataService,userService : UserService) {
    this.dataService = dataService;
    this.userService = userService;

  }
  ngOnInit(): void {
    this.isBusiness = this.dataService.isBusiness;
    this.isLoggedBusinessIn = this.dataService.isLoggedIn;
    this.userId = this.dataService.userId;
    this.token = this.dataService.token;
    this.subscription = this.dataService.changeStatusUpdate.subscribe(
      () => {


        this.isLoggedBusinessIn = this.dataService.isLoggedIn;
        this.isBusiness = this.dataService.isBusiness;

        this.userId = this.dataService.userId;
        this.token = this.dataService.token;
      }
    )


    this.isLoggedUserIn = this.userService.isLoggedIn;
    this.isCustomer = this.userService.isCustomer;

    this.subscription = this.userService.userDataChanged.subscribe(
      () => {
        this.isLoggedUserIn = this.userService.isLoggedIn;

        this.isCustomer = this.userService.isCustomer;
        console.log("Value of isLoggedIn variable tracker. .....",this.isLoggedUserIn);
      }

    )

  }

  logoutBusiness(){
    // localStorage.clear();
    this.dataService.logout();
  }


  logoutUser(){
    this.userService.userLogout();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
