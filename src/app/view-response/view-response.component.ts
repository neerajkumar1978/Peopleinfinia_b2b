import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.component.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-response',
  templateUrl: './view-response.component.html',
  styleUrls: ['./view-response.component.css']
})
export class ViewResponseComponent implements OnInit {
showPop = false;
showFilter = false;
id;
userId;
allCandidates = [];
shortListed = [];
activeCandi = [];
selectedArray = [];
scheduleInteview = false;
jobDetails = [];
jobinfo;
  constructor(
  	private appService: AppService,
  	private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
    this.userId = localStorage.getItem('loginSessId');
	}

  ngOnInit()  {
  	this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params.id;
          this.getJobsDetails(this.id); }
      );
  }
getJobsDetails(jobId) {
  this.allCandidates = [];
this.shortListed = [];
this.activeCandi = [];
this.jobDetails = [];
this.selectedArray = [];
this.appService.getSingleJobDetails(JSON.parse(this.userId), jobId).subscribe((data) => {
console.log(data);
      this.jobDetails = data.result;
      this.jobinfo = this.jobDetails[0].job_id[0];
      this.allCandidates =  this.jobDetails[0].candidates;
      this.sortShortlistedCand();
}, (error) => {
console.log(error);
});
}
showAllActive() {
    console.log('active');
    this.selectedArray = this.activeCandi;
    console.log(this.activeCandi);
        this.scheduleInteview = false;

  }
showShortlisted() {
    console.log('shortlisted');
     this.scheduleInteview = true;
     console.log(this.shortListed);
    this.selectedArray = this.shortListed;
  }
sortShortlistedCand() {
    for (let i = 0 ; i < this.allCandidates.length ; i++ ) {
      if (this.allCandidates[i].status === '0') {this.shortListed.push(this.allCandidates[i]); }
      if (this.allCandidates[i].status === 'active') {this.activeCandi.push(this.allCandidates[i]); }
    }
    this.selectedArray = this.activeCandi;
  }
onShortList(id) {
  this.appService.clientShortListCandidate('0', this.jobinfo._id, id, JSON.parse(this.userId)).subscribe((data) => {
      console.log(data);
     // alert("ShortListed Succesfully");
    this.toastr.success(data.responseMessage);
  this.getJobsDetails(this.id);
    }, (error) => {
      console.log(error);
    });
    this.getJobsDetails;
  }
setCV(cv) {
  if (cv === null) {
    this.toastr.warning('CV is not uploaded');
  } else {
    window.open(cv, '_blank');
   }
  }
}
