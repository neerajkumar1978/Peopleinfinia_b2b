import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppService} from '../app.component.service';
import {PostjobService} from '../post-new-job/postjob.service';
import {ToastrService} from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-recruiter-dashboard',
  templateUrl: './recruiter-dashboard.component.html',
  styleUrls: ['./recruiter-dashboard.component.css']
})
export class RecruiterDashboardComponent implements OnInit {
  @ViewChild('frstModal', {static: true}) public modal1: ModalDirective;
  @ViewChild('secondModal', {static: true}) public modal2: ModalDirective;
  @ViewChild('forthModal', {static: true}) public modal3: ModalDirective;

  @ViewChild('xlsxInput', {static: true}) public myInputVariable: ElementRef;
  duplicacy = true;
  p = 1;

  dashboardJobs: any = [];
  dashboardCount: any = [];
  feeds: any = [];
  user;
 showcv = false;
 name = '';
  Totalshortlist = 0;
  eyCount;
  reverse: boolean = false;
  key: string = 'interview_date';
  TotalPlaced = 0;
  public userId: any;
  submit=false;
  constructor(
    private appService: PostjobService,
    private appService2: AppService,

    private toastr: ToastrService,
    private appService1: AppService
  ) {
    this.userId = localStorage.getItem('loginSessId');
  }


  ngOnInit() {
    this.getUser(this.userId);
    this.getRecruiterDasboard(this.userId);
    this.getNotificationFeeds(this.userId);
  }
  submitXlsx() {
    if (this.submit) {
    this.modal3.show();

    this.modal1.hide();
    this.modal2.hide();

  } else {
    this.toastr.warning('Upload All CVs');
  }
}
showCV(CV) {
  console.log(CV);
    window.open(CV, '_blank');
}
upResume:Boolean=false;
  getUser(id) {
    this.appService1.recruiterProfile(JSON.parse(id)).subscribe(objS => {
      var resp = objS.json();
      this.user = resp;
      this.name = this.user.user_name;
      //    regType == institution
      if(this.user.regType == 'institution'){
        this.upResume=true
      }else{
        this.upResume=false
        
      }
      console.log("user login ",this.user,this.user.institutionName);
      if(this.user.institutionName != null){
        this.upResume=true
      }else{
        this.upResume=false
        
      }
    }, objE => {
      console.log(objE);

    });
  }
  close() {
    this.modal2.hide();
    this.removeXlsx();
  }
  showName = false ;  fileNameXlsx ;  responceFile;  ext;  file: File;

  removeXlsx() {
    this.myInputVariable.nativeElement.value = '';
    this.showName = false;
    this.fileNameXlsx = '';
  }
  onChange(event: EventTarget) {
    const eventObj: MSInputMethodContex = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = target.files;
    this.ext = files[0].name.substr(files[0].name.lastIndexOf('.') + 1);
      console.log(this.ext);
      if (this.ext === 'xlsx') {
         this.file = files[0];
         this.fileNameXlsx = this.file.name;
         this.showName = true;
         const formdata: FormData = new FormData();
         console.log(this.file);
         formdata.append('files', this.file);
         this.appService2.makeUploadRequest(formdata).subscribe(response => {
           console.log(response);
           this.responceFile = response.file;
            }, (err) => {
           console.log(err);
         });
         console.log(this.file);
       } else {
        this.toastr.warning('Only .xlsx can upload');
       }

  }
  fileError1 = false;
  fileArray1 = [];
  fileName1;
  fileName;
  typeImage1: any;  showButton = true;
  id;
  typeImage: any;
  index;  caId;
  candidates = [];
  handleFileSelect1(evt , i) {
    console.log(evt);
    console.log(i);
    this.index = i;
    this.fileError1 = false;
    console.log(evt);
    this.fileArray1.push(evt.target.files[0].name);
    this.fileName1 = evt.target.files[0].name;
    const ext = this.fileName1.substr(this.fileName1.lastIndexOf('.') + 1);
    if (ext === 'pdf') {
      const files = evt.target.files;
      const file = files[0];
      this.typeImage1 = files[0].type;
      if (files && file) {
        const reader = new FileReader();
        reader.onload = this._handleReaderLoaded1.bind(this);
        reader.readAsBinaryString(file);
      }
    } else {
      this.fileError1 = false;
      this.toastr.warning('Invalid File Type! Only pdf allowed');
    }
  
  }
  fileError = false;
  fileArray = [];

  handleFileSelect(evt , i) {
    console.log(evt);
    console.log(i);
    this.caId = i;
    this.fileError = false;
    console.log(evt);
    this.fileArray.push(evt.target.files[0].name);
    this.fileName = evt.target.files[0].name;
    const ext = this.fileName.substr(this.fileName.lastIndexOf('.') + 1);
    if (ext === 'pdf') {
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
      this.toastr.warning('Invalid File Type! Only pdf allowed');
    }
  }
  base64textString1: String = '' ;  base64textString: String = '' ;

