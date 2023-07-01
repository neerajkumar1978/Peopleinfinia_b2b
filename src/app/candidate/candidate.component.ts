import { Component, OnInit, DoCheck } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})

export class CandidateComponent implements OnInit, DoCheck {
  isUserLoggedIn = false;
  registerLogin = true;
  constructor(
    private router: Router
  ) { }

    ngDoCheck(){
    if( this.router.url == '/candidate/login')   
      this.registerLogin = true;
     else
      this.registerLogin = false;
      
    }
    ngOnInit() {
      // if(this.router.url == '/candidate/login')
      // {
      //   this.registerLogin2 = false;
      //  this.registerLogin = true;
      // }
      // else
      // this.registerLogin = false;
      // this.registerLogin2 = true;
    //   const loginSessId = localStorage.getItem('loginSessId');
    // console.log('header loginSessId:', loginSessId);
    // if (loginSessId) {
    //   this.isUserLoggedIn = true;
    // }
    }

  // logout() {
  //   this.isUserLoggedIn = false;
  //   localStorage.removeItem('loginSessId');
  //   localStorage.removeItem('token');
  //   this.router.navigate(['/candidate/login']);
  // }

}
