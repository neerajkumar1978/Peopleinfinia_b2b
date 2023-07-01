import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { HomeService } from '../home/home.component.service';
import { CommonFunctionsService } from '../sheared/index';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppService } from '../app.component.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
})
export class MainHeaderComponent implements OnInit, DoCheck {
  @ViewChild('consultModal', {static: true}) public modalR: ModalDirective;
  @ViewChild('clientModal', {static: true}) public modalC: ModalDirective;
  type: any;
  tab = 1;
  formVal = 1;
  companyButton = false;
  freelanceButton = false;
  institutionButton= false;
  signupSubmitted = false;
  signupSubmitted1 = false;
  signupSubmitted2 = false;
  company = false;
  freelance = false;
  institution = false;
  signUpFormCompany: FormGroup;
  signUpFormRecruiter: FormGroup;
  signUpForminstitution: FormGroup;
  windowurl = `${window.location.origin}/main/home`;
  ishomepage = false;

  constructor(
    private appService: AppService,
    private homeService: HomeService,
    private router: Router,
    private toastr: ToastrService,
    private commonFunctions: CommonFunctionsService
  ) {
    this.type = this.router.routerState.snapshot.url;

    console.log('this.type', this.type);
    if (this.type === '/main/login/company') {
       this.companyButton = true;
    }
    if (this.type === '/main/login/freelance') {
       this.freelanceButton = true;
    }
  
    if (this.type === '/main/login/institution') {

      this.institutionButton = true;
      
   }
    
  }

  ngOnInit() {
    this.initSignUpFormCompany();
    this.initSignUpFormRecruiter();
    this.initSignUpForminstitution();
  }
  goToHome(){
    console.log("home")
    window.open("https://peopleinfinia.com","_self");

  }
  onSignUpAsCompany() {
    this.signupSubmitted = true;
    // && this.captcha
    if (this.signUpFormCompany.valid) {
      var control = this.signUpFormCompany.controls;
      var form = {
        user_name: control.username.value,
        company_name: control.companyName.value,
        email_id: control.email.value,
        user_type: '0',
        mobile: control.contactNo.value,
        password: control.password.value,
      };
      this.homeService.signupClient(form).subscribe(
        objS => {
          var resMessage = objS.json();
          console.log(resMessage);
          if (resMessage['responseCode'] === 400) {
            console.log('Done');
            this.toastr.warning(resMessage['responseMessage']);
          } else {
            this.toastr.success('Please check your mail inbox');
            this.company = false;
            // this.router.navigate(['/recruiterHeader/recuiterDashboard']);
            // this.router.navigate(['/main/login']);
          }
        },
        objE => {
          console.log(objE);
        }
      );
    }
  }

  onSubmitSignUpFormRecruiter() {
    this.signupSubmitted1 = true;
    // && this.captcha
    if (this.signUpFormRecruiter.valid) {
      var control = this.signUpFormRecruiter.controls;
      var form = {
        user_name: control.username.value,
        type: control.user_type.value,
        email_id: control.email.value,
        user_type: '1',
        mobile: control.contactNo.value,
        password: control.password.value,
      };
      this.homeService.signupClient(form).subscribe(
        objS => {
          var resMessage = objS.json();
          if (resMessage['responseCode'] === 400) {
            let dataE=resMessage['responseMessage']
            this.toastr.warning(dataE);
          } else {
            console.log(objS);
            // this.modalR.hide();
            this.toastr.success('Please check your mail inbox');
            this.freelance = false;
            // this.signUpFormRecruiter.reset();
          }
        },
        objE => {
          console.log(objE);
        }
      );
    }
  }
  onSubmitSignUpForminstitution() {
    
    this.signupSubmitted2 = true;
    // && this.captcha
    if (this.signUpForminstitution.valid) {

      var control = this.signUpForminstitution.controls;
      var form = {
        regType:"institution",
        user_name: control.username.value,
        type: control.user_type.value,
        email_id: control.email.value,
        user_type: '1',
        institutionName: control.institutionName.value,
        mobile: control.contactNo.value,
        password: control.password.value,
      };
      this.homeService.signupClient(form).subscribe(
        objS => {
          var resMessage = objS.json();
          if (resMessage['responseCode'] === 400) {
            let dataE=resMessage['responseMessage']
            this.toastr.warning(dataE);
          } else {
            console.log(objS);
            // this.modalR.hide();
            this.toastr.success('Please check your mail inbox');
            this.institution = false;
            // this.signUpFormRecruiter.reset();
          }
        },
        objE => {
          console.log(objE);
        }
      );
    }

  }
  submittedF() {
    this.signupSubmitted = false;
    this.signupSubmitted1 = false;
    this.signupSubmitted2 = false;
    
  }
  initSignUpFormRecruiter() {
    this.signUpFormRecruiter = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(this.commonFunctions.fullNameRegex),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.commonFunctions.emailRegex),
      ]),
      contactNo: new FormControl('', [
        Validators.required,
        Validators.pattern(this.commonFunctions.contactRegex),
        Validators.minLength(7),
        Validators.maxLength(15),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      user_type: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }
  initSignUpForminstitution() {
    this.signUpForminstitution = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(this.commonFunctions.fullNameRegex),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.commonFunctions.emailRegex),
      ]),
      contactNo: new FormControl('', [
        Validators.required,
        Validators.pattern(this.commonFunctions.contactRegex),
        Validators.minLength(7),
        Validators.maxLength(15),
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      institutionName: new FormControl('', Validators.required),
      user_type: new FormControl(''),
      regType: new FormControl(''),
      
      confirmPassword: new FormControl('', Validators.required),
    });
  }
  initSignUpFormCompany() {
    this.signUpFormCompany = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(this.commonFunctions.fullNameRegex),
      ]),
      companyName: new FormControl('', [
        Validators.required,
        Validators.pattern(this.commonFunctions.fullNameRegex),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.commonFunctions.emailRegex),
      ]),
      contactNo: new FormControl('', [
        Validators.required,
        Validators.pattern(this.commonFunctions.contactRegex),
        Validators.minLength(7),
        Validators.maxLength(15),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  ngDoCheck() {
    const page_url = window.location.href;
    if (page_url == this.windowurl) {
      this.ishomepage = false;
    } else {
      this.ishomepage = true;
    }
  }

  openCompany() {
    this.freelance = false;
   
    this.institution = false;
    this.company = true;
  }

  openFreelance() {
    this.freelance = true;
    this.institution = false;

    this.company = false;
  }
  openinstitution(){
    this.freelance = false;
    this.company = false;
    this.institution = true;
    
  }
  closeThepopup() {
    this.company = false;
    this.freelance = false;
    this.institution = false;
  }
}
