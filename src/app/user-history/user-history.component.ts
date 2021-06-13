import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {UserService} from '../user.service';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit {
  orders:any;
  storeName:any;

  image:any="../../assets/restaurant.jpg";
  // orders:any=[{product:"Milk+1 more item",name:"Kumar Traders",id:"12345",status:"Processing",total:"50",payment:"UPI",number:1234567890,image:"../../assets/office2.jpg"},
  // {product:"Pizza+2 more item",name:"Kfc",id:"2456",type:"Farm House",status:"Packed",total:"200",image:"../../assets/restaurant.jpg"},
  // {product:"Vitamin-C+3 more item",name:"RK medical Store",id:"98990",type:"Tablets",status:"Cancelled",total:"500",image:"../../assets/office1.jpg"}];
  constructor(private router: Router,private user:UserService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
         window.scrollTo(0,0);
      }
   });
  }

  ngOnInit(): void {
    this.user.userOrderHistory();
   this.user.ordersFetched.subscribe(()=>{
     this.orders=this.user.order;
     console.log(this.orders);
   }
   )
}

showDeatil(id){
  this.router.navigate(['/orderDetail/'+id]);
}
}


