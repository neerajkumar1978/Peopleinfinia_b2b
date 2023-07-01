import { Component,  OnInit,  ChangeDetectionStrategy,  ViewChild,  TemplateRef} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { AppService } from '../../app.component.service';
import { ToastrService } from 'ngx-toastr';

import {Location} from '@angular/common';

// import {  startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth,addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
 @ViewChild('blockModal', {static: true}) public conformationModal: ModalDirective;

 userId;
 isCompany = false;
 data;

 allCandidates =[];
 shortListedCandidates = [];
 shorlistCandidatesCount = 0;
 hiredCandidates = [];
 hiredCandiditasCount = 0;
 interViewedCandidates = [];
 interViewedCandidatesCount = 0;
  noDataS = true;
 userName = "";
 userEmail = "";
 userContact = "";
 profileImg = "";
 userCompany = '';
 expiryDate = "";
 noDataJobs = false
 numberOfJobs = 0 ;
 userJobs = [];
 noDataI = false;
  noDataH = false;
 isBlock = false;

  constructor(
  	private modal: NgbModal,
    private route: ActivatedRoute,
    private appService:AppService,
    private toastr: ToastrService,
    private _location: Location,
    private router: Router) {
       this.route.params
          .subscribe(
           (params: Params) => {
          this.userId = params.id;})
        }

  ngOnInit() {
  	    this.getUserPostedJobs(this.userId);
        this.getUserDetails(this.userId);
        this.getUserCandidates(this.userId)
      }


  getUserDetails(id){
  	this.appService.adminGetProfile(id).subscribe((Data)=>{
       var resp = Data.json();
       if(resp.responseCode === 200){
       this.data = resp.result;
       this.checkBlockStatus(this.data);
       this.setDetails(this.data);
        }else{
          this.toastr.warning(resp.responseMessage);
        }
  	  },(err)=>{
  		console.log(err);
  	})
   }


  getUserPostedJobs(id){
    this.appService.adminUserClientJob(id).subscribe((Data)=>{
      if(Data.responseCode === 200){
      this.noDataJobs = false;
        this.manageUserJobs(Data.result)
      }else{
      this.noDataJobs = true;
        this.toastr.warning(Data.responseMessage);
      }
    },(err)=>{
      console.log(err);
    })
   }

   getUserCandidates(id){
    this.appService.getCandidateList(id).subscribe((Data)=>{
      if(Data.responseCode === 200){
        this.manageUsersCandidates(Data.result)
      }else{
        this.toastr.warning(Data.responseMessage);
      }
    },(err)=>{
      console.log(err)
    })
   }


  manageUserJobs(data){
    for(let i = 0 ; i < data.length ; i++){
    if(!data[i].draft_status){
        this.userJobs.push(data[i])
        this.numberOfJobs++;
      }
    }
    console.log(this.userJobs)
  }

  manageUsersCandidates(data){
    console.log(data);
    this.allCandidates = data;
    for(let i = 0 ; i< this.allCandidates.length ; i++){
        if(this.allCandidates[i].candidates.status === "0"){
          this.shorlistCandidatesCount++;
          this.shortListedCandidates.push(this.allCandidates[i]);
          this.checkShortListedCandidates();
        };
        if(this.allCandidates[i].candidates.status === "1"){
          this.interViewedCandidatesCount++;
          this.interViewedCandidates.push(this.allCandidates[i])
          this.checkInterViewedCandidates();
        };
        if(this.allCandidates[i].candidates.status === "4"){
          this.hiredCandiditasCount++;
          this.hiredCandidates.push(this.allCandidates[i])
          this.chechHieredCandidates();
        };
      }
  }
checkShortListedCandidates(){
  if(this.shortListedCandidates.length > 0){
  this.noDataS = false;
  }else{
  this.noDataS = true;
  }
}
checkInterViewedCandidates(){
   if(this.interViewedCandidates.length > 0){
  this.noDataI = false;
  }else{
  this.noDataI = true;
  }
}
chechHieredCandidates(){
 if(this.hiredCandidates.length > 0){
  this.noDataH = false;
  }else{
  this.noDataH = true;
  }
}
  setDetails(data){
    this.userName = data.user_name;
    this.userEmail = data.email_id;
    this.userContact = data.mobile;
    this.profileImg = data.profile_pic;
    this.userCompany = data.company_name;
    this.expiryDate = data.aggrement_end_date;
  }

  blockPopup(){
    this.conformationModal.show();
  }

  blockUser(value){
    console.log(value)
  let form = {
    "is_block" : value
  }
    this.appService.blockUserAdmin(this.userId,form).subscribe((data)=>{
      console.log(data);
      if(data.responseCode === 200){
        this.toastr.success("Change successfully")
        this.conformationModal.hide();
        this.checkBlockStatus(data.result);
      }else{
        this.toastr.warning(data.responseMessage);
      }
    },(err)=>{
      console.log(err);
    })
  }

  checkBlockStatus(data){
    console.log(data);
    if(data.is_block){
      this.isBlock = true;
    }else{
      this.isBlock = false;
    }
  }

  setCV(cv){
  console.log(cv);
      window.open(cv, "_blank");
  }
  backClicked() {
    this._location.back();
  }
}
