import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
// import * as io from 'socket.io-client';
// import {io} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  shop:any;
  business:any;
  category:any;
  items:any;
  shopFetched= new Subject <void>();
  businessFetched= new Subject <void>();
  dataFetched=new Subject<void>();
  dataIndividual=new Subject<void>();
  itemsFetched=new Subject<void>();
  businessName:any=null;
  msg=""
  msgLoader=new Subject<void>();
  cartOperation=new Subject<void>();
  carts:any[]=[];
  itemNo:any=0;
  public totalAmount:any=0;

  ordersFetched=new Subject<void>();
  order: any;
  location:String=null;
  userId:any=null;
  review:any;
  reviewFethched=new Subject<void>();

  storeName:any;
    businessNameFetched= new Subject<void>();


  isLoggedIn:boolean = false;
  isCustomer:boolean = false;
  activeUser:any=null;
  userDataChanged = new Subject<void>();
  socket : any;
  constructor(private http:HttpClient,private router: Router)
  {
    // this.socket = io('http://localhost:8080',{ transports : ['websocket'] });
    //
  }
  //fetching all the stored businesses
  fetchShops()
  {
    this.http.get('http://localhost:8080/user/getallstores').subscribe(
      (response:any)=>{this.shop=response.responseArr;
                        this.category=this.shop;
                        if(this.location!=null){
                        this.category=this.category.filter(shop=>shop.city.toLowerCase()==this.location.toLowerCase());
                        }
                        if(this.businessName!=null)
                        {
                          this.category=this.shop.filter(shop=>shop.organizationName.toLowerCase()==this.businessName.toLowerCase());
                        }
                         this.dataFetched.next();
                      }
    );
  }
  fetchIndividual(category:any)
  {
    if(category=="place"){
      this.fetchShops();
    }else{
    this.http.get('http://localhost:8080/user/getallstores').subscribe(
      (response:any)=>{this.shop=response.responseArr;
                       this.category=this.shop.filter(shop=>shop.type.toLowerCase()==category.toLowerCase());
                       if(this.location!=null){
                        this.category=this.category.filter(shop=>shop.city.toLowerCase()==this.location.toLowerCase());
                        }
                         this.dataFetched.next();
                      }
    );}
  }
  //fetch bussiness by name
  fetchByName(shopname:any){
    this.http.get('http://localhost:8080/user/getallstores').subscribe(
      (response:any)=>{this.shop=response.responseArr;
                      this.businessName=shopname;
                      this.category=this.shop.filter(shop=>shop.organizationName.toLowerCase()==shopname.toLowerCase());
                       if(this.location!=null){
                        this.category=this.category.filter(shop=>shop.city.toLowerCase()==this.location.toLowerCase());
                        }
                         this.dataFetched.next();
                      });
  }
  //fetches bussiness by id
  fetchBusinessById(id:any){
    this.http.get('http://localhost:8080/user/getstore/'+id).subscribe(
      (response:any)=>{this.business=response.obj;
        // console.log(this.business);
        this.businessFetched.next();
       // return this.business;
      }
    );
  }

  //fetch all items in shop
  fetchItems(id:any){
    this.http.get("http://localhost:8080/item/"+id).subscribe(
    (response:any)=>{
      this.items=response.categoryItems;
      this.itemsFetched.next();
    }
    );
  }
  //setting the cart
  addCart(cart:any)
  {
    this.http.put("http://localhost:8080/user/additem/"+this.userId,cart).subscribe(
      (response:any)=>{
        // console.log(response.obj.cart," ",response.obj.totalCost);
        this.carts=response.obj.cart;
        this.totalAmount=response.obj.totalCost;
        //console.log(response.obj.totalCost);
        //console.log(this.totalAmount);
        //console.log(this.carts, "this is here");
        this.cartOperation.next();
      }
    );
  }

  //geting the cart values
  removeCart(cart:any)
  {
    this.http.put("http://localhost:8080/user/subitem/"+this.userId,cart).subscribe(
      (response:any)=>{
        // console.log(response.obj.cart," ",response.obj.totalCost);
        this.carts=response.obj.cart;
        this.totalAmount=response.obj.totalCost;
        //console.log(response.obj.totalCost);
        //console.log(this.totalAmount);
        // console.log(this.carts, "this is here");
        this.cartOperation.next();
      }
    );
  }

  //getting cart data
  getCart()
  {
    this.http.get("http://localhost:8080/user/getcart/"+this.userId).subscribe(
      (response:any)=>{
        this.carts=response.cart;
        //console.log(response.cart.totalCost);
        this.totalAmount=response.totatCost;
        //console.log(this.totalAmount);
       // console.log(this.carts,"here");
        this.cartOperation.next();
      }
    )
  }
  returnCart()
  {
    return this.carts;
  }

  returnTotal()
  {
    return this.totalAmount;
  }
  orderDone(detail)
  {
    this.http.post("http://localhost:8080/user/order",detail).subscribe(
      (response:any)=>{
        console.log(response);
        let obj=response.obj;
       this.getCart();
       //this.cartOperation.next();
       this.router.navigate(['/orderDetail/'+obj._id]);
      }
    );
  }

  userRegister(userDetail:any)
  {
    this.http.post("http://localhost:8080/user/register",userDetail).subscribe(
      (response:any)=>{
        //console.log(response.obj._id);
      }
    )
  }

  userLogin(userDetail:any)
  {
    this.msg="";
    this.msgLoader.next();
    this.http.post("http://localhost:8080/user/login",userDetail).subscribe(
      (response:any)=>{
        if(response.isLoggedIn){
        console.log(response);
        this.activeUser=response.loginObj;
        this.userId=response.loginObj._id;
        this.isLoggedIn=response.isLoggedIn;
        this.isCustomer = true;

        this.userDataChanged.next();
        let userBasicInfo = {
          isLoggedIn : false,
          isCustomer : false,
          userId : ''
        }
        userBasicInfo.isLoggedIn = this.isLoggedIn;
        userBasicInfo.isCustomer = this.isCustomer;
        userBasicInfo.userId = this.userId;
        localStorage.setItem('userBasicInfo',JSON.stringify(userBasicInfo));
        //console.log(this.isLoggedIn);
       // console.log(response.loginObj._id);
       this.router.navigate(["home"]);}
       else{
        this.msg="wrong email or password";
        this.msgLoader.next();
       }
      }
    )
  }

  userLogout(){
    this.isLoggedIn = false;
    this.isCustomer = false;
    this.userId = '';
    localStorage.clear();
    this.userDataChanged.next();
  }

  autoUserLogin(){
    const userBasicInfo:{
      isLoggedIn : boolean,
      isCustomer : boolean,
      userId : any
    } = JSON.parse(localStorage.getItem('userBasicInfo'));
    if(!userBasicInfo){
      return;
    }
    this.isLoggedIn = userBasicInfo.isLoggedIn;
    this.isCustomer = userBasicInfo.isCustomer;
    this.userId = userBasicInfo.userId;
    this.http.get('http://localhost:8080/user/getparticularuser/'+this.userId)
    .subscribe((response:any) => {
      this.activeUser = response.obj;
      this.userDataChanged.next();
    })

  }

  userOrderHistory(){
    //console.log("order history");
    //console.log(this.userId);
    this.http.get('http://localhost:8080/user/order/'+this.userId).subscribe(
      (response:any)=>{
       // console.log(response);
        this.order=response.obj;
        //console.log(this.order);
        this.ordersFetched.next();
      }
    )}
    locationFilter(loc:string){
      this.http.get('http://localhost:8080/user/getallstores').subscribe(
        (response:any)=>{this.shop=response.responseArr;
                         this.category=this.shop.filter(shop=>shop.city.toLowerCase()==loc.toLowerCase());
                         this.location=loc;
                           this.dataFetched.next();
                        }
      );
    }
    searchfilter(name:string){

    }
    addReview(id:any,average:any,comment:any)
    {
      let review={
        'store_id':id,
        'user_id':this.userId,
        'name':this.activeUser.name,
        'comment':comment,
        'rating':average
      }
      this.http.post('http://localhost:8080/user/addreview',review).subscribe(
        (respone:any)=>{
        //  console.log(respone);
        }
      );
    }
    getReview(id:any)
    {
      this.http.get('http://localhost:8080/user/getreview/'+id).subscribe(
        (response:any)=>{
            this.review=response.obj;
            console.log(this.review);
            this.reviewFethched.next();
          }
      );
    }

    getStoreName(id:any)
    {
      this.http.get('http://localhost:8080/user/getstore/'+id).subscribe(
      (response:any)=>{
        this.storeName=response.obj.organizationName;
        // console.log(this.business);
        this.businessNameFetched.next();
       // return this.business;
      }
    );
    }
}
