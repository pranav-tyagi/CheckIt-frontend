import { Component, Input, OnInit} from '@angular/core';
import { shop } from '../shop';
import {UserService} from '../user.service';
import { Subject } from 'rxjs';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  shopName:any=null;
  loading:number=0;
  shop:any;

  filter="place";

  constructor(private user:UserService) { }

  ngOnInit(): void {
    const navbar = document.querySelector('.filter');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('change', scrollY > 400)
    })
    this.user.fetchIndividual(this.filter);

      this.user.dataFetched.subscribe(
          ()=>{
            this.shop=this.user.category;
           console.log(this.shop)
          }
      );
    }

    setFilter(val){
      this.loading=1;
      this.filter=val;
      this.user.fetchIndividual(val);
      this.loading=0;
    }


  }
