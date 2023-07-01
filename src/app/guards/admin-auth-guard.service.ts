import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Router, NavigationEnd} from '@angular/router';
import {Location} from "@angular/common";
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(public router: Router, public location: Location,public route: ActivatedRoute) {
  }

  canActivate() {
    let token = localStorage.getItem('loginSessId');
    var route = this.location.path().split('/');
    if (token) {
        //var obj = JSON.parse(token);
       // if(obj.Role == "Admin")

            return true;
        
        // else{
        //     this.router.navigate(['/main/login']);
        // }
    }
    else {
      this.router.navigate(['/main/login']);
      return false;
    }
  }
}
