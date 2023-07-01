import { Component,  OnInit,  ChangeDetectionStrategy,  ViewChild,  TemplateRef} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { AppService } from '../../app.component.service';
import { ToastrService } from 'ngx-toastr';
// import {  startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth,addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-admin-recruiter-profile',
  templateUrl: './admin-recruiter-profile.component.html',
  styleUrls: ['./admin-recruiter-profile.component.css']
})
export class AdminRecruiterProfileComponent implements OnInit {
 @ViewChild('blockModal', {static: true}) public conformationModal: ModalDirective;

	industries;
	jobCount=0;
	 userId ;
	 isBlock = false;
	 noDataJobs = true;
	 noDataS = true;
	 noDataH = true;
   	 data ;
	 userCTC="";
	 userName = "";
	 userEmail = "";
	 userContact = "";
	 profileImg = "";
	 userCompany = '';
	 userType = "";
	 userIndustry =[];
	 allJobs =[];
	 recruiterJobs =[];
	 sortedIndustryArray =[];
	 shortListCandidates =[];
	 shortListCandidatesCount = 0;
	 interviewedCandidates =[];
	 interviewedCandidatesCount = 0;
	 userIndustries =''
  constructor(
  	private modal: NgbModal,
    private route: ActivatedRoute,
    private appService:AppService,
    private toastr: ToastrService,
    private router: Router) {
  		this.getIndustries();
       this.route.params
          .subscribe(
           (params: Params) => {
          this.userId = params.id;})
        }

  ngOnInit() {
  		this.getAllJobs();
        this.getUserJobs(this.userId);
        this.getUserDetails(this.userId);
        this.getUserCandidates(this.userId);


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

   getIndustries(){
  	this.appService.getSuggestedIndustries()
     .subscribe(
        res => {
          this.industries=res.result;
          console.log(this.industries);
          return res;
        },
        err => {
          console.log("Error occured");
          return err;
        }
      );
 	 }

	setDetails(data){
		console.log(data);
		 this.userName = data.user_name;
       	 this.userEmail = data.email_id;
  	 	 this.userContact = data.mobile;
   	 	 this.profileImg = data.profile_pic;
   	 	 this.userType = data.type;
   	 	 this.userCTC = data.ctc_worked
   	 	 this.userIndustry = data.industry_expert
   	 	 this.setIndustries();
	}

	setIndustries(){
		if(this.userIndustry.length!==0){
			for(let i = 0; i<this.userIndustry.length ; i++){
				for(let j= 0 ; j<this.industries.length;j++){
					if(this.industries[j]._id === this.userIndustry[i]){
						this.sortedIndustryArray.push(this.industries[j].value);
					}
				}
			}
		}
		console.log(this.sortedIndustryArray);
		this.userIndustries = this.sortedIndustryArray.toString();
	}


	getUserJobs(id){
		 this.appService.getRecruiterJobsAdmin(id).subscribe((data)=>{
		 var resp = data.json();
		if(resp.responseCode ===200){
		 this.getJobsOfRecruiter(resp.result);}
		 },(err)=>{
		 	console.log(err);
		 })
	}

	checkJobs(){
		if(this.recruiterJobs.length>0){
		this.noDataJobs = false;
		}else{
		this.noDataJobs = true;
		}
	}
	checkShortListCandidates(){
		if(this.shortListCandidates.length>0){
		this.noDataS = false;
		}else{
		this.noDataS = true;
		}
	}
	checkInterviewedCandidates(){
		if(this.interviewedCandidates.length>0){
		this.noDataH= false;
		}else{
		this.noDataH = true;
		}
	}

	getUserCandidates(id){
  		this.appService.clientShortlistResumes(id).subscribe((data)=>{
  			console.log(data);
  			if(data.responseCode === 200){
  				this.manageUsers(data.result)

  			}else{
  				this.toastr.warning(data.responseMessage)
  			}
  		},(err)=>{
  			console.log(err);
  		})

	}

	manageUsers(data){
		if(data.length>0){
			for(let i = 0 ; i <data.length;i++){
				console.log(data[i])
				if(data[i].candidates.status=== '0'){
					this.shortListCandidates.push(data[i])
					this.shortListCandidatesCount++
					this.checkShortListCandidates();
				}
				if(data[i].candidates.status=== '4'){
					this.interviewedCandidates.push(data[i])
					this.interviewedCandidatesCount++
					this.checkInterviewedCandidates();
				}
			}
		}
	}
		blockPopup(){
		    this.conformationModal.show();
		  }

	getJobsOfRecruiter(data){
		if(data.length > 0){
			for(let i = 0 ; i < data.length ; i++){
				for(let j =0 ; j < this.allJobs.length ; j++){
					if(data[i] === this.allJobs[j]._id ){
						this.recruiterJobs.push(this.allJobs[j])
						this.jobCount++;
						this.checkJobs();

					}
				}
			}
		}
		console.log(this.recruiterJobs);

	}
	getAllJobs(){
		this.appService.getAllJobsListAdmin().subscribe((data)=>{
			 var resp = data.json();
			 this.allJobs = resp.result;
			 console.log(resp);
		},(err)=>{
			console.log(err);
		})
	}
	  checkBlockStatus(data){
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
}
