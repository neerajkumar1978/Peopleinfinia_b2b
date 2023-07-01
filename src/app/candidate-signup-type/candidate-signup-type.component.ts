import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonFunctionsService } from '../sheared';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.component.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-candidate-signup-type',
  templateUrl: './candidate-signup-type.component.html',
  styleUrls: ['./candidate-signup-type.component.css']
})
export class CandidateSignupTypeComponent implements OnInit {

  constructor(
    private router: Router,
    private service: AppService,
    private commanfunction: CommonFunctionsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }
  signUpFresher() {
    localStorage.setItem('TypeUser', 'Fresher');
    this.router.navigate ([ '/candidate/signup/personal'])
  }
  signUpProfessional() {
    localStorage.setItem('TypeUser', 'professional');
    this.router.navigate ([ '/candidate/signup/personal'])
  }
}
