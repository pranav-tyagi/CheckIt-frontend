import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employee:any;
  loading:any=0;
  displayedColumns: string[] = ['id', 'name', 'address','temperature','number','edit','delete'];
  dataSource = new MatTableDataSource();

  // applyFilter(event: Event) {
  //   console.log(event);
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   // this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  employeeForm:FormGroup;
  temperatureForm:FormGroup;
  updateEmployee:FormGroup;
  updatedEmployeeDetails:any;
  id:string;
  constructor(private dataService:DataService ,  private activatedRoute: ActivatedRoute) { }
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
        console.log(this.employee);
        this.dataSource=new  MatTableDataSource(this.employee);
      }
    )
    this.employeeForm= new FormGroup({
      name: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      temperature:  new FormControl(null, [Validators.required])
    })
    this.temperatureForm=new FormGroup({
      number: new FormControl(null, [Validators.required]),
      temperature:  new FormControl(null, [Validators.required])
    })
    this.updateEmployee=new FormGroup({
      name: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      temperature:  new FormControl(null, [Validators.required])
    })
  }
  editEmployee(id:any){
     this.updatedEmployeeDetails=this.employee.filter(ele=>
      ele._id==id
    )
    this.updateEmployee=new FormGroup({
      name: new FormControl(this.updatedEmployeeDetails[0].name, [Validators.required]),
      number: new FormControl(this.updatedEmployeeDetails[0].phoneNumber, [Validators.required]),
      address: new FormControl(this.updatedEmployeeDetails[0].address, [Validators.required]),
      temperature:  new FormControl(this.updatedEmployeeDetails[0].temperature, [Validators.required])
    })
  }
  deleteEmployee(id:any){
    this.dataService.deleteEmployee(id,this.id);
  }
  updateTemperature(){
    this.loading=1;
    let updatedEmployee;
    updatedEmployee=this.employee.filter(ele=>
      ele.phoneNumber==this.temperatureForm.value.number
    )
    updatedEmployee[0].temperature=this.temperatureForm.value.temperature;
    this.dataService.updateEmployee(updatedEmployee[0],updatedEmployee[0]._id,this.id);
    console.log(this.temperatureForm.value.number);
    console.log(updatedEmployee);
    this.loading=0;
  }
  onSubmit(){
    this.loading=1;
    console.log(this.employeeForm.value);
    this.dataService.addEmployee(this.employeeForm.value,this.id);
    this.loading=0;
  }
  onUpdateEmployee(empId){
    this.loading=1;
    this.updatedEmployeeDetails[0].name=this.updateEmployee.value.name;
    this.updatedEmployeeDetails[0].phoneNumber=this.updateEmployee.value.number;
    this.updatedEmployeeDetails[0].address=this.updateEmployee.value.address;
    this.updatedEmployeeDetails[0].temperature=this.updateEmployee.value.temperature;
    console.log(this.updatedEmployeeDetails[0]);

    this.dataService.updateEmployee(this.updatedEmployeeDetails[0],empId,this.id);
    this.loading=0;
  }
}
