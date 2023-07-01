import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostjobService } from '../post-new-job/postjob.service';
import { Http } from '@angular/http';
import { AppService } from '../app.component.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-view-proposal',
  templateUrl: './view-proposal.component.html',
  styleUrls: ['./view-proposal.component.css']
})

export class ViewProposalComponent implements OnInit {
  @ViewChild('frstModal', {static: true}) public modal1: ModalDirective;
  @ViewChild('secondModal', {static: true}) public modal2: ModalDirective;
  @ViewChild('forthModal', {static: true}) public modal3: ModalDirective;
  @ViewChild('xlsxInput', {static: true}) public myInputVariable: ElementRef;

  candidates = [];
  dashboardJobs: any = [];
  file: File;
  fileError = false;
  typeImage: any;
  fileArray = [];
  fileName;
  file1: File;
  fileError1 = false;
  typeImage1: any;
  fileArray1 = [];
  fileName1;
  p = 1;
  fileNameXlsx ;
  showName = false ;
  caId;
  showButton = true;
  id;
  candidateId;
  dashboardJobsID;
  base64textString1: String = '' ;
  responceFile;
  ID;
  Jd;
  ext;
  duplicacy = true;
  showJd = false;
  List = [];
  submit = false;
  base64textString: String = '';
  index;
  data: any = [{
    NAME: '',
    AGE: '',
    SEX: '',
    EMAIL: '',
    EXPERIENCE: '',
    PHONE_NUMBER: '',
    QUALIFICATION: '',
    CURRENT_ORGANISATION: '',
    CTC: ''
  }];
  sampleCV;
 showcv = false;
  public userId: any;
  constructor(
    private appService: AppService,
    private appService2: PostjobService,
    private router: Router,
      private toastr: ToastrService,
    private route: ActivatedRoute) {

    this.userId = localStorage.getItem('loginSessId');
  }
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params.id;
        }
      );
    this.appService.getSingleJobData(this.id).subscribe((data) => {
      console.log(data);
      this.dashboardJobs = data.result;
      this.dashboardJobsID = this.dashboardJobs._id;
      if (this.dashboardJobs.doc !== '') {this.showJd = true ; }
      if (this.dashboardJobs.sampleCV !== '') {this.showcv = true; this.sampleCV = this.dashboardJobs.sampleCV; }
      this.Jd = this.dashboardJobs.doc;
    }, (error) => {
      console.log(error);
    });
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
  replaceCV(form) {
    this.appService.replaceCV(this.ID, form).subscribe((data) => {
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
  // checkCandidateCvStatus(){
  //   this.array
  // }
  uploadCV(form) {
    this.appService.convertBaseToUploadCV(form).subscribe((data) => {
      console.log(data);
      this.checkStatusOfCv(data, this.caId);
    }, (err) => {
      console.log(err);
    });
  }
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
  onChange(event: EventTarget) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
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
         this.appService.makeUploadRequest(formdata).subscribe(response => {
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
  close() {
    this.modal2.hide();
    this.removeXlsx();
  }
  removeXlsx() {
    this.myInputVariable.nativeElement.value = '';
    this.showName = false;
    this.fileNameXlsx = '';
  }
  onSubmit() {
    console.log('here');
    if (this.ext === 'xlsx') {
      console.log('here2', this.responceFile);
      this.appService.readXLSX(this.responceFile).subscribe(res => {
        console.log(res);
        this.candidates = res['Sheet1'];
        console.log(this.candidates);
        this.addCVsToNull(this.candidates);
        this.modal1.hide();
        this.modal2.show();
      }, (err) => {
        console.log(err);
      });
      // this.appService.candidateBulkUploadRequest(this.dashboardJobsID, JSON.parse(this.userId), this.responceFile).subscribe(response => {
      //   this.candidates = response[0].candidates;
      //   for(let i = 0 ; i< this.candidates.length ;i++){
      //     if(this.candidates[i].cv != null){
      //       this.submit = true;
      //     }
      //   }
      //   console.log(this.candidates);
      //   this.modal1.hide();
      //   this.modal2.show();
      //   this.toastr.success("File uploaded successfully")
      //   console.log(response);
      //   for(let i = 0 ; i< this.candidates.length ;i++){
      //   if(! this.candidates[i].is_candidate_duplicate ){
      //       this.duplicacy =false;
      //   }
      // }
      //   console.log(this.candidates);

      //   this.ID = response[0]._id;
      // }, (error) => {
      //   console.log(error)
      // });
    } else {
      this.toastr.warning('Please select file');
    }

  }
  addCVsToNull(candidates) {
      for (let i = 0 ; i < candidates.length; i++) {
        candidates[i].cv = null ;
      }
  }

  generateXLSX() {
    const newList = [{
      NAME: '',
      AGE: '',
      SEX: '',
      EMAIL: '',
      EXPERIENCE: '',
      PHONE_NUMBER: '',
      QUALIFICATION: '',
      CURRENT_ORGANISATION: '',
      CTC: ''
    }];

    // newList = data.map(list => ({
    //   Date: 'list.createDataTime',
    //   BlockChain_Balance: list.blockchainWalletBalance,
    //   Address: list.walletAddress,
    //   Balance: list.walletBalance,
    //   Code: list.walletCode,
    //   Name: list.walletName,
    //   Status: list.status
    // }));
    console.log(newList);
    var array = typeof newList !== 'object' ? JSON.parse(newList) : newList;
    var str = '';
    var row = '';

    for (var index in newList[0]) {
      row += index + '\t';
      console.log(row);
    }
    row = row.slice(0, -1);
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line !== '') line += '\t';

        line += array[i][index];
      }
      str += line + '\r\n';
    }
    console.log(str);
    return str;
  }

  download() {
    var csvData = this.generateXLSX();
    var a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    // var blob = new Blob([csvData], { type: 'application/vnd.ms-excel' });
    var blob = new Blob([csvData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'List.xlsx';
    a.click();
    return 'success';
  }
  showCV(CV) {
    console.log(CV);
      window.open(CV, '_blank');
  }
  viewCV() {
    window.open(this.sampleCV, '_blank');
      }
  getDataAndDownlaodEXCEL() {
    // this.List = [];
    // this.download();
    // console.log("download sample");
    // const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    // const EXCEL_EXTENSION = '.xlsx';
    // const fileName = 'candidatelist';

    // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    // const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // const data: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    // FileSaver.saveAs(data, fileName + '_' + new Date().getTime() + EXCEL_EXTENSION);
    // console.log('finished download', data);
    this.router.navigate(['/assets/candidateList.xlsx']);
  }
  viewJD() {
    window.open(this.Jd, '_blank');
  }
}
