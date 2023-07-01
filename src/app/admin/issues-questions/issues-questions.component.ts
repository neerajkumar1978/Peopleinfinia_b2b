import { Component, OnInit,ViewChild } from '@angular/core';
import { AppService } from '../../app.component.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { CommonFunctionsService } from '../../sheared/index';
import {Location} from '@angular/common';

@Component({
  selector: 'app-issues-questions',
  templateUrl: './issues-questions.component.html',
  styleUrls: ['./issues-questions.component.css']
})
export class IssuesQuestionsComponent implements OnInit {
  @ViewChild('clientModal', {static: true}) public modalR: ModalDirective;
  data;
  page = 1
  noDataI =false;
  ShowPagination = false;
  queryForm: FormGroup;
  submitted= false ;
  constructor(
    private appService:AppService,
    private _location: Location,
    private toastr: ToastrService,
    private commonFunctions: CommonFunctionsService
  ) { }

  ngOnInit() {
    this.getAllQuestions();
    this.initForm();
  }
  initForm(){
    this.queryForm = new FormGroup({
      query : new FormControl("",[
        Validators.required,
        Validators.pattern(this.commonFunctions.stringQuery),
      ])
    })
  }
  addIssue(){
    this.submitted = true;
    if (this.queryForm.valid) {
      var control = this.queryForm.controls;
       var form = {
        'question': control.query.value
      }
      this.createAnIssue(form);
    }

  }
  clearForm(){
    this.queryForm.setValue({
      query:""
    })
  }
  getAllQuestions(){
    this.data = [];
    this.appService.getAllAdminQuestions().subscribe((data)=>{
      // console.log(data['_body'])
      this.data = JSON.parse(data['_body']);
      console.log(this.data)
      if(this.data.length > 12 ) this.ShowPagination = true;
    },(err)=>{
      console.log(err);
    })
  }
  changeStatus(data,data1,id){
    var form ={
      "question": data1,
      "status": data
    }
    this.appService.updateQueryStatus(form,id).subscribe((data)=>{
      this.toastr.success("Updated");
      this.getAllQuestions();
    },(err)=>{
      console.log(err)
    })
  }
  createAnIssue(form){
    this.appService.adminCreateIssue(form).subscribe((Data)=>{
      if(Data['status'] === 200){
        this.toastr.success("Query Activated");
        this.clearForm();
        this.submitted = false;
        this.modalR.hide();
      }
     },(err)=>{
      this.toastr.error(err['_body'])
      // console.log(err);
    })
  }
  backClicked() {
    this._location.back();
  }
}
