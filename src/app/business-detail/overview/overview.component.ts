import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  id:any;
  employee:any;
  business:any;

  constructor(private dataService:DataService, private activatedRoute: ActivatedRoute,private user:UserService) { }

  ngOnInit(): void {

    this.activatedRoute.parent.params.subscribe(
      (params) => {
        this.id = params.id;
       console.log(this.id);
      }
    )
    this.dataService.fetchEmployeeData(this.id);

      this.dataService.employeeFetched.subscribe(
          ()=>{
            this.employee=this.dataService.employee;
            //console.log(this.employee,"I am here");
          }
      );

          console.log("OVERVIEW")
          this.business=this.user.business;
           console.log(this.business);
  }
}