  _handleReaderLoaded1(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString1 = btoa(binaryString);
    if (this.base64textString1) {
      var form = {
        'cv': this.base64textString1,
        'recruiter_id': JSON.parse(this.userId),
        'job_id': this.id,
        'candidate_id': this.candidates[this.index]._id
      };
      console.log(form);
      this.showButton = false;
      this.replaceCV(form);
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    if (this.base64textString) {
      var form = {
        'cv': this.base64textString,
        'recruiter_id': JSON.parse(this.userId),
        'job_id': this.id,
        'candidate' : {
          'name' : this.candidates[this.caId].NAME,
          'age' : this.candidates[this.caId].AGE,
          'email' : this.candidates[this.caId].EMAIL,
          'sex' : this.candidates[this.caId].SEX,
          'experience' : this.candidates[this.caId].EXPERIENCE,
          'qualification' : this.candidates[this.caId].QUALIFICATION,
          'current_organisation' : this.candidates[this.caId].CURRENT_ORGANISATION,
          'ctc' : this.candidates[this.caId].CTC,
          'phone_number' : this.candidates[this.caId].PHONE_NUMBER,
          background_check: false,
          withdraw: false,
          status: 'active'
        }
        // 'candidates_id': this.caId
      };
      this.showButton = false;

      console.log('imgform', form);
      this.uploadCV(form);

    }
  }
  ID;
  
  checkStatusOfCv(data, index) {
    if (data.responseMessage === 'Candidate Already Exist') {
      this.toastr.warning('candidate already Applied');
      this.showButton = true;
      this.candidates[index].cv = 'duplicate';
    }
    if (data.responseMessage === 'resume uploaded') {
      this.toastr.success('CV uploaded');
      this.showButton = true;
      this.replaceButton(data, index);
      this.ID = data.result._id;
      this.candidates[index].cv = data.result.candidates[data.result.candidates.length - 1].cv;
      this.candidates[index]._id = data.result.candidates[data.result.candidates.length - 1]._id;
      console.log(this.candidates[index].cv);
  }}
  replaceButton(data, index) {
    console.log(data, index);

  }
  uploadCV(form) {
    this.appService2.convertBaseToUploadCV(form).subscribe((data) => {
      console.log(data);
      this.checkStatusOfCv(data, this.caId);
    }, (err) => {
      console.log(err);
    });
  }
    replaceCV(form) {
      this.appService2.replaceCV(this.ID, form).subscribe((data) => {
        console.log(data);
        this.setUpdatedResume(data);
        this.showButton = true;
      }, (err) => {
        console.log(err);
      });
    }
    setUpdatedResume(data) {
      const candidate_id = this.candidates[this.index]._id;
      const updateCandidate = data.result.candidates.find(x => x._id === candidate_id);
      console.log(updateCandidate);
      this.candidates[this.index].cv = updateCandidate.cv;
    }
  onSubmit() {
    console.log('here');
    if (this.ext === 'xlsx') {
      console.log('here2', this.responceFile);
      this.appService2.readXLSX(this.responceFile).subscribe(res => {
        console.log(res);
        this.candidates = res['Sheet1'];
        console.log(this.candidates);
        this.addCVsToNull(this.candidates);
        this.modal1.hide();
        this.modal2.show();
      }, (err) => {
        console.log(err);
      });
     
    } else {
      this.toastr.warning('Please select file');
    }

  }
  addCVsToNull(candidates) {
    for (let i = 0 ; i < candidates.length; i++) {
      candidates[i].cv = null ;
    }
}
  saveBookMark(jobId) {
    this.appService1.saveBookMark(JSON.parse(this.userId), jobId)
      .subscribe(
        res => {
          this.dashboardCount = res.result;

          console.log((JSON.stringify(res)));
          return res;
        }, err => {
          console.log('Error occured');
          return err;
        }
      );
  }

  getNotificationFeeds(id) {
    this.appService1.getNotificationsFeedRecuiterDashboard(JSON.parse(id)).subscribe((data) => {
      console.log('notificationsssssss', data);
      this.feeds = data;
    }, (error) => {
      console.log(error);
    });
  }

  getDashboardJobs() {
    this.appService.dashboardJob().subscribe((res): any => {
      const sortedJobs = res.result.slice().sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf())
      this.dashboardJobs = sortedJobs;
        console.log(this.dashboardJobs);
        return res;
      }, err => {
        console.log('Error occured');
        return err;
      }
    );
  }

  getRecruiterDasboard(id) {
    this.appService1.recruiterDashboardCount(JSON.parse(id)).subscribe(res => {
        this.dashboardCount = res;
        this.eyCount = this.dashboardCount.Eyqualified[0].count;
        this.Totalshortlist = this.dashboardCount.Totalshortlist[0].count;
        this.TotalPlaced = this.dashboardCount.TotalPlaced[0].count;

        console.log(this.dashboardCount);
        return res;
      }, err => {
        console.log('Error occured');
        return err;
      }
    );
  }

  noMore() {
    this.toastr.warning('No more Notifications!!');
  }
}
