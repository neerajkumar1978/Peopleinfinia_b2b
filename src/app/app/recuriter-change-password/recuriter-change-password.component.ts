import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppService} from '../../app.component.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-recuriter-change-password',
  templateUrl: './recuriter-change-password.component.html',
  styleUrls: ['./recuriter-change-password.component.css']
})
export class RecuriterChangePasswordComponent implements OnInit {

  activeHead = 1;
  changePasswordForm: FormGroup;
  changeSubmitted = false;
  // toggle
  show = false;
  user;

  constructor(private router: Router,
              private appService: AppService,
              private toastr: ToastrService) {
    this.user = localStorage.getItem('loginSessId');
  }

  ngOnInit() {
    this.initChangePassword();
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
      this.appService.changePassword(JSON.parse(this.user), form).subscribe((data) => {
        this.toastr.success('Change Password Successfully');
        console.log(data);
      }, (err) => {
        this.toastr.success('Invalid Password');
        console.log(err);
      });
    }
  }

  initChangePassword() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  goBack() {
    this.router.navigateByUrl(`/recruiterHeader/recuiterDashboard`);
  }

}
