import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.component.service';
import { CommonFunctionsService } from '../sheared';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-candidate-signup-personal',
  templateUrl: './candidate-signup-personal.component.html',
  styleUrls: ['./candidate-signup-personal.component.css']
})

export class CandidateSignupPersonalComponent implements OnInit {
  signupPersonalForm: FormGroup;
  @ViewChild('userType', {static: true}) public modalI: ModalDirective;

  fileError = false;
  fileArray = [];
  fileName: any;
  typeImage: any;
  base64textString: string;
  doc: any;
  showJDFile: boolean;
  submitted = false;
  courses ;
  type;
  terms = false;
  file = 'Enter your CV' ;
  fresher = true;
  showJD: any;
  _sanitizer: any;
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';

  constructor(
    private router: Router,
    private service: AppService,
    private commanfunction: CommonFunctionsService,
    private toaster: ToastrService
  ) { }

  // ngAfterViewInit() {
  // }
  ngOnInit() {
    this.initForm();
    this.userTypeFind(localStorage.getItem('TypeUser'));
  }

  userTypeFind(userType) {
    this.type = userType;
    if (userType === 'Fresher') {
          this.fresher = true;
    } else {
      this.fresher = false;
    }
  }
  initForm() {
    this.signupPersonalForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('fresher'),
      email_id: new FormControl('', [Validators.required, Validators.pattern(this.commanfunction.emailRegex)]),
      password: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required ),
      current_location: new FormControl('', Validators.required),
      cv: new FormControl('', Validators.required),
      terms: new FormControl(false, Validators.required)
    });
  }

  onFormSubmit() {
    this.submitted = true;
    console.log(this.signupPersonalForm.controls);
    console.log(this.signupPersonalForm.valid);
    if (this.signupPersonalForm.valid && this.signupPersonalForm.controls.terms.value) {
      const control = this.signupPersonalForm.controls;
      const formData = {
        name: control.name.value,
        type: this.type,
        email_id: control.email_id.value,
        password: control.password.value,
        mobile: control.mobile.value,
        current_location: control.current_location.value,
        cv: control.cv.value
      };
      console.log("cv",formData.cv);
      this.service.candidateSignupSrvc(formData).subscribe((data: any) => {
        console.log('From service: ', data);
        if (data.status === 200) {
          const res = JSON.parse(data._body);
          console.log('res: ', res);
          this.toaster.success('You have successfully registered with PeopleInfinia. Provide further details to create your Profile');
          this.submitted = false;
          this.signupPersonalForm.reset();
          localStorage.setItem('loginSessId', JSON.stringify(res.result._id));
          localStorage.setItem('token', JSON.stringify(res.token));
          if (this.fresher) {
           this.router.navigate(['/candidateHeader/signup/education/' + res.result._id]);
          } else {
            this.router.navigate(['/candidateHeader/signup/employment/' + res.result._id]);
          }
        } else {
          this.toaster.warning(data._body);
        }
      }, (err) => {
        console.log('candidateSignupSrvc error: ', err);
        this.toaster.error(err._body);
      });
    }
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files[0];
      this.file = files.name;
      console.log('file: ', files);
      reader.readAsDataURL(files);
      reader.onload = () => {
        this.signupPersonalForm.get('cv').setValue({
          filename: files.name,
          filetype: files.type,
          value: (<string>reader.result).split(',')[1]
        });
      };
    }
  }
  iftermsFalse(){
    console.log(this.terms);
  }
  checkbokClicked(){
    this.signupPersonalForm.patchValue({
      terms: !this.signupPersonalForm.controls.terms.value
    });
  }
  checkTerms() {
    this.terms = this.signupPersonalForm.controls.terms.value;
  }
}
