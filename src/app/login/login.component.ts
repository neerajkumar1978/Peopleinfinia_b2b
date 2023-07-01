import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { CommonFunctionsService } from '../sheared/index';
import { AppService } from '../app.component.service';

import swal from 'sweetalert';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginShow = true;
  LoginAccount = "Login Account"
  result;
  formVal = 1;
  submitted = false;
  resetPasswordForm: FormGroup;
  loginForm: FormGroup;
  public email;
  public password;
  public constructor(
    private commonFunctions: CommonFunctionsService,
    private router: Router,
    private toaster: ToastrService,
    private appService: AppService,
    private LoginService: LoginService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  login(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      let control = this.loginForm.controls;
      var user = {
        'email_id': control.email.value,
        'password': control.password.value
      }
      // user[]=this.email
      // user['password']=this.password
      console.log(user)
      this.LoginService.loginClient(user).subscribe(objS => {
        var resMessage = JSON.parse(objS._body);
        console.log(resMessage);
        // resMessage.result.is_emailVerify
        if(resMessage.result.is_emailVerify == true){
          this.toaster.success(resMessage.responseMessage);
          localStorage.setItem('loginSessId', JSON.stringify(resMessage.result._id));
          localStorage.setItem('token', JSON.stringify(resMessage.token));
          localStorage.setItem('hasDoneSetup', resMessage && resMessage.result.gst_number ? "true" : "false");
          this.LoginService.changeSetupStatus(resMessage && resMessage.result.gst_number ? true : false);
          console.log(resMessage.token)
          if (resMessage.result.user_type == "0") {
            this.router.navigate(['/clientHeader/clientDashboard']);
          }
          else if (resMessage.result.user_type == "1") {
            if (resMessage.result.status === "pending") {
              this.router.navigate(['/recruiterProfile']);
            } else {
              this.router.navigate(['/recruiterHeader/recuiterDashboard']);
            }
          }
          // else if(resMessage.result.user_type == "2") {
          //   if (resMessage.result.status === "pending") {
          //     this.router.navigate(['/recruiterProfile']);
          //   } else {
          //     this.router.navigate(['/recruiterHeader/recuiterDashboard']);
          //   }
          // }
        }
     else{
      this.toaster.warning("Activate Your Account");

     }
      }, objE => {
        // console.log(objE)
        // console.log(objE['_body']);
        // console.log(objE._body)
        this.toaster.warning("Invalid Email or Password");
      })
    }
  }
  resetPassword() {
    this.submitted = true;
    if (this.resetPasswordForm.valid) {
      let control = this.resetPasswordForm.controls;
      var form = {
        "email_id": control.email.value
      }
      this.LoginService.resetPassword(form).subscribe((data) => {

        this.result = JSON.parse(data['_body']);
        console.log(this.result);
        if (this.result.responseCode === 400) {
          this.toaster.warning(this.result.responseMessage);
        }
        else if (this.result.responseCode === 200) {
          this.toaster.success(this.result.responseMessage);
          this.loginF();
        }

      }, (err) => {
        console.log(err);
      }
      )
    }
  }
  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.commonFunctions.emailRegex)
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
    this.resetPasswordForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.commonFunctions.emailRegex)
      ])
    })

  }
  passForm() {
    this.loginShow = false;
    this.submitted = false;
    this.LoginAccount = "Forget Password";
  }
  loginF() {
    this.loginShow = true;
    this.submitted = false;
    this.LoginAccount = "Login Account";
  }
}
