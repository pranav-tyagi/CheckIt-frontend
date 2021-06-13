import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { ActivatedRoute } from '@angular/router';
import {UserService} from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {
  id:any;
  business:any=null;
  shop:any;
  category:any;
  address:any;
  rating=2.8;

  
  stars: number[] = [1, 2, 3, 4, 5];
  average: any=null;
  isLoggedin: any=false;
  reviewForm:FormGroup;
  constructor(private router: Router,private activatedRoute:ActivatedRoute,private user:UserService){
    this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd){
           window.scrollTo(0,0);
        }
     });
 }

  ngOnInit(): void {
    const navbar = document.querySelector('.filter');
    console.log(navbar);
    // window.addEventListener('scroll', () => {
    //     navbar.classList.toggle('change', scrollY > 0)
    // })

    this.activatedRoute.params.subscribe(
      (params)=>{
        this.id= params.id;
        // console.log(this.id);
        this.user.fetchBusinessById(this.id);
      }
    );

    this.user.businessFetched.subscribe(
      ()=>{
        this.business=this.user.business;
        this.address="https://www.google.com/maps/dir/?api=1&destination="+this.business.address;
        this.category=this.business.type;
        this.user.fetchIndividual(this.category.toLowerCase());
        this.isLoggedin=this.user.isLoggedIn;
     //   console.log(this.isLoggedin);
         console.log(this.business);
      }
    );
    this.reviewForm=new FormGroup({rating:new FormControl(0),
      rating1:new FormControl(0),
      rating2:new FormControl(0),
      rating3:new FormControl(0),
      rating4:new FormControl(0),
      comment:new FormControl("No comment",Validators.required)});
    this.user.dataFetched.subscribe(
      ()=>{
          this.shop=this.user.category.slice(0,3);
      }
  );
  }
  countStar(star,control) {
    this.reviewForm.controls[control].setValue(star);
    this.average=(this.reviewForm.value.rating+this.reviewForm.value.rating1+this.reviewForm.value.rating2+this.reviewForm.value.rating3+this.reviewForm.value.rating4)/5;
   // console.log('Value of star', this.reviewForm.value);
   // console.log(this.average);
  }
  submitReview()
  {
    this.user.addReview(this.id,this.average,this.reviewForm.value.comment);
  }
}
