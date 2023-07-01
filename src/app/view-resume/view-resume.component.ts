import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppService } from '../app.component.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-resume',
  templateUrl: './view-resume.component.html',
  styleUrls: ['./view-resume.component.css']
})

export class ViewResumeComponent implements OnInit {
   	public userId:any;
	id;
	currentCandidate = 0; 
	ResumeList = [];
	candidateList = 0;
  jobId;
  candidateId;
  candidateName;
  eyShort;
  CV;
  ShowButton=false;
  constructor(
  	private appService:AppService,
  	private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {  
    this.userId = localStorage.getItem('loginSessId');
 }

  ngOnInit() {
  	this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params.id;
          console.log(this.id)
          this.getFeeds(this.id);
        });

	  }
getFeeds(jobId){
     this.appService.clientViewResumeOnDashBoard(jobId,JSON.parse(this.userId)).subscribe(async response => {
         console.log("response -----",response)
         this.ResumeList =response.result;
         this.candidateList = this.ResumeList.length;
         if(this.candidateList === 0){
            alert('No CV(resume) left')
            this.router.navigate(['/clientHeader/clientDashboard']);
          }else{
             await this.getCandidate();
            console.log("meaning full data",this.ResumeList);
          }
        
    },(error)=>{
      	console.log(error);
          });

       
    };



getUserDetails(){
  console.log(this.candidateList);
  if(this.candidateList === 0){
    alert('No CV(resume) left')
    this.router.navigate(['/clientHeader/clientDashboard']);
  }
  else if(this.currentCandidate === this.candidateList-1 && this.candidateList > 0){
    this.getFeeds(this.id);
     this.currentCandidate = 0;
     this.getCandidate();
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
  console.log(this.candidateName,this.CV);
  this.eyShort =  this.ResumeList[this.currentCandidate].candidates.ey_shortlist;
  this.jobId=this.ResumeList[this.currentCandidate].job_id;
  this.candidateId=this.ResumeList[this.currentCandidate].candidates._id;
  console.log(this.candidateId,this.jobId);
  if(this.ResumeList[this.currentCandidate].candidates.status === '0'){ this.ShowButton = true }
    else{this.ShowButton = false};
  }
 


 onShortList(status){
  if(status==="2"){this.ShowButton = false;
  this.getUserDetails()}
  if(status==="0"){this.ShowButton = true;}
  if(status==="5"){this.ShowButton = false;
  this.getUserDetails()}
  
  console.log('enterreeed in side short list');
  this.appService.clientShortListCandidate(status,this.ResumeList[this.currentCandidate].job_id,this.ResumeList[this.currentCandidate].candidates._id,JSON.parse(this.userId)).subscribe((data)=>{
      console.log(data);
     // alert("ShortListed Succesfully");
    this.toastr.success(data.responseMessage);

    },(error)=>{
      console.log(error);
    })
   }
}
