import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  employee:any;
  formState=0;
  formStateLoader=new Subject<void>();
  userId=""; //id of user
  user:any = {}; // user details
  token:any; // user token
  loader=0;
  loaderState=new Subject<void>();

  employeeFetched=new Subject<void>();
  isLoggedIn : boolean = false;
  isBusiness : boolean = false;

  initializeForm={
    "address": "",
 "capacity": 0,
 "city": "",
 "email": "",
 "organizationCovidDesc": "",
 "organizationDesc": "",
 "organizationName": "",
 "ownername": "",
 "password": "",
 "phoneNumber": "",
 "pincode": "",
 "safetyKit": false,
 "sanitization": false,
 "socialDistancingCheck": false,
 "state": "",
 "temperatureCheck": false,
 "type": ""

};
emp:any="";
formValues=this.initializeForm;
  order: any;
  constructor(private http:HttpClient,private router:Router) { }

  formNext(){
    this.formState++;
    console.log(this.formState);
    this.formStateLoader.next();
  }

  formBack(){
    if(this.formState>0)
    this.formState--;
    console.log(this.formState);
    this.formStateLoader.next();
  }
  setForm(obj){
    this.formValues={...this.formValues,...obj};
    console.log(this.formValues);
  }

  submitForm(){
    //submit the form and reset the form
    //make http call to backend to register the organization
    let body=this.formValues;

    console.log(this.formValues);
    console.log("sending form to backend");
    this.http.post("http://localhost:8080/register",body).subscribe(
        (response:any)=>{
        console.log(response);
        let res=response.obj;
        let id=res._id;
        this.userId=id;
        this.user=res;
        this.router.navigateByUrl("/"+id+"/dashboard");
        console.log("response aa gya");
        }
      )

    this.formValues=this.initializeForm;

  }

  changeStatusUpdate = new Subject<void>();
  userData:any;
  userEntryArr = [];
  startingUserArr = [];
  reviewCount : any;
  dailyOrdersCount : any;
  dailyStoreVisits : any;
  monthlyStoreVisits : any;
  temperature : any;
  msg:any;
  msgLoader = new Subject<void>();
  // headers:HttpHeaders;

  addUserEntry(userEntryObj){
    // console.log("Printing the user entery object in service",userEntryObj);
    let httpHeaders = new HttpHeaders({
      'Authorization' : "Bearer " + this.token
    });
    // https://covid-app-backend-dot-hu18-groupa-angular.et.r.appspot.com/
    this.http.post('http://localhost:8080/user/userentry',userEntryObj,{headers : httpHeaders})
    .subscribe((response:any) => {
      // console.log(response);
      if(response.objectAddedCheck){
        let userEntryResObj = response.obj;
        this.userEntryArr.push(userEntryResObj);
        this.changeStatusUpdate.next();
      }else if(response.objectAddedCheck == false){
        alert(response.msg);
      }else{
        alert(response.msg);
      }

    })
  }

  fetchAllActiveUsers(id){
    this.loader=1;
    this.loaderState.next();
    // https://covid-app-backend-dot-hu18-groupa-angular.et.r.appspot.com/activecustomers/
    let httpHeaders = new HttpHeaders({
      'Authorization' : "Bearer " + this.token
    });
    // console.log("the header is ",httpHeaders);
    this.http.get('http://localhost:8080/activecustomers/'+id,{headers : httpHeaders})
    .subscribe((response:any) => {
      // console.log(response);
      this.userEntryArr = [...response];
      this.changeStatusUpdate.next();
      this.loader=0;
      this.loaderState.next();
    })
  }

  getStartingCustomers(id){
    let httpHeaders = new HttpHeaders({
      'Authorization' : "Bearer " + this.token
    });
    this.http.get('http://localhost:8080/activecustomers/'+id,{headers : httpHeaders})
    .subscribe((response:any) => {
     // console.log(response);
      this.userEntryArr = [...response];
      if(this.userEntryArr.length > 4){
        this.startingUserArr = [];
        for(let i = 0; i < 4; i++){
          this.startingUserArr.push(this.userEntryArr[i]);
        }
      }else{
        this.startingUserArr = [...this.userEntryArr];
      }
      this.changeStatusUpdate.next();
    })
  }

  leaveUser(userEntryId){
    let updatedEntry = {userStatus : false};
    // console.log(userEntryId);
    // console.log(updatedEntry);
    let httpHeaders = new HttpHeaders({
      'Authorization' : "Bearer " + this.token
    });
    this.http.put('http://localhost:8080/user/userentry/'+userEntryId,updatedEntry,{headers : httpHeaders})
    .subscribe((response:any) => {
      console.log(response);
      for(let i = 0; i < this.userEntryArr.length; i++){
        if(this.userEntryArr[i]._id == userEntryId){
          this.userEntryArr.splice(i,1);
          this.changeStatusUpdate.next();
        }
      }
    })
  }

  login(obj){
    this.msg="";
    this.msgLoader.next();
   // console.log(obj);
    // https://covid-app-backend-dot-hu18-groupa-angular.et.r.appspot.com
    this.http.post('http://localhost:8080/login',obj)
    .subscribe((response:any) => {
      // console.log(response);
      if(response.isLoggedIn){

        let res=response.loginObj;
        let id=res._id;
        this.userId=id;
        this.isLoggedIn = response.isLoggedIn;
        this.isBusiness = true;
        this.user=res;
        this.token = response.token;
        this.changeStatusUpdate.next();

        //logic for local storage
        let businessBasicInfo = {
          token : '',
          userId : '',
          isLoggedIn : false,
          isBusiness : false
        }
        businessBasicInfo.token = this.token;
        businessBasicInfo.userId = this.userId;
        businessBasicInfo.isLoggedIn = this.isLoggedIn;
        businessBasicInfo.isBusiness = this.isBusiness;
        localStorage.setItem('businessBasicInfo' , JSON.stringify(businessBasicInfo));
        // localStorage.setItem('userData', JSON.stringify(this.user));

        this.router.navigateByUrl("/"+id+"/dashboard");

        // console.log(this.token);
      }else{
        this.msg="wrong email or password";
        this.msgLoader.next();
      }


    })
  }

  logout(){
    this.token = '';
    this.userId = '';
    this.isBusiness = false;
    this.isLoggedIn = false;
    // localStorage.removeItem('businessBasicInfo');
   // console.log('calling logout function');
    localStorage.clear();
    this.changeStatusUpdate.next();
  }

  autoLogin(){
    const businessBasicInfo:{
      token : any,
      userId : any,
      isLoggedIn : boolean,
      isBusiness : boolean
    } = JSON.parse(localStorage.getItem('businessBasicInfo'));

    if(!businessBasicInfo){
      return;
    }
    console.log(businessBasicInfo);
    this.token = businessBasicInfo.token;
    this.userId = businessBasicInfo.userId;
    this.isLoggedIn = businessBasicInfo.isLoggedIn;
    this.isBusiness = businessBasicInfo.isBusiness;
    this.http.get('http://localhost:8080/user/getstore/' + this.userId)
    .subscribe((response:any) =>{
      this.user = response.obj;
     // console.log("Value after refresh button ", this.user);
      this.changeStatusUpdate.next();

    })

    // this.changeStatusUpdate.next();
  }

  addEmployee(value,storeId){
    let details={
        "name":value.name,
        "store_id":storeId,
        "phoneNumber":value.number,
        "address":value.address,
        "temperature":value.temperature,
        "imgURL":null
    }

    this.http.post('http://localhost:8080/employee',details).subscribe
    ((response:any)=>{
     // console.log(response);
      this.fetchEmployeeData(storeId);
    }
    )
  }
  fetchEmployeeData(id:any){
    this.http.get('http://localhost:8080/employee/'+id).subscribe
    ((response:any)=>{
    //  console.log(response.obj);
      // return response.obj;
      this.employee=response.obj;
      this.employeeFetched.next();
    })
  }

  updateEmployee(employee:any,id:any,storeId:any){
    this.http.put('http://localhost:8080/employee/'+id,employee).subscribe
    ((response:any)=>{
     // console.log(response);
      this.fetchEmployeeData(storeId);
    })
  }
  deleteEmployee(empId:any,id:any){
    this.http.delete('http://localhost:8080/employee/'+empId).subscribe
    ((response:any)=>{
     // console.log(response);
      this.fetchEmployeeData(id);
    })
  }


  //analytics
  getTotalReviews(id){
    this.http.get('http://localhost:8080/totalreviews/'+id)
    .subscribe((response:any) => {
      this.reviewCount = response.length;
      this.changeStatusUpdate.next();
    })
  }

  todayOrdersCount(id){
    this.http.get('http://localhost:8080/getordercurrentdatelength/'+id)
    .subscribe((response:any) => {
      this.dailyOrdersCount = response.length;
      this.changeStatusUpdate.next();
    })
  }

  todayVisitsToStore(id){
    this.http.get('http://localhost:8080/getdailyvisitcount/'+id)
    .subscribe((reponse:any)=>{
      this.dailyStoreVisits = reponse.length;
      this.changeStatusUpdate.next();

    })
  }

  monthlyVisitsToStore(id){
    this.http.get('http://localhost:8080/getmonthordercount/'+id)
    .subscribe((response:any) => {
      this.monthlyStoreVisits = response.length;
      this.changeStatusUpdate.next();
    })
  }

  getCurrentTemperature(){
    console.log("Value of user object in temperature function ",this.user);
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.user.state}&APPID=300a4609c8e255f8de8e78c3b597d183`)
    .subscribe((response:any) => {
      let value = response.main.temp - 273.15;
      this.temperature = Math.round((value + Number.EPSILON) * 10) / 10
      this.changeStatusUpdate.next();
    })
  }

  editBusinessDetail(user){
    this.http.put('http://localhost:8080/editdetails/'+user._id,user)
    .subscribe((response:any)=>{
      this.user = response.obj;
      this.changeStatusUpdate.next();
      console.log(response);
    })
  }

  editUserEntry(editObj,editId,storeId){
    console.log("reaching edit function");
    this.http.put('http://localhost:8080/edituser/'+editId,editObj)
    .subscribe((response:any) => {
      console.log(response);
      this.fetchAllActiveUsers(storeId);
    })
  }

  deleteUserEntry(userId,storeId){
    this.http.delete('http://localhost:8080deleteentry/'+userId)
    .subscribe((response : any) => {
      this.fetchAllActiveUsers(storeId);
    })
  }
}
