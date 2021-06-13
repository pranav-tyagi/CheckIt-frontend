import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  stage=0;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.formStateLoader.subscribe(()=>{
      this.stage=this.dataService.formState;
      console.log(this.stage+" baaarrrr");
    })
  }

}
