import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userId="";
  user:any;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.userId=this.dataService.userId;
    this.user = this.dataService.user;
    this.dataService.changeStatusUpdate.subscribe(() => {
      this.user = this.dataService.user;
     // console.log(this.user);
    });

  }

}
