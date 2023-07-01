import { Component, OnInit,ViewChild } from '@angular/core';
import { RecruiterProfileService } from './recruiter-profile.service';
import { AppService } from '../app.component.service'
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonFunctionsService } from '../sheared/index';
import { FormGroup, FormControl, Validators, NgForm, FormArray, FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { Title, DomSanitizer } from "@angular/platform-browser";
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-recruiter-profile',
  templateUrl: './recruiter-profile.component.html',
  styleUrls: ['./recruiter-profile.component.css']
})

export class RecruiterProfileComponent implements OnInit {
 @ViewChild('editModal', {static: true}) public modalEdit: ModalDirective;
user;
Experience=[];
recruiterType=[];
imageUrl;
naukriOrMonstor = [];
ctc = [];
isFirm = false ;
id;
dashboardCount ;
wantedCtc = [];
selectFunctional =[];
selectFunctionalEnd = [];
selectIndustry = [];
selectIndustryEnd = [];
GSTNo='';
submitted = false ;
TotalPlaced;
description='';
Totalshortlist;
NotApprove = false;
commission = [];
industry =[];
TotalCandidate;
eyQualified;
username ;
ctcWorked='';
commissionUser='';
userExperience ='';
recruiterworkingtype= '';
otherAccountProfile ='';
ctcExpected ='';
expertKeys;
expertIndustry ='';
userEmail;
userMobile;
profilePicture;
type;
typeCompany=[];
keys=[];
userID;
img;
industries:any=[];
eLocation ='';
file: File;
fileError=false;
typeImage: any;
fileArray=[];
designation = '' ;
functionalArea=[];
cmpanyDescrioption = '' ;
panNo ='';
dropdownSettingsI={};
dropdownSettingsF={};
fileName;
profilePic = 'assets/img/avtar.jpg';
base64textString: String = '';
editForm:FormGroup
constructor(
  private recruiterProfileService :RecruiterProfileService,
  private appService:AppService,
  private commonFunctions: CommonFunctionsService,
  private router: Router,
  private toastr: ToastrService,
  private _sanitizer: DomSanitizer)
   {
    this.id = localStorage.getItem('loginSessId');
    this.appService.getSuggestedIndustries().subscribe(
        res => {
          this.industries=res.result;
          console.log(res);
          return res;
        },
        err => {
          console.log("Error occured");
          return err;
        }
      );
   }
ngOnInit(){
  this.dropdownSettingsI = {
                               singleSelection: false,
                              idField: '_id',
                              textField: 'value',
                              selectAllText: 'Select All',
                              unSelectAllText: 'UnSelect All',
                              itemsShowLimit: 3,
                              allowSearchFilter: true
                                };
      this.dropdownSettingsF = {
                               singleSelection: false,
                                idField: '_id',
                                textField: 'value',
                                selectAllText: 'Select All',
                                unSelectAllText: 'UnSelect All',
                                itemsShowLimit: 3,
                                allowSearchFilter: true
                                };
                                this.getIndustries();
                                this.getFunctionalArea();
  this.initForm();
  this.getuser(this.id);
  this.getRecruiterDasboard(this.id);
  this.Experience = ['0-1 year','1-3 years' , '3-9 years', '10 years and above'];
  this.recruiterType = ['Full Time','Part Time'];
  this.naukriOrMonstor =[{display:'YES', value:true},{display:'NO', value:false}];
  this.ctc = ['3-10','10-20','20-30','30-40','40-50','50+'];
  this.wantedCtc = ['upto 4','4-10','10-25','25+'];
  this.typeCompany= ['Proprietorship', 'Partnership' ,'LLP'];
  this.commission = [{value :25 , display :'25 %'},{value :30 , display :'30 %'},{value :40 ,display: '40 %'},{value :50 ,display: '50 %'}];

  }
  getIndustries(){
  this.appService.getSuggestedIndustries()
     .subscribe(
        res => {
          this.industries=res.result;
          console.log(res);
          return res;
        },
        err => {
          console.log("Error occured");
          return err;
        }
      );
  }
  getFunctionalArea(){
    this.appService.getSuggestedFunctionalAreas()
     .subscribe(
        res => {
          this.functionalArea=res.result;
          console.log(res);
          return res;
        },
        err => {
          console.log("Error occured");
          return err;
        }
      );
  }
 handleFileSelect(evt) {
    console.log(evt);
    this.fileError = false;
    //console.log(evt)
    // this.fileArray.push(evt.target.files[0].name);
    this.fileName = evt.target.files[0].name;
    let ext = this.fileName.substr(this.fileName.lastIndexOf('.') + 1);
    if( ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
      const files = evt.target.files;
      const file = files[0];
      this.typeImage = files[0].type;
      if (files && file) {
        const reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      }
    } else {
      this.fileError = false;
      this.toastr.warning('Invalid File Type! Only .jpeg allowed')
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    if (this.base64textString) {
        this.img = this.base64textString;
        this.imageUrl = this._sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+ this.base64textString);
       // this.profilePicture =  this.base64textString;
        this.profilePicture =  this.imageUrl;
      }
    }
    serdata:any={};
showType:Boolean=false;user_idShow:any;dashBtn=false;
getuser(id){
  this.appService.getSuggestedIndustries()
  .subscribe(
     async res => {
       this.industries=res.result;
       console.log(res);
     await  this.recruiterProfileService.recruiterProfile(JSON.parse(id)).subscribe(objS=>{
        var resp = objS.json();
        this.user=resp.result;
       //  *ngIf="user.type != 'Individual'"
       if(this.user.type != 'Individual'){
         this.showType=true;
       }else{
         this.showType=false;

       }
        console.log(this.user,this.user.type,"user")
        this.username = this.user.user_name;
        if(this.user.status === "pending"){
          this.dashBtn=true;
        }else{
          this.dashBtn=false;

        }
         this.userMobile = this.user.mobile;
         this.userID = this.user.user_id;
         this.userEmail = this.user.email_id;
         this.user_idShow=this.user.user_id;
         this.serdata.regType=this.user.regType;
         this.profilePic = this.user.profile_pic;
         if("type" in this.user) this.type = this.user.type;
         if("working_package" in this.user) this.ctcWorked = this.user.working_package;
         if("city" in this.user) this.eLocation = this.user.city;
         if("experience" in this.user) this.userExperience = this.user.experience;
         if("recruiter_working_type" in this.user) this.recruiterworkingtype = this.user.recruiter_working_type;
         if("ctc_worked" in this.user) this.ctcExpected = this.user.ctc_worked;

         if("industry_expert" in this.user) this.selectIndustryEnd = this.user.industry_expert;
         if("functional_expert" in this.user) this.selectFunctionalEnd = this.user.functional_expert;
         if("commision" in this.user) this.commissionUser = this.user.commision;
         if("profile_pic" in this.user) this.profilePicture = this.user.profile_pic;
         if("pan_number" in this.user) this.panNo = this.user.pan_number;
         if("gst_number" in this.user) this.GSTNo = this.user.gst_number;
         if("company_description" in this.user) this.description = this.user.company_description;
         if("naukri_portal_login" in this.user){
             if(this.user.naukri_portal_login)this.otherAccountProfile = "YES";
             if(!this.user.naukri_portal_login)this.otherAccountProfile = "NO";
         }
         
         if(this.user.naukri_portal_login === true){
          this.otherAccountProfile = "YES"
         }else{
          this.otherAccountProfile = "NO";
         }
         if(this.user.status === "active"){
           this.NotApprove =false;
          }else{
           this.NotApprove =true;
          }
         if(this.type === "Firm") this.isFirm = true;
         this.setShowingIndusAndFunct(this.selectIndustryEnd, this.selectFunctionalEnd);
         this.profilePicture = this.user.profile_pic;
         // this.ctcWorked = this.user.working_package;
         // this.eLocation = this.user.city;
         // this.userExperience = this.user.experience;
         // this.recruiterworkingtype = this.user.recruiter_working_type;
         // this.ctcExpected = this.user.ctc_worked;
         // if(this.user.naukri_portal_login)this.otherAccountProfile = "YES";
         // if(!this.user.naukri_portal_login)this.otherAccountProfile = "NO";
         // this.expertKeys = this.user.industry_expert.toString();
         // this.expertIndustry = this.user.functional_expert.toString();
         // this.commissionUser = this.user.commision;
         // this.profilePicture = this.user.profile_pic;
        console.log(this.user);
        console.log(this.commissionUser,"ASAS");
     },objE=>{
       console.log(objE)
     })
      //  return res;
     },
     err => {
       console.log("Error occured");
       return err;
     }
   );
  

   }
   setShowingIndusAndFunct(indus,func){
    this.selectIndustry = [];
    this.selectFunctional = [] ;
     for(let i = 0 ; i < indus.length ; i++){
        this.selectIndustry.push(this.industries.find(x => x._id === indus[i]))
      }
       for(let i = 0 ; i < func.length ; i++){
        this.selectFunctional.push(this.functionalArea.find(x => x._id === func[i]))
      }
   }
initForm(){
    this.editForm = new FormGroup({
       designation: new FormControl(''),
      description: new FormControl(''),
      GSTNo : new FormControl('',[ Validators.pattern(this.commonFunctions.gstRegex)]),
      currentLocation: new FormControl('', [
        Validators.required,

      ]),
      recruiterType: new FormControl(''),
      otherAccount: new FormControl('', [
        Validators.required
      ]),
      currentCtc: new FormControl('', [
        Validators.required
      ]),
      expectCtc: new FormControl('', [
        Validators.required
      ]),
      commission: new FormControl(''),
      Idate :new FormControl(''),
      keys: new FormControl(''),
      industry: new FormControl(''),
      pan: new FormControl('', [
        Validators.required,
        Validators.pattern(this.commonFunctions.panRegex)
      ]),
       experiance: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ]),
      typeC :new FormControl(''),
      contact: new FormControl('', [
        Validators.required,
        Validators.pattern(this.commonFunctions.contactRegex),
        Validators.minLength(7),
        Validators.maxLength(15)
      ]),
      regType :new FormControl(''),

      
       email: new FormControl('', [
        Validators.required
      ]),
    })
   }
   backCheck(){
     if(this.user.status === "active"){
      this.router.navigate(['/recruiterHeader/recuiterDashboard']);
     }else{
       this.toastr.error("Your Account is in private mode. Pleaser wait for 12-48 hrs max. Customer Care No.+91-9717797670")
     }
   }
   logout(){
    localStorage.removeItem('loginSessId');
    localStorage.removeItem('token');
  // this.router.navigate(['/main/home']);
  window.location.href = 'https://peopleinfinia.com';

  }
