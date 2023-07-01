import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonFunctionsService } from '../sheared/index';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import swal from 'sweetalert';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from './home.component.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('consultModal', {static: true}) public modalR: ModalDirective;
  @ViewChild('clientModal', {static: true}) public modalC: ModalDirective;
  @ViewChild('imageModal', {static: true}) public modalI: ModalDirective;
  public isUserAuthenticated;
  private loggedIn: boolean;
  modalRef: BsModalRef;
  public name;
  public company;
  public email;
  public mobile;
  public password;
  formVal = 1;
  signupSubmitted = false;
  signupSubmitted1 = false;
  signUpFormCompany: FormGroup;
  signUpFormRecruiter: FormGroup;
  public constructor(
    private router: Router,
    private homeService: HomeService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private commonFunctions: CommonFunctionsService
  ) {}

  ngOnInit() {
    this.initSignUpFormCompany();
    this.initSignUpFormRecruiter();
    // this.modalService.show(imageModal)
  }
  ngAfterViewInit() {
    // this.modalI.show();
  }
  gotoDetail(): void {
    this.router.navigate(['/recruiterHeader/recuiterDashboard']);
  }
  submittedF() {
    this.signupSubmitted = false;
    this.signupSubmitted1 = false;
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
            this.router.navigate(['/recruiterHeader/recuiterDashboard']);
            this.router.navigate(['/main/login']);
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
            console.log('Done');
            this.toastr.warning(resMessage['responseMessage']);
          } else {
            console.log(objS);
            this.modalR.hide();
            this.toastr.success('Please check your mail inbox');
            this.router.navigate(['/main/login']);

            this.signUpFormRecruiter.reset();
            this.signupSubmitted1 = false;
          }
        },
        objE => {
          console.log(objE);
        }
      );
    }
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

  initSignUpFormCompany() {
    // this.modalI.show();

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

  // consulatantsignUp():void{
  //    var user={}
  //     user['user_name']=this.name
  //     user['company_name']=this.company
  //     user['email_id']=this.email
  //     user['user_type']="1"
  //     user['mobile']=this.mobile
  //     user['password']=this.password
  //     console.log(user)
  //     this.homeService.signupClient(user).subscribe(objS=>{
  //       var resMessage = objS.json();
  //        console.log(objS);
  //       swal(resMessage.responseMessage).then((ok)=>{
  //         this.name='';
  //           this.company='';
  //           this.email='';
  //           this.mobile='';
  //           this.password='';
  //       });
  //     },objE=>{
  //       console.log(objE);
  //     })

  //   }
  // signUp():void{
  //     var user={}
  //     user['user_name']=this.name
  //     user['company_name']=this.company
  //     user['email_id']=this.email
  //     user['user_type']="0"
  //     user['mobile']=this.mobile
  //     user['password']= this.password
  //     console.log(user)
  //     this.homeService.signupClient(user).subscribe(objS=>{
  //       var resMessage = objS.json();
  //        console.log(objS);
  //       swal(resMessage.responseMessage).then((ok)=>{
  //           this.name='';
  //           this.company='';
  //           this.email='';
  //           this.mobile='';
  //           this.password='';
  //       });
  //     },objE=>{
  //       console.log(objE);
  //     })
  //   }
}
