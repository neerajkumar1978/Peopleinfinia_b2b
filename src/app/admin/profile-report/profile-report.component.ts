import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.component.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile-report',
  templateUrl: './profile-report.component.html',
  styleUrls: ['./profile-report.component.css']
})
export class ProfileReportComponent implements OnInit {
  id;
  data;
  userName="";
  userEmail="";
  userContact="";
   userType ="";
   userStatus ; 
   timelineData:Array<Object> =[
    // {
    //   title:"SignUp",
    //   icon:'<i class="fa fa-check"></i>',
    //   content:"Completed",
    //   complete:false
    // },
    // {
    //   title:"Email Varification",
    //   icon:'<i class="fa fa-check"></i>',
    //   content:"Completed",
    //   complete:false
    // }
  ];
   Step1 = false;
   Step2 = false;
   Step3 = false;
   Step4 = false;
   Step5 = false;
   Step1Time = "";
   Step2Time = "";
   Step3Time = "";
   Step4Time = "";
   Step5Time = "";
   Step1Reason = "";
   Step2Reason = "";
   Step3Reason = "";
   Step4Reason = "";
   Step5Reason = "";
  constructor(
    private appService:AppService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.route.params
    .subscribe(
     (params: Params) => {
    this.id = params.id;})
   }

  ngOnInit() {
    this.getUserProfileStatus(this.id);
  }
  getUserProfileStatus(id){
    this.appService.getUserProfileStatus(id).subscribe((data)=>{
      var resp = data.json();
      console.log(resp)
      this.userStatus = resp.timeline;
      this.setDetails(resp);
      this.checkTheStatusOfUser(this.userStatus)
    },(err)=>{
      console.log(err);
    })
  }
  setDetails(data){
    this.userName = data.user_name;
    this.userEmail = data.email_id;
    this.userContact = data.mobile;
    this.userType = data.type;
  }
  checkTheStatusOfUser(data){
    for(let i = 0 ; i < data.length ; i++){
      if(data[i].action = "signup"){
        this.checkSignUpStaus(data[i]);
      } if(data[i].action = "email-verification "){
        this.checkEmailVerifyStatus(data[i]);
      } if(data[i].action = "call-verification"){
        this.checkCallVerification(data[i]);
      } if(data[i].action = "contract-status"){
        this.checkContractStatus(data[i]);
      } if(data[i].action = "payment-status"){
        this.checkPaymentStatus(data[i]);
      }
    }
    // this.checkSignUpStaus(data[0]);
    // this.checkEmailVerifyStatus(data[1]);
    // this.checkCallVerification(data[2]);    
    // this.checkContractStatus(data[3]);    
    // this.checkPaymentStatus(data[4]);    
  }
  checkSignUpStaus(data){
    console.log(data)
    if(data === undefined){
      this.Step1 = false;
    }else{
      if(data.status === "completed"){
        this.Step1 = true;
        this.Step1Time = data.date;
      }else{
        this.Step1Reason = data.status
      }
    }
  }
  
  
  checkEmailVerifyStatus(data){
    if(data === undefined){
      this.Step2 = false;
    }else{
      if(data.status === "completed"){
        this.Step2 = true;
        this.Step2Time = data.date;
      }else{
        this.Step2Reason = data.status
      }
    }
  }
  checkCallVerification(data){
    if(data === undefined){
      this.Step3 = false;
    }else{
      if(data.status === "verified"){
        this.Step3 = true;
        this.Step3Time = data.date;
      }else{
        this.Step3Reason = data.status
      }
    }
    console.log(data)
  }
  checkContractStatus(data){
    console.log(data)
    if(data === undefined){
      this.Step4 = false;
    }else{
      if(data.status === "signed"){
        this.Step4 = true;
        this.Step4Time = data.date;
      }else{
        this.Step4Reason = data.status
      }
    }
  }
  checkPaymentStatus(data){
    if(data === undefined){
      this.Step5 = false;
    }else{
      if(data.status === "paid"){
        this.Step5 = true;
        this.Step5Time = data.date;
      }else{
        this.Step5Reason = data.status
      }
    }
  }
   completeListener(item){
    console.log(item);
    return true;
  }
  callVerification(data){
    console.log(data);
    var form = 
      {
        "action": "call-verification",
        "status": data
    } 
    this.appService.setProfileStatus(form,this.id).subscribe((data)=>{
      console.log(data);
      this.getUserProfileStatus(this.id);
    },(err)=>{
      console.log(err);
    })
  }
  contractStatus(data){
    var form = 
      {
        "action": "contract-status",
        "status": data
    } 
    this.appService.setProfileStatus(form,this.id).subscribe((data)=>{
      console.log(data);
      this.getUserProfileStatus(this.id);
    },(err)=>{
      console.log(err);
    })
    console.log(data);
  }
  paymentStatus(data){
    var form = 
      {
        "action": "payment-status",
        "status": data
    } 
    this.appService.setProfileStatus(form,this.id).subscribe((data)=>{
      console.log(data);
      this.getUserProfileStatus(this.id);
    },(err)=>{
      console.log(err);
    })
  }
  activateAccount(){
    var form = {
      "status":"active"
    }
    this.appService.activateAccountUser(this.id,form).subscribe((data)=>{
      console.log(data);
      this.router.navigate(['/admin-home/leads']);
      this.toastr.success("Account Activated")
    },(err)=>{
      console.log(err);
    })
  }
}
