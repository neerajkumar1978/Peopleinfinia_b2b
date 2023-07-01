import { Component, OnInit,ViewChild } from '@angular/core';
import { AppService } from '../app.component.service';
import { CommonFunctionsService } from '../sheared/index';
import { FormGroup, FormControl, Validators, NgForm, FormArray, FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { Title, DomSanitizer } from "@angular/platform-browser";
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-clientprofile',
  templateUrl: './clientprofile.component.html',
  styleUrls: ['./clientprofile.component.css']
})
export class ClientprofileComponent implements OnInit {
 @ViewChild('editModal', {static: true}) public modalEdit: ModalDirective;
img;
                  userCompanyDescription='';
                   companyGSTNo='';
                   company_rate_of_staffing='';
                   user_employe_strength='';
                   comapnyAddress='';
                   companyIndustryType= [];
                   aggrementDate='';
                   aggrementStartDate='';
                   aggrementEndDate='';
imageUrl;
industries;
profilePicture;
user;
id;
dropdownSettingsI={};
fileError;
submitted = false ;
userID;
base64textString
fileName;
username ;
typeImage;
rateofStaffing = [];
userMobile;
userCompany;
userEmail;
editForm:FormGroup;
selectIndustry =[];
showSelectIndustries =[];
noEmployes =[];
  hasDoneSetup: boolean;
constructor(
   private appService:AppService,
   private commonFunctions: CommonFunctionsService,
   private toastr: ToastrService,
   private _sanitizer: DomSanitizer,
   private LoginService: LoginService) {
    this.id = localStorage.getItem('loginSessId');

   }
ngOnInit() {
  this.getIndustries();
 this.dropdownSettingsI = {
                              singleSelection: false,
                              idField: '_id',
                              textField: 'value',
                              selectAllText: 'Select All',
                              unSelectAllText: 'UnSelect All',
                              itemsShowLimit: 3,
                              allowSearchFilter: true
                                };
  this.initForm();
  this.getuser(this.id);
  this.rateofStaffing = [
      {value:"6",display:'6 %'},
      {value:"8.33",display:'8.33 %'},
      {value:"10 ",display:'10 %'},
      {value:"12.5",display:'12.5 %'},
      {value:"16",display:'16 %'}
    ];
  this.noEmployes = [
          '0-50',
          '50-100',
          '100-500',
          '500+'
    ]
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

 handleFileSelect(evt) {
    console.log(evt);
    this.fileError = false;
    //console.log(evt)
    // this.fileArray.push(evt.target.files[0].name);
    this.fileName = evt.target.files[0].name;
    let ext = this.fileName.substr(this.fileName.lastIndexOf('.') + 1);
    if( ext === 'jpg' || ext === 'jpeg' || ext === 'png'  ) {
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
        this.imageUrl  = this._sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+ this.base64textString);
       this.profilePicture =  this.base64textString;
      }
    }
setForm(){
  this.modalEdit.show();
  this.editForm.setValue({
     name : this.username,
     email : this.userEmail,
     companyName : this.userCompany,
     companyBrief :this.userCompanyDescription,
     contact : this.userMobile,

     GSTNo :this.companyGSTNo,
     rateStaffing : this.company_rate_of_staffing,
     employeStrength : this.user_employe_strength,
     address :this.comapnyAddress,
     type : this.selectIndustry,
     aggrementDate : this.aggrementDate,
     startDate : this.aggrementStartDate,
     endDate : this.aggrementEndDate
  })
}
getuser(id){
  this.selectIndustry = [];
     this.appService.recruiterProfile(JSON.parse(id)).subscribe(objS=>{
           var resp = objS.json();
           this.user=resp.result;
           console.log(this.user,"user")
            // if("working_package" in this.user) this.ctcWorked = this.user.working_package;
            this.username =  this.user.user_name;
            this.userEmail = this.user.email_id;
            this.userCompany = this.user.company_name;
            this.userID = this.user.user_id;
            this.userMobile = this.user.mobile;
            if("company_description" in this.user) this.userCompanyDescription = this.user.company_description;
            if("gst_number" in this.user) this.companyGSTNo = this.user.gst_number;
            if("rate_of_staffing" in this.user) this.company_rate_of_staffing = this.user.rate_of_staffing;
            if("employe_strength" in this.user) this.user_employe_strength = this.user.employe_strength;
            if("office_address" in this.user) this.comapnyAddress = this.user.office_address;
            if("industry_expert" in this.user) this.companyIndustryType = this.user.industry_expert;
            if("date_of_aggrement" in this.user) this.aggrementDate = this.user.date_of_aggrement;
            if("aggrement_start_date" in this.user) this.aggrementStartDate = this.user.aggrement_start_date;
            if("aggrement_end_date" in this.user) this.aggrementEndDate = this.user.aggrement_end_date;
            if("profile_pic" in this.user) this.profilePicture = this.user.profile_pic;
           console.log(this.user);
           this.imageUrl = this.profilePicture;
           console.log(this.companyIndustryType);
           this.showCompnayIndustries(this.companyIndustryType);
           this.showSelectIndustries = this.companyIndustryType;

        },objE=>{
          console.log(objE)
        })

   }
  showCompnayIndustries(array){
      for(let i = 0 ; i < array.length ; i++){
        this.selectIndustry.push(this.industries.find(x => x._id === array[i]))
      }
   }
initForm(){
    this.editForm = new FormGroup({
     name : new FormControl('',[Validators.required]),
     email : new FormControl('',[Validators.required]),
     companyName : new FormControl('',[Validators.required]),
     companyBrief : new FormControl('',[Validators.required]),
     contact : new FormControl('',[Validators.required]),
     GSTNo : new FormControl('',[Validators.pattern(this.commonFunctions.gstRegex)]),

     rateStaffing : new FormControl('',[Validators.required]),
     employeStrength : new FormControl('',[Validators.required]),
     address : new FormControl('',[Validators.required]),
     type : new FormControl(''),
     aggrementDate : new FormControl(''),
     startDate : new FormControl(''),
     endDate : new FormControl('')
    })
   }
updateProfile(){
        this.submitted = true ;
        if(this.editForm.valid){
      let control = this.editForm.controls
      console.log(control)
      var form = {
        'user_name': control.name.value,
        'mobile':JSON.parse(control.contact.value),
        'profile_pic':this.profilePicture,
        'email_id':control.email.value,
        'company_name':control.companyName.value,
        'gst_number':control.GSTNo.value,
        'company_description':control.companyBrief.value,
        'rate_of_staffing' :control.rateStaffing.value,
        'employe_strength':control.employeStrength.value,
        'office_address':control.address.value,
        'industry_expert' :this.showSelectIndustries,
        'date_of_aggrement' :control.aggrementDate.value,
        'aggrement_start_date':control.startDate.value,
        'aggrement_end_date' : control.endDate.value
        }
      console.log(form);
       this.appService.updateProfile(JSON.parse(this.id),form).subscribe((data)=>{
        this.modalEdit.hide();
        this.editForm.reset();
        this.submitted =false;
        this.getuser(this.id);
        this.LoginService.changeSetupStatus(form && form.gst_number ? true : false);
        localStorage.setItem('hasDoneSetup', form && form.gst_number ? "true" : "false");
        this.toastr.success('Successfully updated')
        console.log(data)
       },(err)=>{
        console.log(err);
       })
    }
  }
   onItemSelectI(item:any){
        //console.log(item);
        this.selectIndustry.push(item);
        this.showSelectIndustries.push(item._id);
        console.log(this.selectIndustry);
    }
    OnItemDeSelectI(item:any){
        console.log(item);
       for(let i = 0 ; i < this.selectIndustry.length ; i++){
          if(this.selectIndustry[i]._id === item._id){
            this.selectIndustry.splice(i, 1);
           }
           if(this.showSelectIndustries[i] === item._id){
            this.showSelectIndustries.splice(i, 1);
           }
        }
        console.log(this.selectIndustry);
    }
    onSelectAllI(items: any){
       for (let i = 0 ; i<items.length ; i++){
          this.selectIndustry.push(items[i])
          this.showSelectIndustries.push(items[i]._id)
      }
     // this.selectIndustry = items
       // console.log(items);
    }
    onDeSelectAllI(items: any){
      this.selectIndustry = [] ;
      this.showSelectIndustries = [];
        console.log(this.selectIndustry);
    }

  submittedF(){
    this.modalEdit.hide();

  }
}