setForm(){
  this.modalEdit.show();
  console.log(this.username,this.userMobile,this.userEmail);
  this.img = this.profilePicture
  this.editForm.setValue({
    description:this.cmpanyDescrioption,
    GSTNo:this.GSTNo,
    typeC:"",
    Idate:"",
    regType: this.serdata.regType,
    designation:this.designation,
    name:this.username,
    contact: this.userMobile,
    email:this.userEmail,
    currentLocation:this.eLocation,
    experiance:this.userExperience,
    recruiterType:this.recruiterworkingtype,
    otherAccount:this.otherAccountProfile,
    currentCtc: this.ctcWorked,
    expectCtc:this.ctcExpected,
    commission: this.commissionUser,
    keys:this.selectFunctional,
    industry: this.selectIndustry,
    pan:this.panNo})
  console.log(this.selectFunctional,this.selectIndustry)
  console.log(this.editForm)
}
goToDashboard(){
  this.router.navigate(['/recruiterHeader/recuiterDashboard']);

}
updateProfile(){
  console.log('thisisupdateing')
        this.submitted = true ;
  console.log(this.editForm.controls)
    if(this.editForm.valid){
      let control = this.editForm.controls
      console.log(control)
      var form = {
        'user_name': control.name.value,
        'mobile':JSON.parse(control.contact.value),
        'profile_pic':this.base64textString,
        'email_id':control.email.value,
        'regType':control.regType.value,
        
        'experience':control.experiance.value,
        'naukri_portal_login':control.otherAccount.value,
        'city' :control.currentLocation.value,
        'recruiter_working_type':control.recruiterType.value,
        'working_package':control.currentCtc.value,
        'functional_expert' :this.selectFunctionalEnd,
        'company_description':control.description.value,
        'industry_expert' :this.selectIndustryEnd,
        'ctc_worked':control.expectCtc.value,
        'commision' : control.commission.value,
        'pan_number' :control.pan.value,
        'gst_number': control.GSTNo.value,
      }
      console.log(form);
       this.appService.updateProfile(JSON.parse(this.id),form).subscribe((data)=>{
        this.modalEdit.hide();
        this.editForm.reset();
        this.toastr.success("Updated Successfully")
        this.getuser(this.id);
        this.submitted =false;
        console.log(data)
       },(err)=>{
        console.log(err);
       })
    }
  }
  getRecruiterDasboard(id){
    this.appService.recruiterDashboardCount(JSON.parse(id)).subscribe(res => {
          this.dashboardCount=res.result;
          this.TotalCandidate = this.dashboardCount.TotalcanidateUpload;
          this.eyQualified = this.dashboardCount.Eyqualified[0].count;
          this.Totalshortlist = this.dashboardCount.Totalshortlist[0].count;
          this.TotalPlaced = this.dashboardCount.TotalPlaced[0].count;
          console.log(this.dashboardCount);
          return res;
        },err => {
          console.log("Error occured");
          return err;
        }
    );
  }
  onKeysRemoved(evt){
    console.log(evt);
     var index = this.keys.indexOf(evt.display);
    if (index > -1) {
    this.keys.splice(index, 1);}
  }
