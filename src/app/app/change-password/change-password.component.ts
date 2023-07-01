import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../app.component.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  changeSubmitted = false;
  showPassword: boolean;
  userID;

  constructor(
    private appService: AppService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.userID = localStorage.getItem('loginSessId');
  }

  ngOnInit() {
    this.initChangePassword();
  }

  /* get user(): any {
     let user = localStorage.getItem('loginSessId');
     // console.log(user)
     this.userID = user;
     if (user) {
       user = JSON.parse(user);
       return user;
     }

   }*/

  initChangePassword() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  onChangePassword() {
    this.changeSubmitted = true;
    const control = this.changePasswordForm.controls;
    if (this.changePasswordForm.valid && control.password.value == control.confirmPassword.value) {
      const form = {
        'oldPassword': control.oldPassword.value,
        'newPassword': control.password.value,
      };
      console.log(form);
      this.appService.changePassword(JSON.parse(this.userID), form).subscribe((data) => {
        this.toastr.success('Change Password Successfully');
        this.router.navigateByUrl(`/clientHeader/profile`);
        console.log(data);
      }, (err) => {
        this.toastr.success('Invalid Password');
        console.log(err);
      });
    }
  }


  goBack() {
    this.router.navigateByUrl(`/clientHeader/clientDashboard`);
  }
}
