import { Component, OnInit } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  control = new FormControl();
  streets: string[] = ['Delhi', 'Mumbai', 'Banglore', 'Uttar Pradesh'];
  filteredStreets: Observable<string[]>;
  searchLocation: string = '';
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  options: string[] = [
    'Restaurants',
    'Malls',
    'Government Offices',
    'Shops',
    'Hospitals',
  ];
  category: any;
  constructor(private userService: UserService, private router: Router) {}
  onClick(id: any) {
    this.router.navigate(['shop/' + id]);
  }
  ngOnInit(): void {
    this.userService.dataFetched.subscribe(() => {
      this.category = this.userService.category;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
      this.filteredStreets = this.control.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter2(value))
      );
    });
    //console.log(this.category);
    //console.log(this.streets);
    this.userService.fetchShops();
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.category.filter((option) =>
      option.organizationName.toLowerCase().includes(filterValue)
    );
  }
  searchEvent(event: any) {
    this.searchLocation = event.target.value;
  //  console.log(this.searchLocation);
    this.userService.locationFilter(this.searchLocation);
  }
  setName()
  {
    this.userService.fetchByName(this.myControl.value);
  }
  clickEvent(loc: any) {
    this.searchLocation = loc;
   // console.log(this.searchLocation);
    this.userService.locationFilter(this.searchLocation);
  }
  private _filter2(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter((street) =>
      this._normalizeValue(street).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