onIndustryRemoved(evt){
    console.log(evt);
     var index = this.industry.indexOf(evt.display);
    if (index > -1) {
    this.industry.splice(index, 1);}

  }
  onKeysAdded(evt){
    console.log(evt);
     this.keys.push(evt.display)
  }
  onIndustryAdded(evt){
    console.log(evt);
    this.industry.push(evt.display)
  }
  submittedF(){
    this.modalEdit.hide();
    this.editForm.reset();
    this.submitted = false;
  }
  //--------------------functional Area ------------------------

  onItemSelect(item:any){
        console.log(item);
        this.selectFunctional.push(item);
        this.selectFunctionalEnd.push(item._id)
        console.log(this.selectFunctional);
    }
    OnItemDeSelect(item:any){
        console.log(item);
        for(let i = 0 ; i < this.selectFunctional.length ; i++){
          if(this.selectFunctional[i]._id === item._id){
            this.selectFunctional.splice(i, 1);
          }
          if(this.selectFunctionalEnd[i] === item._id){
            this.selectFunctionalEnd.splice(i,1);
          }
        }
        console.log(this.selectFunctional);
    }
    onSelectAll(items: any){
      for (let i = 0 ; i<items.length ; i++){
          this.selectFunctional.push(items[i])
          this.selectFunctionalEnd.push(items[i]._id);
      }
        console.log(this.selectFunctional);
    }
    onDeSelectAll(items: any){
      this.selectFunctional = [];
      this.selectFunctionalEnd = [];
        console.log(this.selectFunctional);

    }

//--------------------Industries --------------------------------


    onItemSelectI(item:any){
        //console.log(item);
        this.selectIndustry.push(item);
        this.selectIndustryEnd.push(item._id);
        console.log(this.selectIndustry);
    }
    OnItemDeSelectI(item:any){
        console.log(item);
       for(let i = 0 ; i < this.selectIndustry.length ; i++){
          if(this.selectIndustry[i]._id === item._id){
            this.selectIndustry.splice(i, 1);
          }
          if(this.selectIndustryEnd[i] === item._id){
            this.selectIndustryEnd.splice(i,1)
          }
        }
        console.log(this.selectIndustry);
    }
    onSelectAllI(items: any){
       for (let i = 0 ; i<items.length ; i++){
          this.selectIndustry.push(items[i]);
          this.selectIndustryEnd.push(items[i]._id);
      }
     // this.selectIndustry = items
       // console.log(items);
    }
    onDeSelectAllI(items: any){
      this.selectIndustry = [] ;
      this.selectIndustryEnd = [];
        console.log(this.selectIndustry);
    }

    gotoBack() {
      window.history.back();
    }
}
