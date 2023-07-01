import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AppService } from '../app.component.service';
import { CommonFunctionsService } from '../sheared';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PostjobService } from '../post-new-job/postjob.service';

@Component({
  selector: 'app-candidate-dashboard',
  templateUrl: './candidate-dashboard.component.html',
  styleUrls: ['./candidate-dashboard.component.css']
})
export class CandidateDashboardComponent implements OnInit {
  progress_bar = 0;
  currentLocation = '';
  applicantName = '' ;
  applicantType = '';
  applicantDetails;
  applicantEmail = '';
  profilePicture = '';
  applicantMobile = '';
  candidateID;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private postjobService:PostjobService,
    private appService: AppService,
    private commanfunction: CommonFunctionsService,
    private toaster: ToastrService,

  ) {
    this.candidateID =  localStorage.getItem('loginSessId');

  }

  ngOnInit() {
    this.getDetails();

  }
  getDetails(){
    this.appService.getApplicantDetails(JSON.parse(this.candidateID)).subscribe((data) => {
      console.log("data Dashboard",data);
      this.applicantDetails = data;
      this.setDetails();
    }, (err) => {
      console.log(err);
    });
  }
  setDetails(){
    var bar =0, count =0;
    for (let [key, value] of Object.entries(this.applicantDetails)){
      if(value !== null && value !== Array){
        count = count+1;
        bar = bar + 2;
      }
    }
    if (bar >= 100)
      this.progress_bar = 100 ;
    else
    this.progress_bar = bar ;
    this.applicantName = this.applicantDetails.name;
    this.applicantEmail = this.applicantDetails.email_id;
    this.applicantMobile = this.applicantDetails.mobile;
    this.currentLocation = this.applicantDetails.current_location;
    this.applicantType = this.applicantDetails.type;
    this.profilePicture = this.applicantDetails.profile_pic;
    console.log("propfile",this.profilePicture);

  }
}
