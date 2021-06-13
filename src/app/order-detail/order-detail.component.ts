import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import * as io from 'socket.io-client';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  socket : any;
  constructor(private http:HttpClient,private activatedRoute:ActivatedRoute) {
    // this.socket = io('http://localhost:8080',{ transports : ['websocket'] });
  }
  stick=false;
  items=[];
  order:any;
  orderId="";
  loading=0;
  storeId="";
  store:any;
  ngOnInit(): void {
    // console.log(io);
    // this.socket = io('http://localhost:8080');
    window.addEventListener('scroll', () => {
       if(scrollY>30){
         this.stick=true;
       }else{
         this.stick=false;
       }
    })

    this.activatedRoute.params.subscribe((params)=>{
      this.orderId=params.orderId;
      console.log(params.orderId)
      this.getOrderById();
      this.socket.on('hello',(data)=>{
        console.log(data);
      })
      // this.socket.emit('join',`order_${this.orderId}`);
    })
  }

  getOrderById(){
    this.loading=1;
    this.http.get('http://localhost:8080/orderbyid/'+this.orderId)
    .subscribe((response:any) => {
      console.log(response);
      let obj=response.obj
      this.items=obj.orderedItems;
      this.order=obj;
      this.storeId=obj.store_id;
      this.getStoreById();
      this.loading=0;
    })
  }
  getStoreById(){
  this.loading=1;
    this.http.get('http://localhost:8080/user/getstore/'+this.storeId)
    .subscribe((response:any) => {
      console.log(response);
      this.store=response.obj;
      this.loading=0;
    })
  }

}
