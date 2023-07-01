import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppService } from '../../app.component.service'
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-resume-admin',
  templateUrl: './view-resume-admin.component.html',
  styleUrls: ['./view-resume-admin.component.css']
})
export class ViewResumeAdminComponent implements OnInit {
  id;
	currentCandidate = 0; 
	ResumeList = [];
  Resume ;
  form={};
	candidateList = 0;
  jobId;
  candidateId;
  candidateName;
  ID
  CV;
  ShowButton=false;
  constructor(
  	private appService:AppService,
  	private route: ActivatedRoute,
    private _location: Location,
    private router: Router,
    private toastr: ToastrService) {  
 }

  ngOnInit() {
  	this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params.id;
          console.log(this.id)
          this.form = {
          	"job_id":params.id
          }
          this.getFeeds(this.form);
        });

	  }
    candidateEmailId:any; recruiterEmailId:any;job_titleGet:any;
getFeeds(form){
  console.log(form);
  this.ResumeList =[];

  // user_id 
     this.appService.getUsersOnJob(form).subscribe(async response => {
         this.Resume =JSON.parse(response['_body']);
         console.log("this.Resume ",this.Resume.result[0] );
         this.candidateEmailId = this.Resume.result[0].candidates['email']
         console.log("this.Resume candidates",this.Resume.result[0].candidates );
         console.log("this.Resume candidatesifd ",this.Resume.result[0].candidates['email'] );
         console.log("this.Resume candidatesifd ",this.Resume.result[0].candidates.email );
         console.log("this.Resume job_id",this.Resume.result[0].job_id );
         this.job_titleGet = this.Resume.result[0].job_id['job_title']
         console.log("this.Resume recruiter_id",this.Resume.result[0].recruiter_id );
         console.log("this.Resume recruiter_id",this.Resume.result[0].recruiter_id['_id'] );
         let recruitersDataId=this.Resume.result[0].recruiter_id['_id']
         this.ResumeList = this.Resume.result
          console.log(this.ResumeList)
         this.candidateList = this.ResumeList.length;
        //  '60db4f72af23fc0e63be3a96/60e9a596d3ef1046c9c11c4f'
        // this.Resume.result[0].job_id['_id'], recruitersDataId
         this.appService.getEditJobsDetails(this.Resume.result[0].job_id['_id'], recruitersDataId).subscribe(
          (data) => {
         let jobValues = data.result;
         console.log("jobValues",jobValues);
         
          }
         )
         this.appService.adminGetProfile(recruitersDataId).subscribe((Data)=>{
          var resp = Data.json();
          if(resp.responseCode === 200){
         
       let recruitersData=resp.result;
       this.recruiterEmailId = recruitersData.email_id
    
          console.log("recruitersd ",recruitersData)
          console.log("recruitersd",)
          }
         }) 
         this.getCandidate();
         // await this.getCandidate();
         // console.log("meaning full data",this.ResumeList);
    },(error)=>{
      	console.log(error);
          });

  
    };



getUserDetails(){
  console.log(this.candidateList);
  if(this.currentCandidate === this.candidateList-1){
    this.getFeeds(this.form);
     this.currentCandidate = 0;
    // this.getCandidate();
  }else{
    this.currentCandidate++;
    this.getCandidate()
  }
  
    // if(this.candidateList = this.currentCandidate+1){
    //    this.currentCandidate = 0;
    //    this.getFeeds(this.id);
    // //this.getCandidate();
    // }
    //   this.currentCandidate++; 
    //   this.getCandidate();
    }



 getCandidate(){
 	console.log(this.currentCandidate);
 
  this.candidateName = this.ResumeList[this.currentCandidate].candidates.name;
  this.CV = this.ResumeList[this.currentCandidate].candidates.cv;
  this.ID = this.ResumeList[this.currentCandidate]._id;
  console.log(this.candidateName,this.CV);
  this.jobId=this.ResumeList[this.currentCandidate].job_id;
  this.candidateId=this.ResumeList[this.currentCandidate].candidates._id;
  console.log(this.candidateId,this.jobId);
  if(this.ResumeList[this.currentCandidate].candidates.ey_shortlist){ this.ShowButton = false }
    else{this.ShowButton = true};
  }

 onShortList(){
  this.recruiterEmailId
  this.candidateEmailId
  var form  = 
  	{
  	"_id":this.ID,
  	"candidate_id":this.candidateId,
  	"recruiterEmailId":this.recruiterEmailId,
  	"candidateEmailId":this.candidateEmailId,
  	"job_title":this.job_titleGet,
    
  	}
  
  console.log('enterreeed in side short list');
  this.appService.shortListAdminCandidiate(form).subscribe((data)=>{
      console.log(data);
     this.getFeeds(this.form)
     this.currentCandidate = 0 ;
    this.toastr.success("Shortlisted");

    },(error)=>{
      console.log(error);
    })
   }
   onUndo(){
    var form  = 
      {
      "_id":this.ID,
      "candidate_id":this.candidateId,

      }
    
    console.log('enterreeed in side short list');
    this.appService.undoAdminCandidiate(form).subscribe((data)=>{
        console.log(data);
       this.getFeeds(this.form)
       this.currentCandidate = 0 ;
      this.toastr.warning("Unshortlisted");
  
      },(error)=>{
        console.log(error);
      })
     }
  //  onUndu(){
  //   var form  = 
  //     {
  //     "_id":this.ID,
  //     "candidate_id":this.candidateId
  //     }
    
  //   console.log('enterreeed in side short list');
  //   this.appService.shortListAdminCandidiate(form).subscribe((data)=>{
  //       console.log(data);
  //      this.getFeeds(this.form)
  //      this.currentCandidate = 0 ;
  //     this.toastr.success(data.responseMessage);
  
  //     },(error)=>{
  //       console.log(error);
  //     })
  //    }
  backClicked() {
    this._location.back();
  }
}
