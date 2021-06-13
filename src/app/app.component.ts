import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { UserService } from './user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'covid-app';
loading=0;
  constructor(private dataService : DataService,private userService : UserService){
  }
  ngOnInit(){
    this.dataService.autoLogin();

    this.dataService.loaderState.subscribe(()=>{
      this.loading=this.dataService.loader;
      console.log(this.loading);
    })

    this.userService.autoUserLogin();
  }
}
