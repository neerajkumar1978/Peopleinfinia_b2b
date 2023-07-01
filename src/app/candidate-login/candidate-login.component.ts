import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonFunctionsService } from '../sheared';
import { FormGroup, FormControl, Validators, NgControlStatus } from '@angular/forms';
import { AppService } from '../app.component.service';
import { ModalDirective } from 'ngx-bootstrap';
import {
  AuthService,
  SocialUser,
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';


@Component({
  selector: 'app-candidate-login',
  templateUrl: './candidate-login.component.html',
  styleUrls: ['./candidate-login.component.css']
})
export class CandidateLoginComponent implements OnInit {
  submitted = false;
  submitted1 = false;
  candidateLoginForm: FormGroup;
  LoginService: any;
  forgotPasswordForm: FormGroup;
  resetPasswordForm: any;
  empl = true;
  empl2 = false;

  Employer = true;
  result: any;
  forgotpassword = false;
  loginShow: boolean;
  LoginAccount: string;
  @ViewChild('userType', {static: true}) public modalI: ModalDirective;

  constructor(
    private router: Router,
    private service: AppService,
    private commanfunction: CommonFunctionsService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log("here");
    this.initForm();
  }

  initForm() {
    this.candidateLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.commanfunction.emailRegex)]),
      password: new FormControl('', [Validators.required])
    });
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.commanfunction.emailRegex)]),
    });
  }
  resetpasswordForm(){
    this.submitted1 = true;
    if(this.forgotPasswordForm.valid){
      this.forgotpassword = !this.forgotpassword;
      const control =this.forgotPasswordForm.controls;
      const user ={
        'email_id': control.email.value
      }
      console.log("user",user);

    this.service.forgotPassword(user).subscribe(data =>{
      console.log("response",data)
      if(data._body.responseCode == '200'){
        this.toastr.warning(data._body.responseMessage);
      }
      else {
        this.toastr.warning(data._body.responseMessage);
      }
    },
    (err) =>{
      console.log('candidateLoginSrvc error: ', err);
      this.toastr.warning(err._body);
    })
  }
  }
  onFormSubmit(): void {
    this.submitted = true;
    if (this.candidateLoginForm.valid) {
      const control = this.candidateLoginForm.controls;
      const user = {
        'email_id': control.email.value,
        'password': control.password.value
      };
      console.log(user);
      this.service.candidateLoginSrvc(user).subscribe(data => {
        console.log('From service: ', data);
        if (data.status === 200) {
          const res = JSON.parse(data._body);
          console.log('res: ', res);
          this.toastr.success(res.responseMessage);
          this.submitted = false;
          this.candidateLoginForm.reset();
          localStorage.setItem('loginSessId', JSON.stringify(res.result._id));
          localStorage.setItem('token', JSON.stringify(res.token));
          this.router.navigate(['/candidateHeader/dashboard']);
        } else {
          this.toastr.warning(data._body);
        }
      }, (err) => {
        console.log('candidateLoginSrvc error: ', err);
        this.toastr.warning(err._body);
      });
    }
  }
  register(){
    this.modalI.show();
  }
  signUpFresher() {
    localStorage.setItem('TypeUser', 'Fresher');
    this.modalI.hide();
    this.router.navigate ([ '/candidate/signup/personal'])
  }
  signUpProfessional() {
    localStorage.setItem('TypeUser', 'professional');
    this.modalI.hide();
    this.router.navigate ([ '/candidate/signup/personal'])
  }
  employerData(){
    this.Employer = true;
    this.empl = true;
    this.empl2 = false;

  }
  jobSeekerData(){
    this.Employer = false;
    this.empl2 = true;
    this.empl = false;

  }

  ForgotPassword() {
    this.forgotpassword = true;
  }

  signInWithGoogle() : void {
    console.log("server here");
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (details) => {
        console.log(details);
        this.service.candidateLoginWithGoogle(details).subscribe(data => {
          console.log('From service: ', data);
          if (data.status === 200) {
            const res = JSON.parse(data._body);
            console.log('res: ', res);
            this.toastr.success(res.responseMessage);
            this.submitted = false;
            this.candidateLoginForm.reset();
            localStorage.setItem('loginSessId', JSON.stringify(res.result._id));
            localStorage.setItem('token', JSON.stringify(res.token));
            this.router.navigate(['/candidateHeader/dashboard']);
          } else {
            this.toastr.warning(data._body);
          }
        }, (err) => {
          console.log('candidateLoginSrvc error: ', err);
          this.toastr.warning(err._body);
        });
      })


  }

  signInWithFB() : void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (details) => {
        this.service.candidateLoginWithFB(details).subscribe(data => {
          console.log('From service: ', data);
          if (data.status === 200) {
            const res = JSON.parse(data._body);
            console.log('res: ', res);
            this.toastr.success(res.responseMessage);
            this.submitted = false;
            this.candidateLoginForm.reset();
            localStorage.setItem('loginSessId', JSON.stringify(res.result._id));
            localStorage.setItem('token', JSON.stringify(res.token));
            this.router.navigate(['/candidateHeader/dashboard']);
          } else {
            this.toastr.warning(data._body);
          }
        }, (err) => {
          console.log('candidateLoginSrvc error: ', err);
          this.toastr.warning(err._body);
        });
      })

  }

}
