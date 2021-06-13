import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit,OnDestroy {
  user:any;
  activatedRoute: ActivatedRoute;
  storeId:any;
  loading=0;
  customersArr = [];
  allCustomer = [];
  reviewCount : any;
  dailyOrdersCount : any;
  dailyStoreVisits : any;
  monthlyStoreVisits : any;
  temperature : any;
  subscription:Subscription
  constructor(activatedRoute: ActivatedRoute,private dataService:DataService) {
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) =>{
        console.log(params);
        this.storeId = params.id;
        console.log(this.storeId);
      }
    )
    this.dataService.fetchAllActiveUsers(this.storeId);
    this.user=this.dataService.user;
    this.dataService.getStartingCustomers(this.storeId);
    this.dataService.getTotalReviews(this.storeId);
    this.dataService.todayOrdersCount(this.storeId);
    this.dataService.todayVisitsToStore(this.storeId);
    this.dataService.monthlyVisitsToStore(this.storeId);
    this.dataService.getCurrentTemperature();
    this.subscription = this.dataService.changeStatusUpdate.subscribe(
      () =>{
        this.user = this.dataService.user;
       // this.reduceCustomerArray();
        this.customersArr = this.dataService.startingUserArr;
        this.allCustomer = this.dataService.userEntryArr;
        this.reviewCount = this.dataService.reviewCount;
        this.dailyOrdersCount = this.dataService.dailyOrdersCount;
        this.dailyStoreVisits = this.dataService.dailyStoreVisits;
        this.monthlyStoreVisits = this.dataService.monthlyStoreVisits;
        this.temperature = this.dataService.temperature;
        console.log("Total number reviews related to this store ",this.reviewCount);
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
