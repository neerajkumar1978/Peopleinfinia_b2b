import { Component, OnInit, ViewChild,  ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.component.service';

@Component({
  selector: 'app-candidate-header',
  templateUrl: './candidate-header.component.html',
  styleUrls: ['./candidate-header.component.css']
})
export class CandidateHeaderComponent implements OnInit {
  showHide = true;
    @ViewChild('cp', {static: true}) cp: NgForm;
    // hideShowPopup = true;
    userpass = {
    oldPassword: '',
    newPassword: ''
  }
  profilePicture ='https://cdn2.vectorstock.com/i/thumbs/23/81/default-avatar-profile-icon-vector-18942381.jpg';
  isUserLoggedIn = false;
  constructor(
    private router: Router,
    private toaster: ToastrService,
    private service: AppService
  ) {}
    ngOnInit() {
      const loginSessId = localStorage.getItem('loginSessId');
    console.log('header loginSessId:', loginSessId);
    if (loginSessId) {
      this.isUserLoggedIn = true;
    }

    }

 onChangePassword(event) {
    console.log('changepassword',event);
    this.userpass.oldPassword = this.cp.value.oPassword;
    this.userpass.newPassword = this.cp.value.nPassword;
    let id = localStorage.getItem('loginSessId');
    id = JSON.parse(id);
    if (this.cp.value.nPassword == this.cp.value.nCPassword) {
      this.service.getChangePassword(this.userpass,id).subscribe(
        (response: any) => {
          console.log('this is response', response);
          let msg = JSON.parse(response._body)
          if(msg.responseCode == '200') {
            this.toaster.success(msg.responseMessage);
            var el = document.getElementsByClassName('toast');
            console.log("el",el);
          } else {
          this.toaster.warning(msg.responseMessage);
          }
        },
        (error) => {
          console.log('this is error', error);
          this.toaster.warning('Try Later');
        }
      )
    } else {
     this.toaster.warning('Password Doesn\'t Match.');
    }

  }


  logout() {
    this.isUserLoggedIn = false;
    localStorage.removeItem('loginSessId');
    localStorage.removeItem('token');
    window.location.href = 'https://peopleinfinia.com';
    // this.router.navigate(['/candidate/login']);
  }
  // showDiv(){
  //   this.showHide = !this.showHide;
  // }

}
