import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import {DataService} from '../../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  users = [];
  loading=0;
  operation="";
  user:any;
  activatedRoute: ActivatedRoute;
  formDisplay=0;
  customerForm:FormGroup;
  entryForm:FormGroup;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  dataService:DataService;
  storeId:any;
  subscription:any;
  indexOfEditedUser : any;
  aarogyaSetuStatus :Array<String> = ['','Safe','Moderate','Unsafe'];

  // countStar(star) {
  //   this.selectedValue = star;
  //   this.customerForm.controls['rating'].setValue(star);
  //   console.log('Value of star', star);
  // }
  constructor(dataService : DataService,activatedRoute: ActivatedRoute) {
    this.dataService = dataService;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    this.user=this.dataService.user;
    this.customerForm=new FormGroup({
      name: new FormControl(null, Validators.required),
      temperature : new FormControl(null,Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      aarogyaSetu : new FormControl(null, Validators.required)
      // email: new FormControl(null, Validators.required),
      // address: new FormControl(null, Validators.required),
      // rating: new FormControl(0)
    });
    this.entryForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      temperature: new FormControl(null, Validators.required)
    })
    this.activatedRoute.parent.params.subscribe(
      (params) =>{
        console.log(params);
        this.storeId = params.id;
        console.log(this.storeId);
      }
    )
    this.subscription = this.dataService.changeStatusUpdate.subscribe(
      () => {
        let usersCopy = this.dataService.userEntryArr;
        // this.users = [...this.users,...usersCopy];
        this.users = usersCopy;
        this.user = this.dataService.user;
      }
    )
    console.log(this.users);
    this.dataService.fetchAllActiveUsers(this.storeId);
  }
  editUser(index){
    console.log(index)
    this.formDisplay=1;
    this.operation="edit";
    this.indexOfEditedUser = index;
    this.customerForm.patchValue(this.users[index]);
  }

  deleteUser(id){
    this.dataService.deleteUserEntry(id,this.storeId);
  }
  addUser(){
    this.formDisplay=1;
    this.operation="add";
  }

  enterUser(){
    this.formDisplay = 2;
    // this.operation = "enter";
  }

  leave(userId){
    console.log(userId);
    this.dataService.leaveUser(userId);

  }
  cancel(){
    this.formDisplay=0;
    this.operation="";
    this.customerForm.reset();

  }
  submit(){

    console.log( this.customerForm.value);
   // this.users.push(this.customerForm.value);

    if(this.operation == 'add'){
      let userDetail = this.customerForm.value;
      userDetail.store_id = this.storeId;
      this.customerForm.reset();
      this.dataService.addUserEntry(userDetail);
    }
    else if(this.operation == 'edit'){
      let userDetail = this.customerForm.value;
      userDetail.store_id = this.storeId;
      let beforeEdit = this.users[this.indexOfEditedUser];
      console.log("After editing user entry",userDetail);
      this.dataService.editUserEntry(userDetail,beforeEdit._id,this.storeId);
    }

    this.formDisplay=0;
    this.operation="";

  }

  // userEntry(){
  //   console.log(this.entryForm.value);
  //   this.formDisplay = 0;
  //   let userEntryDetails = this.entryForm.value;
  //   userEntryDetails.store_id = this.storeId;
  //   console.log(userEntryDetails);
  //   this.dataService.addUserEntry(userEntryDetails);
  // }

}
