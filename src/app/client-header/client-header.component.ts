import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {AppService} from '../app.component.service';
import {ToastrService} from 'ngx-toastr';
import * as socketIo from 'socket.io-client';
import {ChangePasswordComponent} from '../app/change-password/change-password.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent implements OnInit {
  changePasswordForm: FormGroup;
  changeSubmitted = false;
  showPassword: boolean;
  userID;
//toggle
  show = false;

  profilePicture: any;

  public constructor(
    private appService: AppService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private LoginService: LoginService
  ) {
  }
  hasDoneSetup:boolean;
  activeMenu = 1;

  ngDoCheck() {
    // this.LoginService.IsSetupDone.subscribe(IsSetupDone=>{
    //   this.hasDoneSetup = IsSetupDone;
    // })
    this.hasDoneSetup = JSON.parse(localStorage.getItem('hasDoneSetup'));
  }

  ngOnInit() {
    this.getDetails()
    this.initChangePassword();
    this.user();
    // cosnt socket = socketIo('http://103.118.158.168:11001')
    // socket.on('')
  }

 user(): any {
    var user = localStorage.getItem('loginSessId');
    //console.log(user)
    this.userID = user;
    if (user) {
      user = JSON.parse(user);
      console.log(user)
      return user;
    }

  }

  onChangePassword() {
    this.changeSubmitted = true;
    var control = this.changePasswordForm.controls;
    if (this.changePasswordForm.valid && control.password.value == control.confirmPassword.value) {
      var form = {
        'oldPassword': control.oldPassword.value,
        'newPassword': control.password.value,
      };
      console.log(form);
      this.appService.changePassword(JSON.parse(this.userID), form).subscribe((data) => {
        this.toastr.success('Change Password Successfully');
        console.log(data);
      }, (err) => {
        this.toastr.success('Invalid Password');
        console.log(err);
      });
    }
  }
  userD:any;UserActive:any;
getDetails(){
  let userId = localStorage.getItem("loginSessId")
  this.appService.recruiterProfile(JSON.parse(userId)).subscribe(
    (objS) => {
      var resp = objS.json();

      this.userD = resp.result;
      console.log("this.userD",this.userD);
      
      if(this.userD.status == "active"){
        this.UserActive = true;
      }else{
        this.UserActive = false;
      }
    },
    (objE) => {
      console.log(objE);
    }
  );
}
  //toggle
  togglefn() {
    this.show = !this.show;
    console.log(this.show);
  }

  logout() {
    localStorage.removeItem('loginSessId');
    localStorage.removeItem('token');
    window.location.href = 'https://peopleinfinia.com';
    // this.router.navigate(['/main/home']);

  }

  initChangePassword() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  mobileEditProfile() {
    this.router.navigate(['/clientHeader/profile']);
  }

  open() {
    this.modalService.open(ChangePasswordComponent).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    // modalRef.componentInstance.name = 'World';
  }
}
