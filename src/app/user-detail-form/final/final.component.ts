import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit {

  formValues:any;
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.formValues={...this.dataService.formValues};
    delete this.formValues.password;
    console.log(this.formValues);
  }
  submitForm(){
    this.dataService.submitForm();

  }
  back(){
    this.dataService.formBack();
   }

}
