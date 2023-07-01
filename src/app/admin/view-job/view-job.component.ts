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
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {
 jobId ;
 jobDetials;
 jobLocation: any;
 jobDeadline = '';
 jobctcMax = '';
 jobctcMin = "";
 jobExperiance = "" ;
 jobDescription = "" ;
 jobCompanyName = "";
 jobVancy = "" ;
 jobTitle= "";
 jobUG: any;
 doc= "";
 jobUGC = "";
 jobPG = "";
 jobPGC = "";
 ShowJD = false;
 constructor(
    private modal: NgbModal,
    private _location: Location,
    private route: ActivatedRoute,
    private appService:AppService,
    private toastr: ToastrService,
    private router: Router) {
       this.route.params
          .subscribe(
           (params: Params) => {
          this.jobId = params.id;})
        }

  ngOnInit() {
  	this.getJobDetails(this.jobId)
  }


  getJobDetails(id){
  this.appService.getSingleJobData(id).subscribe((data)=>{
  	console.log(data);
    this.setValues(data.result)
  },(err)=>{
  	console.log(err);
    })
	}

  setValues(data){
    if(data.doc != null ){
      this.doc = data.doc;
      this.ShowJD = true;
    }
     this.jobLocation = data.Location;
     this.jobDeadline = data.deadline;
     this.jobctcMax =  data.ctc_max;
     this.jobctcMin = data.ctc_min;
     this.jobExperiance = data.experience ;
     this.jobDescription = data.description;
     this.jobCompanyName = data.company_name;
     this.jobVancy =  data.vacancy;
     this.jobTitle= data.job_title;
     this.jobUG = data.ug_course;
     this.jobUGC = data.ug_college;
     this.jobPG = data.pg_course;
     this.jobPGC = data.pg_college;
  }
  backClicked() {
    this._location.back();
  }
  viewJD(){
    if(this.doc === ""){
      this.toastr.warning("Not available")
    }else{
    window.open(this.doc, "_blank");
    }
  }
}

