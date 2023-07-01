import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AppService } from '../app.component.service';
import { CommonFunctionsService } from '../sheared';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-candidate-signup-employment',
  templateUrl: './candidate-signup-employment.component.html',
  styleUrls: ['./candidate-signup-employment.component.css']
})
export class CandidateSignupEmploymentComponent implements OnInit {
  employementForm: FormGroup;
  Notice = false;
  skills = [];
  uniqueId ;
  items = [];
  noticePeriod = [
    {value: '15 Days or less'},
    {value: '1 Month'},
    {value: '2 Months'},
    {value: '3 Months'},
    {value: 'More than 3 Months'},
  ];
  thousand = [
    {value: '0'},
    {value: '5'},
    {value: '10'},
    {value: '15'},
    {value: '20'},
    {value: '25'},
    {value: '30'},
    {value: '35'},
    {value: '40'},
    {value: '45'},
    {value: '50'},
    {value: '55'},
    {value: '60'},
    {value: '65'},
    {value: '70'},
    {value: '75'},
    {value: '80'},
    {value: '85'},
    {value: '90'},
    {value: '95'}
   ];
   years = [
    {value: '1981'},
    {value: '1982'},
    {value: '1983'},
    {value: '1984'},
    {value: '1985'},
    {value: '1986'},
    {value: '1987'},
    {value: '1988'},
    {value: '1989'},
    {value: '1990'},
    {value: '1991'},
    {value: '1992'},
    {value: '1993'},
    {value: '1994'},
    {value: '1995'},
    {value: '1996'},
    {value: '1997'},
    {value: '1998'},
    {value: '1999'},
    {value: '2000'},
    {value: '2001'},
    {value: '2002'},
    {value: '2003'},
    {value: '2004'},
    {value: '2005'},
    {value: '2006'},
    {value: '2007'},
    {value: '2008'},
    {value: '2009'},
    {value: '2010'},
    {value: '2011'},
    {value: '2012'},
    {value: '2013'},
    {value: '2014'},
    {value: '2015'},
    {value: '2016'},
    {value: '2017'},
    {value: '2018'},
    {value: '2019'}
  ];
  month = [
    {value: 'Jan'},
    {value: 'Feb'},
    {value: 'Mar'},
    {value: 'Apr'},
    {value: 'May'},
    {value: 'Jun'},
    {value: 'Jul'},
    {value: 'Aug'},
    {value: 'Sep'},
    {value: 'Oct'},
    {value: 'Nov'},
    {value: 'Dec'},
  ];
  date = [
    {value: '0'},
    {value: '1'},
    {value: '2'},
    {value: '3'},
    {value: '4'},
    {value: '5'},
    {value: '6'},
    {value: '7'},
    {value: '8'},
    {value: '9'},
    {value: '10'},
    {value: '11'},
    {value: '12'},
    {value: '13'},
    {value: '14'},
    {value: '15'},
    {value: '16'},
    {value: '17'},
    {value: '18'},
    {value: '19'},
    {value: '20'},
    {value: '21'},
    {value: '22'},
    {value: '23'},
    {value: '24'},
    {value: '25'},
    {value: '26'},
    {value: '27'},
    {value: '28'},
    {value: '29'},
    {value: '30'},
    {value: '31'},
  ];
  lakhs = [
    {value: '0'},
    {value: '1'},
    {value: '2'},
    {value: '3'},
    {value: '4'},
    {value: '5'},
    {value: '6'},
    {value: '7'},
    {value: '8'},
    {value: '9'},
    {value: '10'},
    {value: '11'},
    {value: '12'},
    {value: '13'},
    {value: '14'},
    {value: '15'},
    {value: '16'},
    {value: '17'},
    {value: '18'},
    {value: '19'},
    {value: '20'},
    {value: '21'},
    {value: '22'},
    {value: '23'},
    {value: '24'},
    {value: '25'},
    {value: '26'},
    {value: '27'},
    {value: '28'},
    {value: '29'},
    {value: '30'},
    {value: '31'},
    {value: '32'},
    {value: '33'},
    {value: '34'},
    {value: '35'},
    {value: '36'},
    {value: '37'},
    {value: '38'},
    {value: '39'},
    {value: '40'},
    {value: '41'},
    {value: '42'},
    {value: '43'},
    {value: '44'},
    {value: '45'},
    {value: '46'},
    {value: '47'},
    {value: '48'},
    {value: '49'},
    {value: '50'},
    {value: '55+'},
    {value: '60+'},
    {value: '65+'},
    {value: '70+'},
    {value: '75+'},
    {value: '80+'},
    {value: '85+'},
    {value: '90+'},
    {value: '95+'},
    {value: '100+'}
  ];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private commanfunction: CommonFunctionsService,
    private toaster: ToastrService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.uniqueId = params.id;
    })
  }
  ngOnInit() {
    this.formInit();
  }
  formInit() {
   this.employementForm = this.formBuilder.group({
    current_designation: new FormControl('', []),
    current_company: new FormControl('', []),
    current_salary_lakhs: new FormControl('', []),
    current_salary_thousand: new FormControl('', []),
    offered_salary_lakhs: new FormControl('', []),
    offered_salary_thousand: new FormControl('', []),
    offered_designation: new FormControl('', []),
    new_company: new FormControl('', []),
    on_notice: new FormControl(false, []),
    last_working_day_year: new FormControl('', []),
    last_working_day_month: new FormControl('', []),
    last_working_day_date: new FormControl('', []),
    experience_year: new FormControl('', []),
    experience_month: new FormControl('', []),
    current_location: new FormControl('', []),
    duration_notice_period: new FormControl('', []),
    skills: new FormControl('', []),
    employement: this.formBuilder.array([])
   });
  }
  onFormSubmit() {
    const controls = this.employementForm.controls;
    console.log(controls);
    const form = {
      'current_designation': controls.current_designation.value,
      'current_company': controls.current_company.value,
      'current_salary_lakhs': controls.current_salary_lakhs.value,
      'current_salary_thousand': controls.current_salary_thousand.value,
      'offered_salary_lakhs': controls.offered_salary_lakhs.value,
      'offered_salary_thousand': controls.offered_salary_thousand.value,
      'offered_designation': controls.offered_designation.value,
      'new_company': controls.new_company.value,
      'on_notice': controls.on_notice.value,
      'last_working_day_year': controls.last_working_day_year.value,
      'last_working_day_month': controls.last_working_day_month.value,
      'last_working_day_date': controls.last_working_day_date.value,
      'experience_year': controls.experience_year.value,
      'experience_month': controls.experience_month.value,
      'current_location': controls.current_location.value,
      'duration_notice_period': controls.duration_notice_period.value,
      'skills': this.skills,
      'employment': controls.employement.value,
    };
    console.log(form);
    this.appService.editprofileApplicant(form, this.uniqueId).subscribe((data) => {
      console.log(data);
      this.toaster.success(data.responseMessage);
      this.router.navigate(['/candidateHeader/signup/education/' + this.uniqueId]);

  });
  }
  addField() {
    const newFields = this.formBuilder.group({
    designation: new FormControl('', []),
    company: new FormControl('', []),
    duration_from_year: new FormControl('', []),
    duration_from_month: new FormControl('', []),
    duration_to_year: new FormControl('', []),
    duration_to_month: new FormControl('', []),
    });
    this.employement.push(newFields);
  }
  get employement() {
    return this.employementForm.get('employement') as FormArray;

  }
  noticeCheck() {
    this.Notice = !this.Notice;
  }
  onItemAdded(evt) {
    console.log(evt);
    this.skills.push(evt.display);
    console.log(this.skills);
  }
  onItemRemoved(evt){
    console.log(evt);
    const index = this.skills.indexOf(evt.display);
    if (index > -1) {
    this.skills.splice(index, 1);
    }
    console.log(this.skills);
  }
  checkDisablity() {
    if (this.employement.controls.length > 2)  {
      return false;
    } else {
      return true;
    }
  }
}
