import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  average: any=null;
  constructor(private activatedRoute:ActivatedRoute) { }

  reviewForm:FormGroup;
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params)=>{
      console.log(params);
    })
    this.reviewForm=new FormGroup({rating:new FormControl(0),
    rating1:new FormControl(0),
    rating2:new FormControl(0),
    rating3:new FormControl(0),
    rating4:new FormControl(0),
    comment:new FormControl(null)});
  }
  countStar(star,control) {
    this.reviewForm.controls[control].setValue(star);
    this.average=(this.reviewForm.value.rating+this.reviewForm.value.rating1+this.reviewForm.value.rating2+this.reviewForm.value.rating3+this.reviewForm.value.rating4)/25;
    console.log('Value of star', this.reviewForm.value);
    console.log(this.average);
  }

}
