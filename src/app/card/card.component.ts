import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
@Input() item:any;
@Input() i:any;
state:number;
id:any;
employee:any;
rating=2.3;
  constructor() { }
  status=["safe","safe","unsafe","unsafe"];
  ngOnInit(): void {
    let percentage=(this.item.occupied/this.item.covidCapacity)*100;
    if(percentage>=0&& percentage<25){
      this.state=0;
    }else if(percentage>=25&& percentage<50){
      this.state=1;
  }else if(percentage>=50&& percentage<75){
    this.state=2;
  }else{
    this.state=3;
  }
  }
}
