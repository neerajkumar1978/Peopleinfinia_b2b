import { Component, OnInit,ViewChild } from '@angular/core';
import { AppService } from '../app.component.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { CommonFunctionsService } from '../sheared/index';
@Component({
  selector: 'app-support-issue',
  templateUrl: './support-issue.component.html',
  styleUrls: ['./support-issue.component.css']
})
export class SupportIssueComponent implements OnInit {
  page: number = 1;
  page2: number = 1;
oneAtATime: boolean = true;
issues;
queston = ''
userId;
ShowStatus =false;
ShowPagination = false ;
userIssues =[];
Step1 = false
Step2 = false
Step3 = false
Step4 = false
step1Time = "";
step2Time = "";
step3Time = "";
step4Time = "";
processingQuestion;
  constructor(
  private appService:AppService,
  private toastr: ToastrService,
  private commonFunctions: CommonFunctionsService
) {
  this.userId = localStorage.getItem('loginSessId');
 }


  ngOnInit() {
    this.getAllQuestions();
    this.getUserSubmittedIssues();
  }
  getAllQuestions(){
    this.issues = [];
    this.appService.getAllAdminQuestions().subscribe((data)=>{
      // console.log(data['_body'])
      this.issues = JSON.parse(data['_body']);
      console.log(this.issues)
    },(err)=>{
      console.log(err);
    })
  }
  submitQuery(id ,queston){
    var form= {
      "user": JSON.parse(this.userId),
      "issue": id
    }
    this.sendQueryRequest(form);
  }
  sendQueryRequest(form){
    this.appService.submitIssue(form).subscribe((data)=>{
      console.log(data)
      this.toastr.success("Submitted");
      this.getUserSubmittedIssues()
    },(err)=>{
      console.log(err);
    })

  }
  getUserSubmittedIssues(){
    this.appService.getAllSubmittedUsersByID(JSON.parse(this.userId)).subscribe((data)=>{
      console.log(data);
      let resp = JSON.parse(data['_body'])
      this.userIssues = resp
      if(this.userIssues.length > 6){
        this.ShowPagination = true;
      }
      // this.findTheIssue(resp);
    },(err)=>{
      console.log(err);
    })
  }
  
  findTheIssue(data){
    for(let i = 0 ; i < this.issues.length ; i++ ){
      if(this.issues[i]._id === data.issue) {
        this.processingQuestion =  this.issues[i];
        this.setQuery(data,this.processingQuestion);
       }
    }
  }
  setQuery(data,query){
    this.queston = query.queston;
    console.log(data);
  }
 
  viewStatus(data){
    this.ShowStatus = true;
    console.log(data);
    this.Step1 = false
    this.Step2 = false
    this.Step3 = false
    this.Step4 = false
    this.step1Time = "";
    this.step2Time = "";
    this.step3Time = "";
    this.step4Time = "";
    for(let i = 0; i < data.timeline.length; i++){
      this.checkStatus(data.timeline[i]);
    }
  }
  checkStatus(data){
    if(data.status === "created"){this.Step1 = true; this.step1Time = data.date}
    if(data.status === "reviewed"){this.Step2= true;this.step2Time = data.date}
    if(data.status === "resolved"){this.Step3= true;this.step3Time = data.date}
    if(data.status === "closed"){this.Step4= true;this.step4Time = data.date}
  }
}
