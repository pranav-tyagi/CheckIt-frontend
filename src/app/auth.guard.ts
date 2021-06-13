import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree}
  from '@angular/router';
import { DataService } from './data.service';
import { take,map } from 'rxjs/operators';


@Injectable({ providedIn : 'root' })
export class AuthGuard implements CanActivate {
  constructor(private dataService : DataService,private router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
  | boolean
  | UrlTree
  | Promise<boolean | UrlTree>
  | Observable<boolean | UrlTree>{
    // if(this.dataService.token == '' && this.dataService.userId == ''){
    //   return false;
    // }else{
    //   return true;
    // }
    return this.dataService.changeStatusUpdate.pipe(
      take(1),
      map(()=>{
        if(this.dataService.token != '' && this.dataService.userId != ''){
          return true;
        }else{
          return this.router.createUrlTree(['/join']);
        }

      })
    )

  }
}
