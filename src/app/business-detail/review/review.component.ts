import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  id:any;
  review:any;
  constructor(private user:UserService,private activatedRoute: ActivatedRoute) {

   }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(
      (params) => {
        this.id = params.id;
       // console.log(this.id);
        this.user.fetchItems(this.id);
      }
    )
    this.user.getReview(this.id);
    this.user.reviewFethched.subscribe(
      ()=>{
        this.review=this.user.review;
        console.log(this.review);
      }
    );

  }

}
