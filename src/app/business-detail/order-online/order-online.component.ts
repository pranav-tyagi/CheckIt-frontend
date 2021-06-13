import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-order-online',
  templateUrl: './order-online.component.html',
  styleUrls: ['./order-online.component.scss']
})
export class OrderOnlineComponent implements OnInit {

  category: any = ["Recommended", "Veg Starter", "Veg Biriyani", "Sea Food Starter", "Non-Veg Starter",
    "Non-Veg Biriyani", "Non-Veg Curries"];
  id: any;
  select: any = 0;
  items: any=null;
  total: any = 0;
  isLoggedIn:any=false;
  //cart_item:{id:any,item:string,price:number,quantity:number};
  //cart: { id: any, item: string, price: number, quantity: number, amount:number }[] = [];
  cart:any[]=[];
  constructor(private user: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(
      (params) => {
        console.log(params);
        this.id = params.id;
       // console.log(this.id);
        this.user.fetchItems(this.id);
      }
    )
    this.user.itemsFetched.subscribe(
      () => {
        this.items = this.user.items;
        this.isLoggedIn=this.user.isLoggedIn;
        if(this.isLoggedIn==true)
        {
        this.user.getCart();
        }
       // console.log(this.items);
      }
    )

    this.user.cartOperation.subscribe(
      ()=>{
        console.log("here");
        this.total=this.user.returnTotal();
        this.isLoggedIn=this.user.isLoggedIn;
        console.log(this.user.isLoggedIn);
       // console.log(this.total);
        this.getcart();
      }
    );
  }

  scroll(el: any, i: any) {
   // console.log(el);
    let x = document.getElementById(el);
    // console.log(x);
    x.scrollIntoView(true);
    var scrolledY = window.scrollY;
    //console.log(scrolledY);
    if (scrolledY) {
      window.scroll(0, scrolledY - 100);
    }
    this.select = i;
   // console.log(this.select);
    this.isScrolledIntoView(el);
  }

  isScrolledIntoView(el: any) {
    let x = document.getElementById(el);
   // console.log(x);
    var rect = x.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    //var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
   // console.log(isVisible);
    return isVisible;
  }

  // addIntoCart(id: any, name: any, price: any, quantity: any) {
    //console.log("called");
    // let flag = 0;
    // let item = {
    //   "id": id,
    //   "item": name,
    //   "price": price,
    //   "quantity": quantity,
    //   "amount": price*quantity
    // }
    // this.cart.forEach(function (value) {
    //   if (value.id == id) {
    //     value.quantity = value.quantity + 1;
    //     value.amount = price * value.quantity;
    //     flag = 1;
    //   }
    // })
    // if (flag == 0) {
      // this.cart.push(item);
    // }

    // this.total = this.total + price;
    //console.log(this.cart);
  // }
  // removeByOne(index:any)
  // {
  //   if(this.cart[index].quantity>1)
  //   {
  //     this.cart[index].quantity=this.cart[index].quantity-1;
  //    this.cart[index].amount = this.cart[index].price * this.cart[index].quantity;
  //     //this.cart[index].price=this.cart[index].quantity;
  //     this.total=this.total-this.cart[index].price;
  //   }
  //   else{
  //     this.total=this.total-this.cart[index].amount;
  //     this.cart.splice(index,1);
  //   }
  // }
  // addByOne(index:any)
  // {
  //     this.cart[index].quantity=this.cart[index].quantity+1;
  //     this.cart[index].amount = this.cart[index].price * this.cart[index].quantity;
  //     this.total=this.total+this.cart[index].price;
  //     console.log("called");
  // }
  // getCart()
  // {
  //   this.user.setCart(this.cart);
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
}
