import { Component, OnInit ,Input } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cart:any[]=[];
  total:any=0;
  id:any;
  items: any;
  business:any=null;
  address:any;
  activeUser:any=null;
  // items: any;
  constructor(private user:UserService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    // this.order=this.user.getCart();
    // console.log("here");
    // console.log(this.order + "here this is ");
    this.activatedRoute.params.subscribe(
      (params) => {
        this.id = params.id;
        //console.log(this.id);
        this.user.fetchItems(this.id);
      }
    )
    this.user.itemsFetched.subscribe(
      () => {
        this.items = this.user.items;
        this.user.getCart();
       // console.log(this.items);
      }
    )
    this.user.fetchBusinessById(this.id);
    this.user.businessFetched.subscribe(
      ()=>{
        this.business=this.user.business;
        this.address="https://www.google.com/maps/dir/?api=1&destination="+this.business.address;
      }
    );
    this.user.getCart();
    this.user.cartOperation.subscribe(
      ()=>{
        //console.log("here");
        this.total=this.user.returnTotal();
        this.activeUser=this.user.activeUser;
        console.log(this.activeUser);
        this.getcart();
      }
    );
  }

  // addIntoCart(id:any){
  //   // let item=this.items.filter(ele => ele._id==id);
  //   let item;
  //   for (let i=0;i<this.items.length;i++)
  //   {
  //     for(let j=0;j<this.items[i].itemArr.length;j++){
  //       if(this.items[i].itemArr[j]._id==id)
  //       {
  //         item =this.items[i].itemArr[j];
  //       }
  //     }
  //   }
  //   console.log(item);
  //   this.user.addCart(item);
  // }
  // removeFromCart(id:any){
  //   let item;
  //   for (let i=0;i<this.items.length;i++)
  //   {
  //     for(let j=0;j<this.items[i].itemArr.length;j++){
  //       if(this.items[i].itemArr[j]._id==id)
  //       {
  //         item =this.items[i].itemArr[j];
  //       }
  //     }
  //   }
  //   console.log(item);
  //   this.user.removeCart(item);


  // }
  addIntoCart(id:any){
    // let item=this.items.filter(ele => ele._id==id);
    let item;
    for (let i=0;i<this.items.length;i++)
    {
      for(let j=0;j<this.items[i].itemArr.length;j++){
        if(this.items[i].itemArr[j]._id==id)
        {
          item =this.items[i].itemArr[j];
        }
      }
    }
   // console.log(item);
    this.user.addCart(item);
  }
  removeFromCart(id:any){
    let item;
    for (let i=0;i<this.items.length;i++)
    {
      for(let j=0;j<this.items[i].itemArr.length;j++){
        if(this.items[i].itemArr[j]._id==id)
        {
          item =this.items[i].itemArr[j];
        }
      }
    }
   // console.log(item);
    this.user.removeCart(item);


  }

  getcart()
  {
    this.cart=this.user.returnCart();
   // console.log(this.cart);
  }
  orderDone()
  {
   // console.log(this.user.userId);
   // console.log(this.id);
  //  this.user.fetchBusinessById(this.id);
  //  this.user.businessFetched.subscribe(
  //    ()=>{

  //    }
  //  )
    let order={
      "user_id":this.user.userId,
      "store_id":this.id,
      "storeName":this.business.organizationName
    }
   // console.log(order);
    this.user.orderDone(order);
  }
}
