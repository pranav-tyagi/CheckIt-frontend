import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orders = [];
  displayOrder=0;
  order:any;
  pendingOrders=[];
  acceptOrders=[];
  loading=0;
  id="";
  completeOrders=[];
  constructor(private http:HttpClient,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {

    this.activatedRoute.parent.params.subscribe((param)=>{
      this.id=param.id;
    })
    this.getTodaysOrders();


  }

  getTodaysOrders(){
    this.loading=1;
    this.http.get("http://localhost:8080/orderbydate/"+this.id).subscribe((response:any)=>{
      console.log(response);
      this.orders=response.obj;
      console.log(this.orders);
      this.sortOrders();
      this.loading=0;
    })
  }
  sortOrders(){

    for(let order of this.orders){
      if(order.status=="pending"){
        this.pendingOrders.push(order);
      }else if(order.status=="accept"){
        this.acceptOrders.push(order);
      }else if(order.status=="complete"){
        this.completeOrders.push(order);
      }
    }
    console.log(this.acceptOrders);
  }

  viewOrder(val){
    console.log("view order");
    this.order=val;
    this.displayOrder=1;
  }
  close(){
    this.displayOrder=0;
  }

  changeOrderStatus(selectedOrder,val){
    let obj={...selectedOrder,status:val};
    this.loading=1;
    console.log(obj);
    this.http.put("http://localhost:8080/order/"+selectedOrder._id,obj).subscribe((response:any)=>{
      console.log(response);
      this.acceptOrders=[];
      this.pendingOrders=[];
      this.completeOrders=[];
      this.getTodaysOrders();
      this.loading=0;
    })

  }
}
