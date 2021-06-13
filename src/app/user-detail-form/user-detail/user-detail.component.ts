import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  types=["hospital","office","mall","shop","restaurant"];
  constructor(private dataService:DataService) { }
  accountForm:FormGroup;

  ngOnInit(): void {

    this.accountForm=new FormGroup({
      ownername: new FormControl(null, [Validators.required]),
      organizationName: new FormControl(null, Validators.required),
      email:new FormControl(null,Validators.required),
      address: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null,Validators.required),
      type: new FormControl(null,Validators.required),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      pincode: new FormControl(null, Validators.required),
      organizationDesc: new FormControl(null)
    });
    this.accountForm.controls['email'].setValue(this.dataService.formValues.email);

  }
  next(){
    console.log(this.accountForm.value);
    this.dataService.formNext();
    this.dataService.setForm(this.accountForm.value);
   }
   back(){
    this.dataService.formBack();
   }
  onSubmit(){
    console.log(this.accountForm.value());

  }

}
