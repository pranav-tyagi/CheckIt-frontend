import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';


@Component({
  selector: 'app-user-detail-form',
  templateUrl: './user-detail-form.component.html',
  styleUrls: ['./user-detail-form.component.scss']
})
export class UserDetailFormComponent implements OnInit {

  stage=0;
  constructor(private dataService:DataService) { }
  ngOnInit(){
    this.dataService.formStateLoader.subscribe(()=>{
      this.stage=this.dataService.formState;
    })

  }

}
