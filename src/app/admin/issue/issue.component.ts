import { Component, OnInit,ViewChild } from '@angular/core';
import { AppService } from '../../app.component.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { CommonFunctionsService } from '../../sheared/index';
@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  issues= [];
  page: number = 1;
  page1: number = 1;
  page2: number = 1;
  page3: number = 1;
  ShowPagination = false ;
  ShowPagination1 = false ;
  ShowPagination2 = false ;
  ShowPagination3 = false ;
  Step1 = false
  Step2 = false
  Step3 = false
  Step4 = false
  pendingIssues= [];
  resolvedIssues= [];
  closedIssues= [];
  newIssues =[];
  username ="";
  userID ="";
  userContact =""
  userEmail ="";
  ShowUser = false;
  userId = '';
  userStatus ="";
  issueID ;
  userQuestion = "";
  step1Time = "";
  step2Time = "";
  step3Time = "";
  step4Time = "";
  processId ="";
  currentIssueID;
  constructor(
    private router: Router,
    private appService:AppService,
    private toastr: ToastrService,
    private commonFunctions: CommonFunctionsService
  ) {}

  ngOnInit() {
  this.getAllQueries();
  }
  getAllQueries(){
  
    this.appService.getSubmitedIssuesAdmin().subscribe((data)=>{
        let resp = JSON.parse(data['_body']);
      console.log(resp)
      
      this.setIssueArray(resp);
    },(err)=>{
      console.log(err)
    })
    }
    CloseDetails(){
      this.ShowUser = false;
    }
    setIssueArray(data){
    this.issues = data;
    // let status = this.issues.find( x => x.status === 'close');
    // console.log(status);
    // if(status === undefined){
    //   status = this.issues.find( x => x.status === 'resolved');
    //   if(status === undefined ){
    //     status=  this.issues.find( x => x.status === 'reviewed');
    //     if(status === undefined){
    //       status=  this.issues.find( x => x.status === 'created');
    //       console.log(status);
    //     }
    //   }else{

    //   }
    // }else{
    //   /
    // }
    for(let i = 0; i < this.issues.length ; i++){
      this.setArray(this.issues[i]);
      
      }
      console.log(this.newIssues,this.pendingIssues,this.closedIssues,this.resolvedIssues)
    }
    setArray(data){
    let i = data.timeline.length -1;
    // console.log(i,data)

        if(data.timeline[i].status === "created"){
          this.newIssues.push(data);
          if(this.newIssues.length > 5){
            this.ShowPagination = true;
          }
        }
        if(data.timeline[i].status === "reviewed"){
          
          this.pendingIssues.push(data);
          if(this.pendingIssues.length > 5){
            this.ShowPagination1 = true;
          }
        }
        if(data.timeline[i].status === "resolved"){
          this.resolvedIssues.push(data);
          if(this.resolvedIssues.length > 5){
            this.ShowPagination2 = true;
          }
        }
        if(data.timeline[i].status === "closed"){
          this.closedIssues.push(data);
          if(this.closedIssues.length > 5){
            this.ShowPagination3 = true;
          }
        }
     
      }
      
    
    showPofile(user,issueID, issue){
      this.getUserDetails(user);   
         this.issueID = issueID;

      this.getIssueById(issueID);
      this.processId = issue._id
    }
    getUserDetails(user){
      console.log(user);
      this.appService.recruiterProfile(user._id).subscribe((data)=>{
        var resp = data['_body']
        this.setUserDetails(JSON.parse(resp))
      },(err)=>{
        console.log(err);
      })
    }
    getIssueById(issueID){
      console.log(issueID)
      this.currentIssueID = issueID
      this.appService.getSingleSubmittedIssues(issueID).subscribe((data)=>{
        var resp = data['_body']
        console.log(resp)
        this.checkCurrentIssueStatus(JSON.parse(resp))
      },(err)=>{
        console.log(err);
      })
      // this.appService.getIssueById(issueId).subscribe((data)=>{
      //  console.log(data);
      // },(err)=>{
      //   console.log(err);
      // })
    }
    setUserDetails(data){
      this.ShowUser = true;
      this.username = data.result.user_name;
      this.userID = data.result.user_id;
      this.userContact = data.result.mobile;
      this.userEmail = data.result.email_id;
      this.userStatus = data.result.status;
      this.userId = data.result._id;
    }
    showProfile(){
      this.router.navigate(['/admin-home/userprofile/'+this.userId]);
    }
    checkCurrentIssueStatus(data){
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
        this.checkStatus(data.timeline[i])
      }
    }
    checkStatus(data){
      if(data.status === "created"){this.Step1 = true; this.step1Time = data.date}
      if(data.status === "reviewed"){this.Step2= true;this.step2Time = data.date}
      if(data.status === "resolved"){this.Step3= true;this.step3Time = data.date}
      if(data.status === "closed"){this.Step4= true;this.step4Time = data.date}
    }
    updateStatus(data){
      var Form = {
        "user": this.userId,
        "issue": this.processId,
        "status": data
      }
      this.appService.updateQueryStatus(Form, this.currentIssueID).subscribe((data)=>{
        console.log(data);
        this.getIssueById(this.issueID);
      },(err)=>{
        console.log(err);
      })
    }
}
