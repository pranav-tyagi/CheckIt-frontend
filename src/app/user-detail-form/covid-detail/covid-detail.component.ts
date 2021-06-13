import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-covid-detail',
  templateUrl: './covid-detail.component.html',
  styleUrls: ['./covid-detail.component.scss']
})
export class CovidDetailComponent implements OnInit {

  constructor(private dataService:DataService) { }

  covidForm:FormGroup;
  ngOnInit(): void {

    this.covidForm=new FormGroup({
      capacity: new FormControl(null, [Validators.required]),
      safetyKit: new FormControl(false, Validators.required),
      temperatureCheck:new FormControl(false,Validators.required),
      sanitization: new FormControl(false, Validators.required),
      socialDistancingCheck: new FormControl(false,Validators.required),
      organizationCovidDesc: new FormControl(null),
    });
  }
  next(){
    this.dataService.formNext();
    console.log(this.covidForm.value);
    this.dataService.setForm(this.covidForm.value);

   }
   back(){
    this.dataService.formBack();
   }

}
