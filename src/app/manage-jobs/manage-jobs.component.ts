import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageJobsService } from './manage-jobs.service';
import { AppService } from '../app.component.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef, NgbModalOptions, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.css']
})
export class ManageJobsComponent implements OnInit {
@ViewChild('verify', {static: true}) public modal: ModalDirective;

modelRef: NgbModalRef;
  public userId: any;
  jobs = [] ;

  jobIdDelete;
  noData = false;
  public updatedJob: any;
  savedJob = [];
  ActiveJob = [];
  page = 1;
  ShowPagination = false;
  selectedJobsArray = [];
  lengthCA;
  constructor(
  	public manageJobsService: ManageJobsService,
  	private modalService: NgbModal,
    private appService: AppService,
    private router: Router,
    private toastr: ToastrService
  	) {

  	this.userId = localStorage.getItem('loginSessId');
   }
  ngOnInit() {
    this.jobs = [];
    this.savedJob = [];
    this.ActiveJob = [];
    this.selectedJobsArray = [];
  	this.getJobs();
  }
setId(id) {
  this.jobIdDelete = id;
  console.log(this.jobIdDelete);
}
CheckJob(id) {
  console.log(id);
  this.appService.checkJobStatus(id).subscribe((data) => {
    console.log(data);
    if (data.responseMessage === 'Active') {
      this.toastr.warning('Your job is active you can\'t edit it.');
    }
    if (data.responseMessage === 'Not Activated') {
      this.router.navigate(['/clientHeader/edit-jobs/' + id]);
    }
  }, (err) => {
    console.log(err);
  });
  // routerLink="/clientHeader/edit-jobs/{{job._id}}",
}
  getJobs() {
  	 this.manageJobsService.manageJob(JSON.parse(this.userId))
	     .subscribe(
        res => {
	        if (res.responseCode === 204) {
           this.noData = true;
          } else {
            this.jobs = res.result;
            this.lengthCA = this.jobs.length;
            // console.log(this.lengthCA)
            for (let i = 0 ; i < this.lengthCA ; i++) {
              // console.log(i)
              if (this.jobs[i].draft_status)this.savedJob.push(this.jobs[i]);
              if (!this.jobs[i].draft_status)this.ActiveJob.push(this.jobs[i]);
            }
              console.log('res-----', this.jobs);
           // console.log(this.jobs.job_id)
            return res;
           }
	        },
	        err => {
	          console.log('Error occured');
	          return err;
	        }
	  );
       this.selectedJobsArray = this.ActiveJob;
       if (this.ActiveJob.length > 12 ) this.ShowPagination = true;
  }
  switchAArray() {
    console.log(this.ActiveJob);
    this.selectedJobsArray = this.ActiveJob;
    console.log(this.selectedJobsArray);
  }
  switchSArray() {
        console.log(this.savedJob);
    this.selectedJobsArray = this.savedJob;
    console.log(this.selectedJobsArray);
  }
  public changeStatus(status) {
  	console.log(status);
  		this.manageJobsService.updateJobStatus(this.jobIdDelete, status)
	     .subscribe(
	        res => {
	          this.updatedJob = res.result;
            this.ngOnInit();
             this.toastr.success('Deleted successfully');
	          this.modal.hide();
            return res;

	        },
	        err => {
	          console.log('Error occured');
	          return err;
	        }
	    );
  }
  open(content, modalName) {
  	console.log(modalName);
  	console.log('inside modal');
this.modelRef = this.modalService.open(content, { windowClass: ' org-modal', size: 'sm' }); }
submittedF() {

}
// getJobDetails(jobId){
// 	console.log(jobId);
// 	this.appService.getSingleJobDetails(jobId, JSON.parse(userId)).subscribe((data)=>{
// 		console.log(data);
// 	})
// 	}
}
