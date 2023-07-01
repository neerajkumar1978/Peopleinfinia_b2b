import { Component, OnInit ,ViewChild} from '@angular/core';
import { AppService } from '../app.component.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
    @ViewChild('withdrawModal', {static: true}) public modalWithdraw: ModalDirective;

activeTab=1;
userId;
userList;
jobID='';
CandidateID='';
//noData= false
candidatesList=[];
shortListed = [];
onHold = [];
page = 1
ShowPagination = false;
page1 = 1
ShowPagination1 = false;
page2 = 1
ShowPagination2 = false;
page3 = 1
ShowPagination3 = false;
interviewed = [];
hired = [];
noData = false ;
noDataS = false;
noDataI = false;
noDataO = false;
noDataH = false ;
constructor(
  	    private appService:AppService,
        private toastr: ToastrService) {
        this.userId = localStorage.getItem('loginSessId');
      }

ngOnInit() {
  	this.getUserList(this.userId);
  }

setUsers(){
  	//console.log(status);
  	//this.candidatesList = [];
    if(!this.noData){
  	for(let i = 0 ; i< this.userList.length ; i++){
      if(this.userList[i].candidates.status === "0"){this.shortListed.push(this.userList[i]);
        if(this.shortListed.length>12)this.ShowPagination = true };
      if(this.userList[i].candidates.status === "1"){this.interviewed.push(this.userList[i]) ;
            if(this.interviewed.length>12)this.ShowPagination1 = true };
      if(this.userList[i].candidates.status === "2"){this.onHold.push(this.userList[i]) ;
        if(this.onHold.length>12)this.ShowPagination2 = true };
      if(this.userList[i].candidates.status === "4"){this.hired.push(this.userList[i]) ;
        if(this.hired.length>12)this.ShowPagination3 = true };}
  }
    if(this.shortListed.length === 0)this.noDataS = true;
    if(this.interviewed.length === 0)this.noDataI = true;
    if(this.onHold.length === 0)this.noDataO = true;
    if(this.hired.length === 0)this.noDataH = true;

  	//console.log(this.candidatesList);
  }
getUserList(id){
  this.resetArrays();
  	this.appService.getCandidateList(JSON.parse(id)).subscribe((data)=>{
  		console.log(data);
      if(data.responseCode === 204){this.noData = true;}
      else{
  		this.userList = data.result;
  			this.setUsers()}
  	},(error)=>{
  		console.log(error);
  	})
  }
  resetArrays(){
    this.shortListed =[];
    this.interviewed =[];
    this.onHold =[];
    this.hired =[];
  }
downloadResume(event){
  	console.log(event);
  }
setCV(cv){
  console.log(cv);
      window.open(cv, "_blank");
  }
  changeStatus(status,jobId,candiId){
    this.appService.clientShortListCandidate(status,jobId,candiId,JSON.parse(this.userId)).subscribe((data)=>{
      console.log(data);
     // alert("ShortListed Succesfully");
    this.toastr.success(data.responseMessage);
    this.getUserList(this.userId);
    },(error)=>{
      console.log(error);
    })
   }

   withdrawModalOpen(jobID, candiID){
     console.log(jobID, candiID);
     this.jobID = jobID;
     this.CandidateID = candiID;
     this.modalWithdraw.show();
   }
   withdrawCandi(){
     console.log("_id ==>" ,this.jobID);
     console.log("C_id ==>" ,this.CandidateID);
    this.appService.withdrawCandidate(JSON.parse(this.userId),this.CandidateID,this.jobID).subscribe((data)=>{
      console.log(data);
      this.toastr.success(data.responseMessage);
      this.modalWithdraw.hide();
    },(err)=>{
      console.log(err);
    })
   }
}
