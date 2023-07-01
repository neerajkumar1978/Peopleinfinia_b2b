import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { AppService } from '../app.component.service';
import { CommonFunctionsService } from '../sheared';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { PostjobService } from '../post-new-job/postjob.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css'],
})
export class CandidateProfileComponent implements OnInit {
  file = 'Enter your CV' ;
  progress_bar: any;
  applicantCV = '';
  applicantDownloadCV = '';
  candidateID;
  arrayItems = [];
  applicantEducation = [];
  courses;
  indus: any;
  indusd: any;
  func: any;
  specializations;
  profileSummary = '';
  profilePicture = '';
  form;
  selectFunctional = [];
  selectIndustry = [];
  selectFunctionalEnd : any = [];
  selectIndustryEnd :any = [];
  uniqueId;
  education = [];
  courseTypes = [
    { value: 'PART TIME' },
    { value: 'FULL TIME' },
    { value: 'CORRESPONDING' },
  ];
  disableLink = false;
  colleges;
  below10 = true;
  isEmployment = false;
  isEducation = false;
  isEducationForm = false;
  editCareerForm = false;
  editPersonalForm = false;
  applicantDetails;
  personalForm: FormGroup;
  employementForm: FormGroup;
  CvForm: FormGroup;
  desiredCareerForm: FormGroup;
  signupEducationForm: FormGroup;
  profileSummaryForm: FormGroup;
  resumeHeadlineForm: FormGroup;

  noticePeriod = [
    { value: '15 Days or less' },
    { value: '1 Month' },
    { value: '2 Months' },
    { value: '3 Months' },
    { value: 'More than 3 Months' },
  ];
  thousand = [
    { value: '0' },
    { value: '5' },
    { value: '10' },
    { value: '15' },
    { value: '20' },
    { value: '25' },
    { value: '30' },
    { value: '35' },
    { value: '40' },
    { value: '45' },
    { value: '50' },
    { value: '55' },
    { value: '60' },
    { value: '65' },
    { value: '70' },
    { value: '75' },
    { value: '80' },
    { value: '85' },
    { value: '90' },
    { value: '95' },
  ];
  years = [
    { value: '1951' },
    { value: '1952' },
    { value: '1953' },
    { value: '1954' },
    { value: '1955' },
    { value: '1956' },
    { value: '1957' },
    { value: '1958' },
    { value: '1959' },
    { value: '1960' },
    { value: '1961' },
    { value: '1962' },
    { value: '1963' },
    { value: '1964' },
    { value: '1965' },
    { value: '1966' },
    { value: '1967' },
    { value: '1968' },
    { value: '1969' },
    { value: '1970' },
    { value: '1971' },
    { value: '1972' },
    { value: '1973' },
    { value: '1974' },
    { value: '1975' },
    { value: '1976' },
    { value: '1977' },
    { value: '1978' },
    { value: '1979' },
    { value: '1980' },
    { value: '1981' },
    { value: '1982' },
    { value: '1983' },
    { value: '1984' },
    { value: '1985' },
    { value: '1986' },
    { value: '1987' },
    { value: '1988' },
    { value: '1989' },
    { value: '1990' },
    { value: '1991' },
    { value: '1992' },
    { value: '1993' },
    { value: '1994' },
    { value: '1995' },
    { value: '1996' },
    { value: '1997' },
    { value: '1998' },
    { value: '1999' },
    { value: '2000' },
    { value: '2001' },
    { value: '2002' },
    { value: '2003' },
    { value: '2004' },
    { value: '2005' },
    { value: '2006' },
    { value: '2007' },
    { value: '2008' },
    { value: '2009' },
    { value: '2010' },
    { value: '2011' },
    { value: '2012' },
    { value: '2013' },
    { value: '2014' },
    { value: '2015' },
    { value: '2016' },
    { value: '2017' },
    { value: '2018' },
    { value: '2019' },
  ];
  month = [
    { value: 'Jan' },
    { value: 'Feb' },
    { value: 'Mar' },
    { value: 'Apr' },
    { value: 'May' },
    { value: 'Jun' },
    { value: 'Jul' },
    { value: 'Aug' },
    { value: 'Sep' },
    { value: 'Oct' },
    { value: 'Nov' },
    { value: 'Dec' },
  ];
  date = [
    { value: '0' },
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '4' },
    { value: '5' },
    { value: '6' },
    { value: '7' },
    { value: '8' },
    { value: '9' },
    { value: '10' },
    { value: '11' },
    { value: '12' },
    { value: '13' },
    { value: '14' },
    { value: '15' },
    { value: '16' },
    { value: '17' },
    { value: '18' },
    { value: '19' },
    { value: '20' },
    { value: '21' },
    { value: '22' },
    { value: '23' },
    { value: '24' },
    { value: '25' },
    { value: '26' },
    { value: '27' },
    { value: '28' },
    { value: '29' },
    { value: '30' },
    { value: '31' },
  ];
  lakhs = [
    { value: '0' },
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '4' },
    { value: '5' },
    { value: '6' },
    { value: '7' },
    { value: '8' },
    { value: '9' },
    { value: '10' },
    { value: '11' },
    { value: '12' },
    { value: '13' },
    { value: '14' },
    { value: '15' },
    { value: '16' },
    { value: '17' },
    { value: '18' },
    { value: '19' },
    { value: '20' },
    { value: '21' },
    { value: '22' },
    { value: '23' },
    { value: '24' },
    { value: '25' },
    { value: '26' },
    { value: '27' },
    { value: '28' },
    { value: '29' },
    { value: '30' },
    { value: '31' },
    { value: '32' },
    { value: '33' },
    { value: '34' },
    { value: '35' },
    { value: '36' },
    { value: '37' },
    { value: '38' },
    { value: '39' },
    { value: '40' },
    { value: '41' },
    { value: '42' },
    { value: '43' },
    { value: '44' },
    { value: '45' },
    { value: '46' },
    { value: '47' },
    { value: '48' },
    { value: '49' },
    { value: '50' },
    { value: '55+' },
    { value: '60+' },
    { value: '65+' },
    { value: '70+' },
    { value: '75+' },
    { value: '80+' },
    { value: '85+' },
    { value: '90+' },
    { value: '95+' },
    { value: '100+' },
  ];
  items = [];
  qualificationsArray = [
    [
      { value: 'Doctrate PHD' },
      { value: 'Masters/Post Graduation' },
      { value: 'Graduation/Diploma' },
      { value: '12th' },
      { value: '10th' },
      { value: 'Below 10th' },
    ],
  ];
  editEducationForm = false;
  editHeadline = false;
  editProfileSummaryForm = false;
  editResumeHeadlineForm = false;
  Notice = false;
  editSkill = false;
  isEmloyment = false;
  cvAvailavble = false;
  editEmployementDetails = false;
  editCV = false;
  currentLocation = '';
  applicantName = '';
  applicantType = '';
  dropdownSettingsI;
  dropdownSettingsF;
  applicantEmail = '';
  applicantMobile = '';
  applicantEmployment = [];
  skills = [];
  functionalArea = [];
  industries = [];
  skill = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private postjobService: PostjobService,
    private appService: AppService,
    private commanfunction: CommonFunctionsService,
    private toaster: ToastrService
  ) {
    this.candidateID = localStorage.getItem('loginSessId');
    this.getIndustries();
    this.getFunctionalArea();
  }

  ngOnInit() {
    this.getDetails();
    this.employementFormInit();
    this.desiredCareerFormInit();
    this.pesonalFormInit();
    this.educationFormInit();
    this.profileSummaryFormInit();
    this.resumeHeadlineFormInit();
    this.initCvForm();
    // this.editResume();
    this.dropdownSettingsI = {
      singleSelection: false,
      idField: '_id',
      textField: 'value',
      enableCheckAll: false,
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.dropdownSettingsF = {
      singleSelection: false,
      idField: '_id',
      textField: 'value',
      enableCheckAll: false,
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
  initCvForm() {
    this.CvForm = new FormGroup({
      cv: new FormControl('', Validators.required),
    });
  }
  // DownloadCV() {
  //   window.open(this.applicantCV, '_blank');
  // }
  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('file: ', file);
      this.file = file.name;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.CvForm.get('cv').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1],
        });
      };
    }
  }

  async onProfilePicChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('file: ', file);
      await reader.readAsDataURL(file);
      reader.onload = async () => {
        this.form = {
          profile_pic: {
            filename: file.name,
            filetype: file.type,
            value: (<string>reader.result).split(',')[1],
          },
        };
        this.updateApplicantDetails(this.form);
      };
    }
  }

  updateCv() {
    const controls = this.CvForm.controls;
    const form = {
      cv: controls.cv.value,
    };
    console.log('cvDone');
    this.updateApplicantDetails(form);
    this.editResume();
  }
  updateApplicantDetails(form) {
    console.log("here",form);
    this.appService
      .editprofileApplicant(form, JSON.parse(this.candidateID))
      .subscribe(
        data => {
          console.log(data);
          this.getDetails();
          this.toaster.success('successfully updated');
          // this.falseAll();
        },
        err => {
          console.log(err);
        }
      );
  }
  falseAll() {
    this.cancelResumeHeadlineEmployement();
    this.editSkills();
    this.editEmployement();
    this.editEducation();
    this.editProfileSummary();
    this.editCareerEmployement();
    this.editPersonal();
  }
  profileSummaryFormInit() {
    this.profileSummaryForm = this.formBuilder.group({
      profile_summary: new FormControl('', []),
    });
  }
  editProfileSummary() {
    this.editProfileSummaryForm = !this.editProfileSummaryForm;
  }
  uploadProfileSummary() {
    // console.log('summary', this.profileSummary);
    const control = this.profileSummaryForm.controls;
    // console.log(control.resume_headline.value);
    const form = {
      profile_summary: control.profile_summary.value,
    };
    this.updateApplicantDetails(form);
    this.editProfileSummary();
  }

  cancelProfileSummaryEmployement() {
    this.editProfileSummary();
  }
  setProfileSummary() {
    this.profileSummaryForm.patchValue({
      profile_summary: this.applicantDetails.profile_summary,
    });
  }

  resumeHeadlineFormInit() {
    this.resumeHeadlineForm = this.formBuilder.group({
      resume_headline: new FormControl('', []),
    });
  }
  editResumeHeadline() {
    this.editResumeHeadlineForm = !this.editResumeHeadlineForm;
  }
  uploadResumeHeadline() {
    // console.log('summary', this.ResumeHeadline);
    const control = this.resumeHeadlineForm.controls;
    console.log(control.resume_headline.value);
    const form = {
      resume_headline: control.resume_headline.value,
    };
    this.updateApplicantDetails(form);
    this.editResumeHeadline();
  }

  cancelResumeHeadlineEmployement() {
    this.editResumeHeadline();
  }
  setResumeHeadline() {
    this.resumeHeadlineForm.patchValue({
      resume_headline: this.applicantDetails.resume_headline,
    });
  }

  getIndustries() {
    this.postjobService.getSuggestedIndustries().subscribe(
      res => {
        this.industries = res.result;
        console.log('industries12', this.industries);
        return res;
      },
      err => {
        console.log('Error occured');
        return err;
      }
    );
  }
  getFunctionalArea() {
    this.appService.getSuggestedFunctionalAreas().subscribe(
      res => {
        this.functionalArea = res.result;
        console.log("data",res);
        return res;
      },
      err => {
        console.log('Error occured');
        return err;
      }
    );
  }
  getDetails() {
    this.appService.getApplicantDetails(JSON.parse(this.candidateID)).subscribe(
      data => {
        console.log(data);
        this.applicantDetails = data;
        this.setDetails();
      },
      err => {
        console.log(err);
      }
    );
  }
  setDetails() {
    var bar =0, count =0;
    for (let [key, value] of Object.entries(this.applicantDetails)){
      if(value !== null){
        count = count+1;
        bar = bar + 2;
      }
    }
    if(bar>= 100)
    this.progress_bar = 100;
    else
    this.progress_bar = bar;
    this.applicantName = this.applicantDetails.name;
    this.applicantEmail = this.applicantDetails.email_id;
    this.applicantMobile = this.applicantDetails.mobile;
    this.profilePicture = this.applicantDetails.profile_pic;
    debugger
    this.currentLocation = this.applicantDetails.current_location;
    this.applicantType = this.applicantDetails.type;
    this.applicantCV = this.applicantDetails.cv[0].resumeName;
    this.applicantDownloadCV = this.applicantDetails.cv[0].resume_path;
    console.log(this.applicantDownloadCV)
    // if (this.applicantDetails.cv[0] === undefined) {
    //   this.cvAvailavble = false;
    // } else {
    //   // this.applicantCV = this.applicantDetails.name_resume;
    //   this.cvAvailavble = true;
    // }
    this.setSkills();
    this.setEmployment();
    this.setCarrerEmployement();
    this.setPersonalForm();
    this.setEducation();
    this.setProfileSummary();
    this.setResumeHeadline();
    // this.setEducation();
  }

  updateEducationForm() {
    const controls = this.signupEducationForm.controls;
    const form = {
      education: controls.education.value,
    };
    this.updateApplicantDetails(form);
    this.editEducation();
  }
  cancelEducationForm() {}
  editEducation() {
    this.editEducationForm = !this.editEducationForm;
  }
  setEducation() {
    console.log(this.applicantDetails.education);
    this.applicantEducation = this.applicantDetails.education;
    console.log(this.applicantEducation);
    if (this.applicantEducation === []) {
      this.isEducation = false;
    } else {
      this.isEducation = true;
      this.applicantEducation = this.applicantDetails.education;
    }
    console.log(this.applicantEducation);
    this.educations.controls = [];
    console.log(this.applicantEducation);

    for (const i of this.applicantEducation) {
      // const x: any = [...i];
      // delete x._id;
      this.addfieldsFormGroup();
    }
    this.courses = {
      'Doctrate PHD': [
        { value: 'Ph.D/Doctorate' },
        { value: 'MPHIL' },
        { value: 'other' },
      ],
      'Masters/Post Graduation': [
        { value: 'CA' },
        { value: 'CS' },
        { value: 'DM' },
        { value: 'ICWA' },
        { value: 'Integrated PG' },
        { value: 'LLM' },
        { value: 'M.A' },
        { value: 'M.Arch' },
        { value: 'M.Ch' },
        { value: 'M.COM' },
        { value: 'M.Des.' },
        { value: 'M.Ed' },
        { value: 'M.Pharma' },
        { value: 'MS/M.Sc(Science)' },
        { value: 'M.Tech' },
        { value: 'MBA/PGDM' },
        { value: 'MCA' },
        { value: 'MCM' },
        { value: 'MDS' },
        { value: 'MFA' },
        { value: 'Medical-MS/MD' },
        { value: 'MVSC' },
        { value: 'PG Diploma' },
        { value: 'other' },
      ],
      'Graduation/Diploma': [
        { value: 'B.A' },
        { value: 'B.Arch' },
        { value: 'B.B.A/B.M.S' },
        { value: 'B.Com' },
        { value: 'B.Des.' },
        { value: 'B.Ed' },
        { value: 'B.EI.Ed' },
        { value: 'B.p.Ed' },
        { value: 'B.Pharma' },
        { value: 'B.Sc'},
        { value: 'B.Tech/BE' },
        { value: 'B.U.M.S' },
        { value: 'BAMS' },
        { value: 'BCA' },
        { value: 'BFA' },
        { value: 'BHM' },
        { value: 'BHMS' },
        { value: 'BVSC' },
        { value: 'Diploma' },
        { value: 'LLB' },
        { value: 'MBBS' },
        { value: 'Other' },
      ],
      '12th': [
        { value: 'BOARD' },
        { value: 'All India' },
        { value: 'CBSE' },
        { value: 'CISCE(ICSE/ISC)' },
        { value: 'Diploma' },
        { value: 'National Open School' },
        { value: 'IB(International Baccalaureate)' },
        { value: 'STATE BOARD' },
        { value: 'Andhra Pradesh' },
        { value: 'Assam' },
        { value: 'Bihar' },
        { value: 'Goa' },
        { value: 'Gujrat' },
        { value: 'Haryana' },
        { value: 'J & K' },
        { value: 'Karnataka' },
        { value: 'Kerala' },
        { value: 'Maharastra' },
        { value: 'Madhya Pradesh' },
        { value: 'Manipur' },
        { value: 'Meghalaya' },
        { value: 'Mizoram' },
        { value: 'Nagaland' },
        { value: 'Orissa' },
        { value: 'Punjab ' },
        { value: 'Rajasthan' },
        { value: 'Tamil Nadu' },
        { value: 'Tirpura' },
        { value: 'Uttar Pradesh' },
        { value: 'West Bengal' },
        { value: 'Other' },
      ],
      '10th': [
        { value: 'BOARD' },
        { value: 'All India' },
        { value: 'CBSE' },
        { value: 'CISCE(ICSE/ISC)' },
        { value: 'Diploma' },
        { value: 'National Open School' },
        { value: 'IB(International Baccalaureate)' },
        { value: 'STATE BOARD' },
        { value: 'Andhra Pradesh' },
        { value: 'Assam' },
        { value: 'Bihar' },
        { value: 'Goa' },
        { value: 'Gujrat' },
        { value: 'Haryana' },
        { value: 'J & K' },
        { value: 'Karnataka' },
        { value: 'Kerala' },
        { value: 'Maharastra' },
        { value: 'Madhya Pradesh' },
        { value: 'Manipur' },
        { value: 'Meghalaya' },
        { value: 'Mizoram' },
        { value: 'Nagaland' },
        { value: 'Orissa' },
        { value: 'Punjab ' },
        { value: 'Rajasthan' },
        { value: 'Tamil Nadu' },
        { value: 'Tirpura' },
        { value: 'Uttar Pradesh' },
        { value: 'West Bengal' },
        { value: 'Other' },
      ],
      'Below 10th': [{ value: 'Below 10th' }],
    };
    this.specializations = {
      'B.A': [
        { value: 'Arts&Humanities' },
        { value: 'Communication ' },
        { value: 'Economics' },
        { value: 'English' },
        { value: 'Film' },
        { value: 'Fine arts' },
        { value: 'Hindi' },
        { value: 'History' },
        { value: 'Hotel Management' },
        { value: 'Journalism' },
        { value: 'Maths' },
        { value: 'Pass Course' },
        { value: 'Political Science' },
        { value: 'PR/Advertising' },
        { value: 'Psychology' },
        { value: 'Sanskrit' },
        { value: 'Sociology ' },
        { value: 'Statistics ' },
        { value: 'Vocational Course' },
        { value: 'Other' },
      ],
      'B.Arch': [{ value: 'Architecture' }, { value: 'Other' }],
      'B.B.A/B.M.S': [{ value: 'Management' }, { value: 'Other' }],
      'B.Com': [{ value: 'Commerce' }, { value: 'Other' }],
      'B.Des.': [
        { value: 'Animation Film Design' },
        { value: 'Ceramic & Glass Design' },
        { value: 'Exhibition Design' },
        { value: 'Film and Video Communication' },
        { value: 'Furniture Design' },
        { value: 'Graphic Design' },
        { value: 'Product Design' },
        { value: 'Textile Design' },
        { value: 'Other' },
      ],
      'B.Ed': [{ value: 'Education' }, { value: 'Other' }],
      'B.EI.Ed': [{ value: 'Elementary Education' }, { value: 'Other' }],
      'B.p.Ed': [{ value: 'Physical Education' }, { value: 'Other' }],
      'B.Pharma': [{ value: 'Pharmacy' }, { value: 'Other' }],
      'B.Sc':[
        { value: 'Aerospace & Mechanical Engineering' },
        { value: 'Agriculture' },
        { value: 'Anthropology' },
        { value: 'Astronautical Engineering' },
        { value: 'Bio-Chemistry' },
        { value: 'Biology' },
        { value: 'Biotechnology' },
        { value: 'Botany' },
        { value: 'Chemical Engineering & Materials Science' },
        { value: 'Chemistry' },
        { value: 'Civil & Environmental Engineering' },
        { value: 'Computer' },
        { value: 'Cyber Security Engineering' },
        { value: 'Dairy Technology' },
        { value: 'Data Informatics' },
        { value: 'Electrical Engineering' },
        { value: 'Electronics' },
        { value: 'Electronics & Embedded Technology' },
        { value: 'Environmental Science' },
        { value: 'Food Technology' },
        { value: 'Geology' },
        { value: 'Home Science' },
        { value: 'Hospitality Administration' },
        { value: 'Industrial & Systems Engineering' },
        { value: 'Marine Engineering' },
        { value: 'Maths' },
        { value: 'Mechanical Engineering' },
        { value: 'Mechatronics' },
        { value: 'Microbiology' },
        { value: 'Nursingv' },
        { value: 'Optometry' },
        { value: 'Organic Chemistry' },
        { value: 'Petroleum Engineering' },
        { value: 'Physics' },
        { value: 'Statistics' },
        { value: 'Systems Architecting and Engineering' },
        { value: 'Veterinary Science' },
        { value: 'Zoology' },
        { value: 'Other' },
      ],
      'B.Tech/BE': [
        { value: 'Agriculture ' },
        { value: 'Anthropology' },
        { value: 'Bio-Chemistry' },
        { value: 'Biology' },
        { value: 'Botany ' },
        { value: 'Chemistry' },
        { value: 'Computers' },
        { value: 'Dairy Technology' },
        { value: 'Electronics' },
        { value: 'Environmental Science' },
        { value: 'Food Technology ' },
        { value: 'General' },
        { value: 'Geology' },
        { value: 'Home Science' },
        { value: 'Hospitality and Hotel Management' },
        { value: 'Maths' },
        { value: 'Microbiology' },
        { value: 'Nursing ' },
        { value: 'Optometry' },
        { value: 'Physics ' },
        { value: 'Statistics' },
        { value: 'Zoology ' },
        { value: 'Other' },
      ],
      'B.U.M.S': [{ value: 'Unani Medicine' }, { value: 'Other' }],
      BAMS: [{ value: 'Ayurveda' }, { value: 'Other' }],
      BCA: [{ value: 'Computers' }, { value: 'Other' }],
      BFA: [{ value: 'Dentistry' }, { value: 'Other' }],
      BHM: [
        { value: 'Art History' },
        { value: 'Painting' },
        { value: 'Printmaking' },
        { value: 'Sculpture' },
        { value: 'Visual Communication' },
        { value: 'Other' },
      ],
      BHMS: [{ value: 'Hotel Management' }, { value: 'Other' }],
      BVSC: [{ value: 'Veterinary Science' }, { value: 'Other' }],
      Diploma: [
        { value: 'Architecture' },
        { value: 'Chemical' },
        { value: 'Civil' },
        { value: 'Computers' },
        { value: 'Electrical' },
        { value: 'Electronics/Telecommunication ' },
        { value: 'Engineering' },
        { value: 'Export/Import' },
        { value: 'Fashion Designing/Other Designing' },
        { value: 'Graphic/Web Designing' },
        { value: 'Hotel Management' },
        { value: 'Insurance' },
        { value: 'Management' },
        { value: 'Mechanical' },
        { value: 'Tourism' },
        { value: 'vISUAL Arts' },
        { value: 'Vocational Course' },
        { value: 'Other' },
      ],
      LLB: [{ value: 'Law' }, { value: 'Other' }],
      MBBS: [{ value: 'Medicine' }, { value: 'Other' }],

      'M.Arch': [{ value: 'Architecture' }, { Other: 'Other' }],
      'M.Ch': [
        { value: 'Burns & Plastic Surgery' },
        { value: 'Cardio Thoracic and Vascular Surgery' },
        { value: 'Cardio Thoracic Surgery' },
        { value: 'Endocrine Surgery' },
        { value: 'Gynaecological Oncology' },
        { value: 'Hand & Micro Surgery' },
        { value: 'Hand Surgery' },
        { value: 'Hepato Pancreato Biliary Surgery' },
        { value: 'Neuro Surgery' },
        { value: 'Oncology' },
        { value: 'Pediatric Cardio-Thoracic Vascular Surgery' },
        { value: 'Pediatric Surgery' },
        { value: 'Plastic & Reconstructive Surgery' },
        { value: 'Plastic Surgery' },
        { value: 'Surgical Gastroenterology/G.I.Surgery' },
        { value: 'Surgical Oncology' },
        { value: 'Thoracic Surgery' },
        { value: 'Urology' },
        { value: 'Urology/Genito-Urinary Surgery' },
        { value: 'Vascular Surgery' },
        { value: 'Other' },
      ],
      'M.COM': [{ value: 'Commerce' }, { value: 'Other' }],
      'M.Des.': [
        { value: '' },
        { value: 'Animation Film Design' },
        { value: 'Apparel Design' },
        { value: 'Ceramic & Glass Design' },
        { value: 'Design for Retail Experience' },
        { value: 'Digital Game Design' },
        { value: 'Film and Video Communication' },
        { value: 'Furniture Design' },
        { value: ' Graphic Design' },
        { value: 'Information Design' },
        { value: 'Interaction Design' },
        { value: 'Lifestyle Accessory Design' },
        { value: 'New Medio Design' },
        { value: 'Photography Design' },
        { value: 'Product Design' },
        { value: 'Strategic Design Management' },
        { value: 'Textile Design' },
        { value: 'Toy & Game Design' },
        { value: 'Transportation & Automobile Design' },
        { value: 'Universal Design' },
        { value: 'Other' },
      ],
      'M.Ed': [{ value: 'Education' }, { value: 'other' }],
      'M.Pharma': [{ value: 'Pharmacy' }, { value: 'other' }],
      'MS/M.Sc(Science)': [
        { value: 'Aerospace & Mechanical Engineering' },
        { value: 'Agriculture' },
        { value: 'Anthropology' },
        { value: 'Astronautical Engineering' },
        { value: 'Bio-Chemistry' },
        { value: 'Biology' },
        { value: 'Biotechnology' },
        { value: 'Botany' },
        { value: 'Chemical Engineering & Materials Science' },
        { value: 'Chemistry' },
        { value: 'Civil & Environmental Engineering' },
        { value: 'Computer' },
        { value: 'Cyber Security Engineering' },
        { value: 'Dairy Technology' },
        { value: 'Data Informatics' },
        { value: 'Electrical Engineering' },
        { value: 'Electronics' },
        { value: 'Electronics & Embedded Technology' },
        { value: 'Environmental Science' },
        { value: 'Food Technology' },
        { value: 'Geology' },
        { value: 'Home Science' },
        { value: 'Hospitality Administration' },
        { value: 'Industrial & Systems Engineering' },
        { value: 'Marine Engineering' },
        { value: 'Maths' },
        { value: 'Mechanical Engineering' },
        { value: 'Mechatronics' },
        { value: 'Microbiology' },
        { value: 'Nursingv' },
        { value: 'Optometry' },
        { value: 'Organic Chemistry' },
        { value: 'Petroleum Engineering' },
        { value: 'Physics' },
        { value: 'Statistics' },
        { value: 'Systems Architecting and Engineering' },
        { value: 'Veterinary Science' },
        { value: 'Zoology' },
        { value: 'Other' },
      ],
      'M.Tech': [
        { value: 'Agriculture' },
        { value: 'Automobile' },
        { value: 'Aviation' },
        { value: 'Bio-Chemistry/Bio-Technology' },
        { value: 'Biomedical' },
        { value: 'Ceramics' },
        { value: 'Chemical' },
        { value: 'Civil' },
        { value: 'Computers' },
        { value: 'Electrical' },
        { value: 'Electronics/Telecommunication' },
        { value: 'Energy' },
        { value: 'Environmental' },
        { value: 'Instrumentation' },
        { value: 'Marine' },
        { value: 'Mechanical' },
        { value: 'Metallurgy' },
        { value: 'Mineral' },
        { value: 'Mining' },
        { value: 'Nuclear' },
        { value: 'Other Engineering' },
        { value: 'Paint/Oil' },
        { value: 'Petroleum' },
        { value: 'Plastics' },
        { value: 'Production/Industrial' },
        { value: 'Textile' },
        { value: 'Other' },
      ],
      'MBA/PGDM': [
        { value: 'Advertising/Mass Communication' },
        { value: 'Finance' },
        { value: 'Hospitality Management' },
        { value: 'HR/Industrial Relations' },
        { value: 'Information Technology' },
        { value: 'International Business' },
        { value: 'Marketing' },
        { value: 'Operations' },
        { value: 'Other Management' },
        { value: 'Systems' },
        { value: 'Other' },
      ],
      MCA: [{ value: 'COMPUTERS' }, { value: 'Other' }],
      MCM: [{ value: 'Computers and Management' }, { value: 'Other' }],
      MDS: [{ value: 'Dentistry' }, { value: 'Other' }],
      MFA: [
        { value: 'Printmaking' },
        { value: 'Sculpture' },
        { value: 'Visual Communication' },
        { value: 'Other' },
      ],
      'Medical-MS/MD': [
        { value: 'Anaesthesiology' },
        { value: 'Anatomy' },
        { value: 'Aviation Medicine/Aerospace Medicine' },
        { value: 'Ayurveda' },
        { value: 'Bio-Chemistry' },
        { value: 'Bio-Physics' },
        { value: 'Blood Banking & Immuno. Haem/Imm & Blood Trans' },
        { value: 'Cardiology' },
        { value: 'CCM' },
        { value: 'Dermatology' },
        { value: 'Emergency Medicine' },
        { value: 'ENT' },
        { value: 'Forensic Medicine/Forensic Medicine & Toxicology' },
        { value: 'General Practitioner' },
        { value: 'General Surgery' },
        { value: 'Geriatrics' },
        { value: 'Gyneocology' },
        { value: 'Health Administration' },
        { value: 'Hepatology' },
        { value: 'Hospital Administration' },
        { value: 'Immunology' },
        { value: 'Leb Medicine' },
        { value: 'Maternity & Child Health' },
        { value: 'Medical Genetics' },
        { value: 'Microbiology' },
        { value: 'Neonatal' },
        { value: 'Nephrology' },
        { value: 'Neuro Surgery' },
        { value: 'Nuclear Medicine' },
        { value: 'Obstretrics' },
        { value: 'Oncology' },
        { value: 'Opthalmology' },
        { value: 'Orthopaedic' },
        { value: 'P.S.M' },
        { value: 'Palliative Medicine' },
        { value: 'Pathology' },
        { value: 'Pediatrics' },
        { value: 'Pharmacology' },
        { value: 'Physical Medicine & Rehabilitation' },
        { value: 'Psychiatry' },
        { value: 'Psychology' },
        { value: 'Public Health (Epidemiology)' },
        { value: 'Pulmonary Medicine' },
        { value: 'R&d' },
        { value: 'Radiology' },
        { value: 'Radiotherapy' },
        { value: 'Rheumatology' },
        { value: 'Social & Preventive Medicine/ Community Medicine' },
        { value: 'Sports Medicine' },
        { value: 'Thoracic Medicine' },
        { value: 'Traumatology and Surgery' },
        { value: 'Tropical Medicine' },
        { value: 'Tuberculosis & Respiratory Diseases/ Pulmonary Medicine' },
        { value: 'Unani' },
        { value: 'Urology' },
        { value: 'Venereology' },
        { value: 'Other' },
      ],
      MVSC: [{ value: 'Veterinary Science' }, { value: 'Other' }],
      'PG Diploma': [
        { value: 'Chemical' },
        { value: 'Civil' },
        { value: 'Computers' },
        { value: 'Electrical' },
        { value: 'Electronics' },
        { value: 'Mechanical' },
        { value: 'Other' },
      ],
      LLM: [{ value: 'LLM' }, { value: 'other' }],
      'M.A': [
        { value: 'Anthropology' },
        { value: 'Arts & Humanities' },
        { value: 'Communication ' },
        { value: 'Economics' },
        { value: 'English' },
        { value: 'Film' },
        { value: 'Fine arts' },
        { value: 'Hindi' },
        { value: 'History' },
        { value: 'Journalism' },
        { value: 'Maths' },
        { value: 'Political Science' },
        { value: 'PR/Advertising' },
        { value: 'Psychology' },
        { value: 'Sanskritv' },
        { value: 'Sociology' },
        { value: 'Statistics' },
        { value: 'Other' },
      ],
      'Integrated PG': [
        { value: 'Journalism/Mass Communication' },
        { value: 'Management' },
        { value: 'PR/Advertising' },
        { value: 'Tourism' },
        { value: 'Other' },
      ],
      ICWA: [{ value: 'ICWA (CMA)' }, { value: 'other' }],
      other: [{ value: 'other' }],
      CA: [
        { value: 'CA' },
        { value: 'First Attempt ' },
        { value: 'Pursuing' },
        { value: 'Second Attempt' },
        { value: 'Other' },
      ],
      CS: [{ value: 'CS' }, { value: 'other' }],
      DM: [
        { value: 'Cardiac-Anaes' },
        { value: 'Cardiology' },
        { value: 'Child & Adolescent Psychiatry' },
        { value: 'Clinical haematology' },
        { value: 'Clinical immunology' },
        { value: 'Clinical Pharmacology' },
        { value: 'Critical Care Medicine' },
        { value: 'Endocrinology' },
        { value: 'Gastroenterology' },
        { value: 'Geriatric Mental Health' },
        { value: 'Haematology Pathology' },
        { value: 'Hepatology' },
        { value: 'Immunology' },
        { value: 'Infectious Diseases' },
        { value: 'Medical Genetics' },
        { value: 'Neonatology' },
        { value: 'Nephrology' },
        { value: 'Neuro Anaesthesia' },
        { value: 'Neuro Radiology' },
        { value: 'Neurology' },
        { value: 'Oncology' },
        { value: 'Organ Transplant Anaesthesia & Critical Care' },
        { value: 'Pediatric Anaesthesia' },
        { value: 'Pediatric Cardiology' },
        { value: 'Pediatric Gastroenterology' },
        { value: 'Pediatric Hepatology' },
        { value: 'Pediatric Nephrology' },
        { value: 'Pediatric Oncology' },
        { value: 'Pulmonary Med & Critical Care Med' },
        { value: 'Pulmonary Medicine' },
        { value: 'Reproductive Medicine' },
        { value: 'Rheumatology' },
        { value: 'Virology' },
        { value: 'Other' },
      ],
      MPHIL: [
        { value: 'Advertising/Mass Communication' },
        { value: 'Agriculture ' },
        { value: 'Anthropology ' },
        { value: 'Architecture ' },
        { value: 'Arts & Humanities ' },
        { value: 'Astrophysics ' },
        { value: 'Automobile ' },
        { value: 'Aviation ' },
        { value: 'Bio-Chemistry/Bio-Technology ' },
        { value: 'Biomedical ' },
        { value: 'Biophysics ' },
        { value: 'Biotechnology ' },
        { value: 'Botany ' },
        { value: 'Ceramics' },
        { value: 'Chemical ' },
        { value: 'Chemistry ' },
        { value: 'Civil ' },
        { value: 'Commerce' },
        { value: 'Communication' },
        { value: 'Computers ' },
        { value: 'Dairy Technology' },
        { value: 'Dermatology ' },
        { value: 'Economics ' },
        { value: 'Education ' },
        { value: 'Electrical ' },
        { value: 'Electronics/Telecommunication ' },
        { value: 'Energy ' },
        { value: 'ENT ' },
        { value: 'Environmental ' },
        { value: 'Fashion Designing/Other Designing ' },
        { value: 'Film ' },
        { value: 'Finance' },
        { value: 'Fine arts' },
        { value: 'Food Technology' },
        { value: 'Genetics ' },
        { value: 'History ' },
        { value: 'Home Science' },
        { value: 'Hotel Management' },
        { value: 'HR/Industrial Relations ' },
        { value: 'Immunology ' },
        { value: 'Instrumentation' },
        { value: ' International Business' },
        { value: ' Journalism ' },
        { value: 'Law ' },
        { value: 'Linguistics' },
        { value: 'Literature ' },
        { value: 'Marine ' },
        { value: 'Marketing' },
        { value: 'Maths ' },
        { value: 'Mechanical' },
        { value: 'Medicine' },
        { value: 'Metallurgy' },
        { value: 'Microbiology' },
        { value: 'Mineral ' },
        { value: 'Mining ' },
        { value: 'Music ' },
        { value: 'Neonatal' },
        { value: 'Nuclear ' },
        { value: 'Nursing ' },
        { value: 'Obstetrics' },
        { value: 'Other Arts ' },
        { value: 'Other Doctorate ' },
        { value: 'Other Engineering' },
        { value: 'Other Management ' },
        { value: 'Other Science ' },
        { value: 'Paint/Oil ' },
        { value: 'Pathology ' },
        { value: 'Pediatrics ' },
        { value: 'Petroleum ' },
        { value: 'Pharmacy ' },
        { value: 'Philosophy' },
        { value: 'Physical Education ' },
        { value: 'Physics ' },
        { value: 'Plastics ' },
        { value: 'Political Science ' },
        { value: 'Production/Industrial' },
        { value: 'Psychiatry ' },
        { value: 'Psychology ' },
        { value: 'Radiology ' },
        { value: 'Rheumatology' },
        { value: 'Sanskrit ' },
        { value: 'Sociology ' },
        { value: 'Special Education' },
        { value: 'Statistics ' },
        { value: 'Systems ' },
        { value: 'Textile ' },
        { value: 'Vocational Courses ' },
        { value: 'Zoology' },
        { value: 'Other ' },
      ],
      'Ph.D/Doctorate': [
        { value: 'Advertising/Mass Communication' },
        { value: 'Agriculture ' },
        { value: 'Anthropology ' },
        { value: 'Architecture ' },
        { value: 'Arts & Humanities ' },
        { value: 'Astrophysics ' },
        { value: 'Automobile ' },
        { value: 'Aviation ' },
        { value: 'Bio-Chemistry/Bio-Technology ' },
        { value: 'Biomedical ' },
        { value: 'Biophysics ' },
        { value: 'Biotechnology ' },
        { value: 'Botany ' },
        { value: 'Ceramics' },
        { value: 'Chemical ' },
        { value: 'Chemistry ' },
        { value: 'Civil ' },
        { value: 'Commerce' },
        { value: 'Communication' },
        { value: 'Computers ' },
        { value: 'Dairy Technology' },
        { value: 'Dermatology ' },
        { value: 'Economics ' },
        { value: 'Education ' },
        { value: 'Electrical ' },
        { value: 'Electronics/Telecommunication ' },
        { value: 'Energy ' },
        { value: 'ENT ' },
        { value: 'Environmental ' },
        { value: 'Fashion Designing/Other Designing ' },
        { value: 'Film ' },
        { value: 'Finance' },
        { value: 'Fine arts' },
        { value: 'Food Technology' },
        { value: 'Genetics ' },
        { value: 'History ' },
        { value: 'Home Science' },
        { value: 'Hotel Management' },
        { value: 'HR/Industrial Relations ' },
        { value: 'Immunology ' },
        { value: 'Instrumentation' },
        { value: ' International Business' },
        { value: ' Journalism ' },
        { value: 'Law ' },
        { value: 'Linguistics' },
        { value: 'Literature ' },
        { value: 'Marine ' },
        { value: 'Marketing' },
        { value: 'Maths ' },
        { value: 'Mechanical' },
        { value: 'Medicine' },
        { value: 'Metallurgy' },
        { value: 'Microbiology' },
        { value: 'Mineral ' },
        { value: 'Mining ' },
        { value: 'Music ' },
        { value: 'Neonatal' },
        { value: 'Nuclear ' },
        { value: 'Nursing ' },
        { value: 'Obstetrics' },
        { value: 'Other Arts ' },
        { value: 'Other Doctorate ' },
        { value: 'Other Engineering' },
        { value: 'Other Management ' },
        { value: 'Other Science ' },
        { value: 'Paint/Oil ' },
        { value: 'Pathology ' },
        { value: 'Pediatrics ' },
        { value: 'Petroleum ' },
        { value: 'Pharmacy ' },
        { value: 'Philosophy' },
        { value: 'Physical Education ' },
        { value: 'Physics ' },
        { value: 'Plastics ' },
        { value: 'Political Science ' },
        { value: 'Production/Industrial' },
        { value: 'Psychiatry ' },
        { value: 'Psychology ' },
        { value: 'Radiology ' },
        { value: 'Rheumatology' },
        { value: 'Sanskrit ' },
        { value: 'Sociology ' },
        { value: 'Special Education' },
        { value: 'Statistics ' },
        { value: 'Systems ' },
        { value: 'Textile ' },
        { value: 'Vocational Courses ' },
        { value: 'Zoology' },
        { value: 'Other ' },
      ],
      'Graduation/Diploma': [{ value: 'Graduation/Diploma' }],
      '12th': [{ value: '12th' }],
      '10th': [{ value: '10th' }],
      'Below 10th': [{ value: 'Below 10th' }],
    };
    this.colleges = [
     { value: 'A. V. C. College, Nagapattinam ' },
     { value: 'A J College of Science & Technology, Thiruvananthapuram'},
     { value:'A N Magadh Medical College Gaya'},
     { value:'A V College of Science, Hyderabad'},
     { value:'A. V. C. College, Nagapattinam'}, 
     { value:'A. V. C. College, Nagapattinam'}, 
     { value:'A. V. C. College, Nagapattinam'}, 
     { value:'Abdul Qadir Jeelani Centre for PG Studies'},
     { value:'ABES Institute of Technology, [ABESIT] Ghaziabad'},
     { value:'Academic Staff College, Thiruvananthapuram'},
     { value:'Academy of Animation & Gaming (AAG), Noida'},
     { value:'Accman Institute of Management, Greater Noida'},
     { value:'Accurate Institute of Management & Technology, Greater Noida'},
     { value:'Accurate Institute of Management and Technology, Noida'},
     { value:'Acharya Institute of Technology, [AIT] Bangalore'},
     { value:'Acharya Narendra Dev College, New Delhi'},
     { value:'Acharya Narendra Dev College, New Delhi'}, 
     { value:'Acharya Narendra Dev College, New Delhi'},
     { value:'Delhi, Delhi NCR'},
     { value:'ACSR Government Medical College Nellore'},
     { value:'Adarsh Arts and Commerce College, Raipur'},
     { value:'Adarsh Arts and Commerce College, Raipur'},
     { value:'Adesh Institute of Medical Sciences & Research Bhatinda'},
     { value:'Aditya College of Engineering & Technology, [ACET] Surampalem'},
     { value:'Advanced Institute of Management [AIM], New Delhi'},
     { value:'Advanced Institute of Technology & Management (Advanced Educational Institutions), Faridabad'},
     { value:'Aeronautical Training Institute, Lucknow'},
     { value:'Ahmedabad Municipal Corporation Medical Education Trust Medical College'},
     { value:'AIMS Institutes, [AIMS] Bangalore'},
     { value:'Al Ameen Law College Bangalore'},
     { value:'Al-Ameen Medical College Bijapur'},
     { value:'Al-Falah School of Engineering and Technology, Faridabad'},
     { value:'Aligarh College of Engineering and Technology, [ACET] Aligarh'},
     { value:'Aligarh Muslim University'},
     { value:'All India Institute of Medical Sciences'},
     { value:'All India Institute of Medical Sciences, Raebareli'},
     { value:'All Saints College, Thiruvananthapuram'},
     { value:'Allama Iqbal Institute of Management, Thiruvananthapuram'},
{ value:'Allhabad chaper of Institute of Chartered Accountants of India (ICAI ), Allahabad'},
{ value:'Amity Business School'},
{ value:'Amity Business School (ABS), Noida'},
{ value:'Amity Business School, delhi'},
{ value:'Amity Law School Noida'},
{ value:'Amity Law School, Noida'},
{ value:'Amity School Of Communication, Noida'},
{ value:'Amity School Of Communication, Noida'},
{ value:'Amity School of Engineering & Technology,Noida, Uttar Pradesh'},
{ value:'Amity School of Fashion Technology, Noida'},
{ value:'Amity University'},
{ value:'Amity University'},
{ value:'Amity University Noida'},
{ value:'Amity University, Gurugram'},
{ value:'Amity University, Gwalior'},
{ value:'Amity University, Noida'},
{ value:'Amity University, Patna'},
{ value:'Amity University, Uttar Pradesh'},
{ value:'Amrita Institute of Management'},
{ value:'Amrita Institute of Medical Sciences (AIMS) Kochi'},
{ value:'Amrita School of Engineering,Coimbatore, Tamil Nadu'},
{ value:'Amrita University'},
{ value:'Amrut Mody School of Management, Ahmedabad University'},
{ value:'Anand Law College Anand'},
{ value:'Andaman & Nicobar Islands Institute of Medical Sciences, Port Blair'},
{ value:'Andhra Christian College of Law Guntur'},
{ value:'Andhra Loyola College, Vijayawada'}, 
{ value:'Andhra Loyola College, Vijayawada'}, 
{ value:'Andhra Loyola College, Vijayawada'}, 
{ value:'Anil Surendra Modi School of Commerce - Narsee Monjee Institute of Management Studies, Mumbai'},
{ value:'Anna Adarsh College for Women, Chennai'},
{ value:'Anna Adarsh College for Women, Chennai'},
{ value:'Anna Adarsh College for Women, Chennai'}, 
{ value:'Anna University'},
{ value:'Anna University'},
{ value:'Anna University'},
{ value:'Anna University, Chennai'},
{ value:'Apeejay College of Engineering, Faridabad'},
{ value:'Apollo Institute of Medical Sciences and Research, Chittoor'},
{ value:'Army College of Medical Sciences'},
{ value:'Army College of Medical Sciences Delhi'},
{ value:'Army Institute of Law Mohali'},
{ value:'Army Institute of Law, Mohali'},
{ value:'Army Institute of Technology, Pune'},
{ value:'Arts and Commerce College, Gandhinagar'},
{ value:'Arts and Commerce Girls College, Raipur'},
{ value:'Arul Anandar College, Madurai'}, 
{ value:'Arul Anandar College, Madurai'}, 
{ value:'Aryabhatta College, Delhi '},
{ value:'Aryabhatta College, Delhi '},
{ value:'Aryabhatta College, Delhi '},
{ value:'Asctic College of Computer Sciences, Mohali'},
{ value:'Asian Institute of Management Studies,Delhi'},
{ value:'Asian School of Business, Thiruvananthapuram'},
{ value:'ASMA Institute of Management, Pune'},
{ value:'Assam Institute of Management'},
{ value:'Assam Medical College Dibrugarh'},
{ value:"Assam Women's University, [AWU] Jorhat"},
{ value:'Atal Bihari Vajpayee Indian Institute of Information Technology and Management'},
{ value:'Atma Ram Sanatan Dharm College, New Delhi'},
{ value:'Atma Ram Sanatan Dharm College, New Delhi '},
{ value:'Atma Ram Sanatan Dharm College, New Delhi '},
{ value:'AU College of Engineering (Visakhapatnam) '},
{ value:'Auxilium College, Vellore'},
{ value:'Avaiyar Government College for Women, Pondicherry'},
{ value:'AWH Special Training College, Kozhikode'},
{ value:'Axis Colleges'},
{ value:'Ayya Nadar Janaki Ammal College, Madurai'}, 
{ value:'Ayya Nadar Janaki Ammal College, Madurai'},
{ value:'Ayya Nadar Janaki Ammal College, Madurai'}, 
{ value:'Azeezia Institute of Medical Sciences and Research Kollam'},
{ value:'B J Medical College, Pune'},
{ value:'B. M. S. College of Engineering, Bengaluru'},
{ value:'B. S. Abdur Rahman Institute of Science and Technology, Chennai'},
{ value:'B.M.S. Institute of Technology,Bengaluru, Karnataka'},
{ value:'Baba Farid Law College Faridkot'},
{ value:'Baba Saheb Bhimrao Ambedkar Law College Lucknow'},
{ value:'Babasaheb Bhimrao Ambedkar University (BBAU), Lucknow'},
{ value:'Baby Memorial College of Nursing, Kozhikode'},
{ value:'Badruka College, Hyderabad'},
{ value:'Balaji Institute of Modern Management, Pune'},
{ value:'Banaras Hindu University'},
{ value:'Banasthali Vidyapith, Jaipur'},
{ value:'Bangalore Institute of Legal Studies'},
{ value:'Bangalore Institute Of Technology (BIT)'},
{ value:'Bangalore Institute of Technology,Bengaluru, Karnataka'},
{ value:'Bangalore Medical College and Research Institute Bangalore'},
{ value:'Bangalore University'},
{ value:'Bannari Amman Institute of Technology, Tamil Nadu'},
{ value:'Bannari Amman Institute of Technology,Sathyamangalam, Tamil Nadu'},
{ value:'Basaveshwara Medical College & Hospital Chitradurga'},
{ value:'BBK DAV College for Women'},
{ value:'Bhai Gurdas College of Law Sangrur'},
{ value:'Bharath Niketan Engineering College, [BNEC] Theni'},
{ value:'Bharathiar Palkalaikoodam, Pondicherry'},
{ value:'Bharathidasan Government College for Women, Pondicherry'},
{ value:'Bharathidasan Institute of Management'},
{ value:'Bharathiyar Collelge of Engineering & Technology, Pondicherry'},
{ value:'Bharati Vidyapeeth Deemed University College of Engineering, Pune'},
{ value:'Bharati Vidyapeeth Deemed University Medical College Pune'},
{ value:'Bharati Vidyapeeth Institute of Management and Entrepreneurship Development'},
{ value:'Bhilai Institute of Technology, [BIT] Durg'},
{ value:'Birla Institute of Management Technology'},
{ value:'Birla Institute of Management Technology (BIMT)'},
{ value:'Birla Institute of Management Technology (BIMTECH),Delhi'},
{ value:'Birla Institute of Technology & Science, Pilani'},
{ value:'Birla Institute of Technology Jharkhand'},
{ value:'Birla Institute of Technology, [BIT] Noida'},
{ value:'Birla Institute of Technology, Ranchi [BIT Mesra]'},
{ value:'Birsa Institute of Technology,Sindri, Jharkhand'},
{ value:'Bishop Cotton Women’s Christian Law College Bangalore'},
{ value:'Bishop Heber College, Tiruchirappalli'},
{ value:'Bishop Heber College, Tiruchirappalli'},
{ value:'Bishop Heber College, Tiruchirappalli'},
{ value:'Bishop Moore College, Alappuzha '},
{ value:'Bishop Moore College, Alappuzha '},
{ value:'Bishop Moore College, Alappuzha '},
{ value:'BJ Medical College Pune'},
{ value:'BK School of Business of Management'},
{ value:'BMS College of Engineering, Bangalore'},
{ value:'BMS Institute of Technology, Faridabad'},
{ value:'BMS Law College Bangalore'},
{ value:"BPHE's Institute of Management Studies, Career Devt & Research"},
{ value:'Brahmani Jharilo College, Raipur'},
{ value:'Brahmani Jharilo College, Raipur'},
{ value:'Brahmrishi Yoga Training College, Chandigarh'},
{ value:'BS Anagpuria Institute of Technology & Management, Faridabad'},
{ value:'Business School (IBS), ICFAI University'},
{ value:'BVIMR - Institute of Management and Research, Bharati Vidyapeeth Deemed University'},
{ value:'C. Abdul Hakeem College, Vellore'},
{ value:'C. M. S. College, Kottayam '},
{ value:'C. M. S. College, Kottayam '},
{ value:'C. M. S. College, Kottayam '},
{ value:'C. V. Raman College of Engineering, Bhubaneswar'},
{ value:'C.U. Shah University, Wadhwan'},
{ value:'Calcutta University'},
{ value:'Calicut Medical College Calicut'},
{ value:'Calicut Medical College, Kozhikode'},
{ value:'Career College of Law Bhopal'},
{ value:'Career Institute of Technology & Management, Faridabad'},
{ value:'Center for Management Studies, Jain University'},
{ value:'Central Institute of Mental Retardation, Thiruvananthapuram'},
{ value:'Central Law College Salem'},
{ value:'Central Polytechnic, Chandigarh'},
{ value:'Centre de Sciences Humaines (CSH)'},
{ value:'Centre for Advanced Financial Research and Learning (CAFRAL)'},
{ value:'Centre for Development Studies (CDS)'},
{ value:'Centre for Development Studies, Thiruvananthapuram'},
{ value:'Centre for Economic Studies and Planning, Jawaharlal Nehru University'},
{ value:'Centre for Electronics Design and Technology of India, Mohali'},
{ value:'Centre for International Trade and Development, Jawaharlal Nehru University'},
{ value:'Centre for Management Training and Research, Mohali'},
{ value:'Centre for Policy Research (CPR)'},
{ value:'Centre for Public Policy (CPP), Indian Institute of Management Bangalore (IIMB)'},
{ value:'Centre for Studies in Social Sciences'},
{ value:'Centre for Sustainable Employment, Azim Premji University'},
{ value:'Centre for the Study of Regional Development, Jawaharlal Nehru University'},
{ value:'Chaitanya Bharathi Institute of Technology,Hyderabad, Telangana'},
{ value:'Chanakya College of Commerce and Business Administration, Raipur'},
{ value:'Chanakya College of Commerce and Business Administration, Raipur'},
{ value:'Chanakya Law College Nainital'},
{ value:'Chanakya National Law University Patna'},
{ value:'Chandigarh Business School, Chandigarh'},
{ value:'Chandigarh College of Architecture, Chandigarh'},
{ value:'Chandigarh College of Hotel Management, Mohali'},
{ value:'Chandigarh College of Pharmacy, Mohali'},
{ value:'Chandigarh Group of Colleges [CGC], Landran, Mohali'},
{ value:'Chandigarh Group of Colleges, Landran'},
{ value:'Chandigarh University'},
{ value:'Chaudhari Mahila Arts College, Gandhinagar'},
{ value:'Chennai University'},
{ value:'Chhatrapati Sahuji Maharaj Medical University Lucknow'},
{ value:'Chhatrapati Shahu Ji Maharaj University, Kanpur'},
{ value:'Chitkara Business School'},
{ value:'Christ College Institute of Management'},
{ value:'Christ College Institute of Management, Bangalore'},
{ value:'Christ College, Thrissur '},
{ value:'Christ College, Thrissur '},
{ value:'Christ College, Thrissur '},
{ value:'Christ University'},
{ value:'Christ University Bangalore'},
{ value:'Christ University, Bangalore'},
{ value:'Christian College, Lucknow'},
{ value:'Christian Medical College (CMC), Vellore'},
{ value:'CMC Ludiana'},
{ value:'CMC Vellore'},
{ value:'CMR Law College Bangalore'},
{ value:'CMS College of Science and Commerce, Coimbatore'},
{ value:'CMS College of Science and Commerce, Coimbatore '},
{ value:'CMS College of Science and Commerce, Coimbatore '},
{ value:'Cochin University of Science and Technology School of Legal Studies'},
{ value:'Coimbatore Institute of Technology'},
{ value:'College for Women, Thiruvananthapuram'},
{ value:'College of Agricultural Engineering, Raipur'},
{ value:'College of Agricultural Engineering, Raipur'},
{ value:'College of Agriculture, Thiruvananthapuram'},
{ value:'College of Dairy Technology, Raipur'},
{ value:'College of Engineering Trivandrum'},
{ value:'College of Engineering, Pune'},
{ value:'College of Nursing, Vellore'},
{ value:'College of Vocational Studies, New Delhi'},
{ value:'College of Vocational Studies, New Delhi '},
{ value:'College of Vocational Studies, New Delhi '},
{ value:'D. A. V. College, Chandigarh'}, 
{ value:'D. A. V. College, Chandigarh '},
{ value:'D. A. V. College, Chandigarh '},
{ value:'D.A.V. College Jalandhar'},
{ value:'Datta Meghe Institute of Medical Sciences, Nagpur'},
{ value:'Daulat Ram College, Delhi University'},
{ value:'DAV Centenary College, Faridabad'},
{ value:'DAV College Chandigarh - DAVCHD'},
{ value:'DAV Institute of Management (DAVIM), Faridabad'},
{ value:'Dayalbagh Educational Institute, Uttar Pradesh'},
{ value:'DBS - Doon Business School'},
{ value:'"Deen Dayal Upadhyaya College, Delhi University'},
{ value:'Deen Dayal Upadhyaya College, New Delhi '},
{ value:'Deen Dayal Upadhyaya College, New Delhi '},
{ value:'Deen Dayal Upadhyaya College, New Delhi '},
{ value:'Defence Institute of Advanced Technology, Pune'},
{ value:'Delhi Business School,Delhi'},
{ value:'Delhi College of Arts & Commerce, Delhi'},
{ value:'Delhi College of Arts & Commerce, Delhi'},
{ value:'Delhi Film Institute, [DFI] New Delhi'},
{ value:'Delhi Institute of Advanced Studies,Delhi'},
{ value:'"Delhi Institute of Fashion and Technology, New Delhi'},
{ value:'Delhi Institute of Heritage Research and Management,Delhi'},
{ value:'Delhi Institute of Management & Technology,Delhi'},
{ value:'Delhi Paramedical and Management Institute, [DPAMI] New Delhi'},
{ value:'Delhi School of Economics, University of Delhi'},
{ value:'Delhi Technological University'},
{ value:'Delhi University - Faculty of Law'},
{ value:'Delhi University - Hindu College '},
{ value:'Delhi University - Lady Shree Ram College (LSR)'},
{ value:'Delhi University - Lady Shree Ram College (LSR)'},
{ value:'Delhi University - Shri Ram College of Commerce (SRCC)'},
{ value:'Department of Economic Sciences, Indian Institute of Technology Kanpur'},
{ value:'Department of Economics, Delhi School of Economics, University of Delhi'},
{ value:'Department of Economics, Jadavpur University'},
{ value:'Department of Economics, School of Economics, Management and Information Systems, North-Eastern Hill University'},
{ value:'Department of Economics, School of Management, Pondicherry University'},
{ value:'Department of Economics, Shiv Nadar University'},
{ value:'Department of Economics, University of Burdwan'},
{ value:'Department of Economics, University of Calcutta'},
{ value:'Department of Economics, Visva Bharati University'},
{ value:'Department of Financial Studies,Delhi'},
{ value:'Department of Humanities and Social Sciences, Indian Institute of Technology Bombay'},
{ value:'Department of Law Aligarh Muslim University'},
{ value:'Department of Law Barkatullah University Bhopal'},
{ value:'Department of Law Meerut University'},
{ value:'Department of Law University of Allahabad'},
{ value:'Department of Management Studies, Indian Institute of Science'},
{ value:'Department of Management Studies, Indian Institute of Technology Delhi'},
{ value:'Department of Management, J.D Birla Institute'},
{ value:'DES Law College Pune'},
{ value:'Devki Devi Jain Memorial College for Women'},
{ value:'DGB Dayanand Law College Solapur'},
{ value:'Dhanabagiyam Krishnaswamy Mudaliar College for Women, Vellore'},
{ value:'Don Bosco College, Panjim'},
{ value:'Dr BR Ambedkar Law College Tirupathi'},
{ value:'Dr CV Raman University Bilaspur'},
{ value:'Dr. A.P.J. Abdul Kalam University, [AKU] Indore'},
{ value:'Dr. B. R. Ambedkar National Institute of Technology, Punjab'},
{ value:'Dr. Bhim Rao Ambedkar University (BRAU), Bihar'},
{ value:'Dr. Gafoor Memorial Mes Mampad College, Malappuram'},
{ value:'Dr. Gafoor Memorial Mes Mampad College, Malappuram '},
{ value:'Dr. Gafoor Memorial Mes Mampad College, Malappuram '},
{ value:'Dr. MGR Medical University (MGRMU), Chennai'},
{ value:'Dr. N. G. P. Arts and Science College, Coimbatore'},
{ value:'Dr. N. G. P. Arts and Science College, Coimbatore '},
{ value:'Dr. N. G. P. Arts and Science College, Coimbatore '},
{ value:'Dr. SNS Rajalakshmi College of Arts and Science'},
{ value:'Dyal Singh College, Delhi '},
{ value:'Dyal Singh College, Delhi '},
{ value:'Dyal Singh College, Delhi '},
{ value:'East West College of Management, [EWCM] Bangalore'},
{ value:'Economic Research Unit, Indian Statistical Institute'},
{ value:'Economics and Social Sciences, Indian Institute of Management Bangalore (IIMB)'},
{ value:'Economics, Ashoka University'},
{ value:'Economics, Indian Institute of Management Ahmedabad (IIMA)'},
{ value:'Economics, Indian Institute of Management Calcutta (IIMCAL)'},
{ value:'EMPI Business School'},
{ value:'Era Medical College Lucknow'},
{ value:'Ethiraj College for Women (Ethiraj)'},
{ value:'Ethiraj College for Women, Chennai '},
{ value:'Ethiraj College for Women, Chennai '},
{ value:'Ethiraj College for Women, Chennai '},
{ value:'Exterior Interior (P Ltd), New Delhi'},
{ value:'"Exterior Interior Ltd., New Delhi'},
{ value:'Faculty of Law Jamia Milia Islamia'},
{ value:'Faculty of Law University of Madras'},
{ value:'Faculty of Management Studies'},
{ value:'Faculty of Management Studies, University of Delhi'},
{ value:'Farook College, Kozhikode'},
{ value:'Farook College, Kozhikode'},
{ value:'Farook College, Kozhikode '},
{ value:'Father Muller Medical College Mangalore'},
{ value:'Fatima College, Madurai'},
{ value:'Fatima College, Madurai'},
{ value:'Fatima College, Madurai '},
{ value:'Fatima Mata National College, Kollam'},
{ value:'Fatima Mata National College, Kollam'},
{ value:'Fatima Mata National College, Kollam'},
{ value:'Fergusson College, Pune '},
{ value:'Fergusson College, Pune '},
{ value:'FLAME University, Pune'},
{ value:'Fore School of Management'},
{ value:'FORE School of Management, Delhi'},
{ value:'G.S.V.M Medical College Kanpur'},
{ value:'Gajara Raja Medical College, Gwalior'},
{ value:'Galgotias College of Engineering and Technology, [GCET] Greater Noida'},
{ value:"Galgotia's College of Engineering and Technology,Greater Noida, Uttar Pradesh"},
{ value:'Galgotias University - GU'},
{ value:'Gandhi Medical College & Hospital Hyderabad'},
{ value:'Gandhi Medical College and Hospital Hyderabad'},
{ value:'Gandhi Medical College, Bhopal'},
{ value:'Garden City University'},
{ value:'Gargi College, Delhi'},
{ value:'"Gargi College, Delhi University'},
{ value:'Gargi College, Delhi '},
{ value:'Gargi College, Delhi '},
{ value:'Gauhati Medical College & Hospital (GMC) Guwahati'},
{ value:'Gayatri Vidya Parishad College for Degree and P. G. Courses, Visakapatnam'},
{ value:'Gayatri Vidya Parishad College for Degree and P. G. Courses, Visakapatnam'},
{ value:'Gian Sagar Medical College & Hospital Patiala'},
{ value:'GITAM Hyderabad Business School, Hyderabad'},
{ value:'GITAM University, Vishakhapatnam'},
{ value:'GLA University, Mathura'},
{ value:'GLS University, Ahmedabad'},
{ value:'GMR Institute of Technology,Rajam, Andhra Pradesh'},
{ value:'Goa Institute of Management'},
{ value:'Goa Institute of Management, Goa'},
{ value:'Goa Medical College & Hospital Goa'},
{ value:'Goa Medical College, Bambolim, Panaji'},
{ value:'Gobi Arts and Science College'},
{ value:'Goswami Ganesh Dutta S.D. College'},
{ value:'Goswami Ganesh Dutta Sanatan Dharma College, Chandigarh'}, 
{ value:'Goswami Ganesh Dutta Sanatan Dharma College, Chandigarh '},
{ value:'Goswami Ganesh Dutta Sanatan Dharma College, Chandigarh '},
{ value:'Government Arts College, Coimbatore'},
{ value:'Government Arts College, Coimbatore '},
{ value:'Government Arts College, Coimbatore '},
{ value:'Government Arts College, Karur'},
{ value:'Government Arts College, Karur'},
{ value:'Government Arts College, Karur'},
{ value:'Government Arts College, Tiruppur'},
{ value:'Government Arts College, Tiruppur'},
{ value:'Government Arts College, Tiruppur'},
{ value:'Government College of Engineering,Amravati, Maharashtra'},
{ value:'Government College of Science (GCS), Raipur'},
{ value:'Government College of Science (GCS), Raipur'},
{ value:'Government College of Technology, Coimbatore'},
{ value:'Government Degree College, Kullu'},
{ value:'Government Law College Coimbatore'},
{ value:'Government Law College Kozhikode'},
{ value:'Government Law College Mumbai'},
{ value:'Government Law College Trichy'},
{ value:'Government Medical College and Hospital (GMCH), Chandigarh'},
{ value:'Government Medical College and Hospital Chandigarh'},
{ value:'Government Medical College Aurangabad'},
{ value:'Government Medical College Jammu'},
{ value:'Government Medical College Kottayam'},
{ value:'Government Medical College Nagpur'},
{ value:'Government Medical College Patiala'},
{ value:'Government Medical College Surat'},
{ value:'Government Medical College, Jalaun'},
{ value:'Government State Law College Bhopal'},
{ value:'Govt. Model Engineering College,Kochi, Kerala'},
{ value:'Govt. Post-Graduate College for Girls, Chandigarh'},
{ value:'Govt. Post-Graduate College for Girls, Chandigarh '},
{ value:'Govt. Post-Graduate College for Girls, Chandigarh '},
{ value:'Graduate School of Business and Administration'},
{ value:'Grants Medical College, Mumbai'},
{ value:'GSL Medical College, Rajahmundry'},
{ value:'Gujarat National Law University Gandhinagar'},
{ value:'Gujarat National Law University, Gandhinagar'},
{ value:'Gujarat University, Ahmedabad'},
{ value:'Guru Gobind Singh Indraprastha University'},
{ value:'Guru Gobind Singh Indraprastha University, New Delhi'},
{ value:'Guru Nanak College'},
{ value:'Guru Nanak College, Chennai'},
{ value:'Guru Nanak College, Chennai'},
{ value:'Guru Nanak Dev University, [GNDU] Amritsar'},
{ value:'Gurukul Institute of Management and Technology, [GIOMAT] New Delhi'},
{ value:'Hamdard Institute of Medical Sciences and Research, [HIOMSAR] New Delhi, Delhi NCR'},
{ value:'Hans Raj College, Delhi'},
{ value:'"Hans Raj College, Delhi University,Delhi'},
{ value:'Harcourt Butler Technological Institute,Kanpur, Uttar Pradesh'},
{ value:'Harlal School of Law Greater Noida'},
{ value:'Hassan Institute of Medical Sciences Hassan'},
{ value:'HCAS - Hindustan College of Arts and Science'},
{ value:'HHMSPB NSS College for Women, Thiruvananthapuram'},
{ value:'HHMSPB NSS College for Women, Thiruvananthapuram'},
{ value:'Hidayatullah National Law University Raipur'},
{ value:'Hindu College, Delhi'},
{ value:'Hindu College, Delhi University,Delhi'},
{ value:'Hindustan Institute of Management and Computer Studies, [HIMCS] Mathura'},
{ value:'Hindustan Institute of Technology & Science, [HITS] Chennai'},
{ value:'Hindustan Institute of Technology and Science,Chennai, Tamil Nadu'},
{ value:'Hindustan University'},
{ value:'Holy Cross College, Kanyakumari'},
{ value:'Holy Cross College, Tiruchirappalli'},
{ value:'Holy Cross College, Tiruchirappalli'},
{ value:'Holy Cross College, Tiruchirappalli'},
{ value:'Hyderabad University'},
{ value:'IAMR Law College Ghaziabad'},
{ value:'ICAI Institute of Chartered Accountants, Noida'},
{ value:'ICFAI Business School'},
{ value:'ICFAI Business School, ICFAI Foundation for Higher Education, Hyderabad'},
{ value:'ICFAI University Tripura (IU)'},
{ value:'IFIM College'},
{ value:'IIIT Allahabad'},
{ value:'IILM'},
{ value:'IIM Ahmedabad'},
{ value:'IIM Bangalore'},
{ value:'IIM Calcutta'},
{ value:'IIM Indore'},
{ value:'IIM Kashipur'},
{ value:'IIM Kozhikode'},
{ value:'IIM Lucknow'},
{ value:'IIM Raipur'},
{ value:'IIM Ranchi'},
{ value:'IIM Rohtak'},
{ value:'IIM Tiruchirappalli'},
{ value:'IIM Udaipur'},
{ value:'IIMC Hyderabad - Indian Institute of Management and Commerce'},
{ value:'IIMT University, [IIMTU] Meerut'},
{ value:'IIT Bhubaneswar'},
{ value:'IIT Bombay'},
{ value:'IIT Delhi'},
{ value:'IIT Delhi'},
{ value:'IIT Gandhinagar'},
{ value:'IIT Guwahati'},
{ value:'IIT Hyderabad'},
{ value:'IIT Indore'},
{ value:'IIT Jodhpur'},
{ value:'IIT Kanpur'},
{ value:'IIT Kanpur'},
{ value:'IIT Kharagpur'},
{ value:'IIT Kharagpur'},
{ value:'IIT Madras'},
{ value:'IIT Mandi'},
{ value:'IIT Patna'},
{ value:'IIT Roorkee'},
{ value:'IIT Roorkee'},
{ value:'IIT Ropar'},
{ value:'IIT-BHU'},
{ value:'IIT-ISM Dhanbad'},
{ value:'ILS Law College Pune'},
{ value:'IME Law College Sahibabad'},
{ value:'IMS Unison University - IUU'},
{ value:'Index Medical College Hospital and Research Centre Indore'},
{ value:'India Resident Mission, Asian Development Bank'},
{ value:'Indian Institute of Engineering Science & Technology, Shibpur'},
{ value:'Indian Institute of Foreign Trade'},
{ value:'Indian Institute of Foreign Trade (IIFT)'},
{ value:'Indian Institute of Foreign Trade (IIFT),Delhi'},
{ value:'Indian Institute of Forest Management'},
{ value:'Indian Institute of Kashipur Management (IIM)'},
{ value:'Indian Institute of Management (IIM),  Visakhapatnam'},
{ value:'Indian Institute of Management (IIM), Ahmedabad'},
{ value:'Indian Institute of Management (IIM), Amritsar'},
{ value:'Indian Institute of Management (IIM), Bangalore'},
{ value:'Indian Institute of Management (IIM), Bodh Gaya'},
{ value:'Indian Institute of Management (IIM), Calcutta'},
{ value:'Indian Institute of Management (IIM), Indore'},
{ value:'Indian Institute of Management (IIM), Jammu'},
{ value:'Indian Institute of Management (IIM), Kashipur'},
{ value:'Indian Institute of Management (IIM), Kozhikode'},
{ value:'Indian Institute of Management (IIM), Kozhikode'},
{ value:'Indian Institute of Management (IIM), Lucknow'},
{ value:'Indian Institute of Management (IIM), Lucknow'},
{ value:'Indian Institute of Management (IIM), Nagpur'},
{ value:'Indian Institute of Management (IIM), Raipur'},
{ value:'Indian Institute of Management (IIM), Raipur'},
{ value:'Indian Institute of Management (IIM), Raipur'},
{ value:'Indian Institute of Management (IIM), Ranchi'},
{ value:'Indian Institute of Management (IIM), Rohtak'},
{ value:'"Indian Institute of Management (IIM), Sambalpur'},
{ value:'Indian Institute of Management (IIM), Shillong'},
{ value:'Indian Institute of Management (IIM), Sirmaur'},
{ value:'Indian Institute of Management (IIM), Tiruchirappalli'},
{ value:'Indian Institute of Management Ahmedabad (IIMA)'},
{ value:'Indian Institute of Management Bangalore (IIMB)'},
{ value:'Indian Institute of Management Calcutta (IIMCAL)'},
{ value:'Indian Institute of Management Indore (IIMIDR)'},
{ value:'Indian Institute of Management Kozhikode (IIMK)'},
{ value:'Indian Institute of Management Lucknow (IIML)'},
{ value:'Indian Institute of Management Udaipur (IIMU)'},
{ value:'Indian Institute of Mass Communication (IIMC), Delhi'},
{ value:'Indian Institute of Modern Management'},
{ value:'Indian Institute of Planning And Management (IIPM)'},
{ value:'Indian Institute of Science and Management'},
{ value:'Indian Institute of Social Welfare and Business Management'},
{ value:'Indian Institute of Space Science & Technology, Thiruvananthapuram'},
{ value:'Indian Institute of Technology (IIT), Chennai'},
{ value:'Indian Institute of Technology (IIT), Delhi'},
{ value:'Indian Institute of Technology (IIT), Gandhinagar'},
{ value:'Indian Institute of Technology (IIT), Gandhinagar'},
{ value:'Indian Institute of Technology (IIT), Guwahati'},
{ value:'Indian Institute of Technology (IIT), Hyderabad'},
{ value:'Indian Institute of Technology (IIT), Kanpur'},
{ value:'Indian Institute of Technology (IIT), Kharagpur'},
{ value:'Indian Institute of Technology (IIT), Mandi'},
{ value:'Indian Institute of Technology (IIT), Mumbai'},
{ value:'Indian Institute of Technology (IIT), Mumbai'},
{ value:'Indian School of Business'},
{ value:'Indian School of Business (ISB), Hyderabad'},
{ value:'Indian Statistical Institute'},
{ value:'Indian Statistical Institute'},
{ value:'Indian Statistical Institute'},
{ value:'Indian Statistical Institute (ISI), Delhi'},
{ value:'Indian Statistical Institute (ISI), Delhi'},
{ value:'Indira College of Commerce and Science'},
{ value:'Indira Gandhi College of Arts and Science, Puducherry'},
{ value:'Indira Gandhi Delhi Technical University for Women, [IGIT]'},
{ value:'Indira Gandhi Institute of Development Research (IGIDR)'},
{ value:'Indira Gandhi Medical College Shimla'},
{ value:'Indira Gandhi National Open University (IGNOU)'},
{ value:'Indira Gandhi National Open University, [IGNOU] New Delhi'},
{ value:'Indira Gandhi University, [IGU] Meerpur'},
{ value:'Indore Institute of Law'},
{ value:'Indore Professional Studies Academy'},
{ value:'Indore Professional Studies Academy, [IPSA] Indore'},
{ value:'Indraprastha College for Women, Delhi '},
{ value:'Indraprastha College for Women, Delhi '},
{ value:'Indraprastha Institute of Information Technology Delhi'},
{ value:'Institute for Financial Management and Research'},
{ value:'Institute for Financial Management and Research, Sri City'},
{ value:'Institute for Human Development (IHD)'},
{ value:'Institute for Social and Economic Change (ISEC)'},
{ value:'Institute of Business Management, GLA University'},
{ value:'Institute of Chartered Accountant of India (ICAI)'},
{ value:'Institute of Chartered Financial Analysts of India (ICFAI)'},
{ value:'Institute of Chartered Financial Analysts of India, Hyderabad'},
{ value:'Institute of Chemical Technology, Mumbai'},
{ value:'Institute of Clinical Research India, [ICRI] - Ansal University, New Delhi'},
{ value:'Institute of Economic Growth, University of Delhi'},
{ value:'Institute of Hotel Management (IHM), Chennai'},
{ value:'Institute of Logistics & Aviation Management, [ILAM] - Ansal University, New Delhi'},
{ value:'Institute of Management Development & Research'},
{ value:'Institute of Management in Kerala'},
{ value:'Institute of Management Studies - Devi Ahilya University, Indore'},
{ value:'Institute of Management Studies, [IMS] Dehradun'},
{ value:'Institute of Management Studies, [IMS] Ghaziabad'},
{ value:'Institute of Management Studies, [IMS] Noida'},
{ value:'Institute of Management Studies, Noida'},
{ value:'Institute of Management Technology'},
{ value:'Institute of Management Technology, Ghaziabad'},
{ value:'Institute of Medical Sciences Banaras Hindu University (BHU)'},
{ value:'Institute of Productivity and Management'},
{ value:'Institute of Productivity and Management '},
{ value:'Institute of Public Enterprise'},
{ value:'Institute of Public Enterprise, Hyderabad'},
{ value:'Institute of Rural Management (IRMA)'},
{ value:'Institute of Rural Management Anand'},
{ value:'Institute of Technical Education & Research, [ITER] Bhubaneshwar'},
{ value:'Institute of Technology, Nirma University, Ahmedabad'},
{ value:'Integral Institute of Advanced Management'},
{ value:'International Initiative for Impact Evaluation (3ie)'},
{ value:'International Institute of Information Technology (IIIT), Hyderabad'},
{ value:'International Institute of Information Technology (IIIT), Kolkatta'},
{ value:'International Institute of Information Technology Bangalore'},
{ value:'International Institute of Information Technology, Hyderabad'},
{ value:'International Institute of Information Technology,Hyderabad, '},
{ value:'International Management Centre (IMC),Delhi'},
{ value:'International Management Institute'},
{ value:'"International Management Institute (IMI), Delhi'},
{ value:'International Management Institute, Kolkata'},
{ value:'International School of Business and Media'},
{ value:'Islamia College of Science and Commerce'},
{ value:"Islamiah Women's College, Vellore"},
{ value:'ITM Business School'},
{ value:'ITM University Gurgaon'},
{ value:'ITS - Institute of Technology and Science'},
{ value:'ITUC School of Management'},
{ value:'J.D. Birla Institute, Kolkata'},
{ value:'Jadavpur University'},
{ value:'Jagan Institute of Management Studies, [JIMS Rohini] New Delhi'},
{ value:'Jagan Nath University Jaipur'},
{ value:'Jagannath International Management School (Vasant Kunj, Delhi)'},
{ value:'Jain University, Bangalore'},
{ value:'Jaipur National University Jaipur'},
{ value:'Jaipur National University, [JNU] Jaipur'},
{ value:'Jaipuria Institute of Management'},
{ value:'Jaipuria Institute of Management, Lucknow'},
{ value:'Jaipuria Institute of Management, Noida'},
{ value:'Jaipuria Institute of Management, Noida'},
{ value:'Jamal Mohamed College, Tiruchirappalli'},
{ value:'Jamal Mohamed College, Tiruchirappalli '},
{ value:'Jamal Mohamed College, Tiruchirappalli '},
{ value:'Jamia Hamdard University, New Delhi'},
{ value:'Jamia Millia Islamia, New Delhi'},
{ value:'Jamia Millia University'},
{ value:'Jamnalal Bajaj Institute of Management Studies'},
{ value:'Janardan Rai Nagar Rajasthan Vidyapeeth University, [JRNRV] Udaipur'},
{ value:'Janhit College of Law Greater Noida'},
{ value:'Jawaharlal Nehru Medical College (JNMC) Belgaum'},
{ value:'Jawaharlal Nehru National College of Engineering,Shimoga, Karnataka'},
{ value:'Jawaharlal Nehru Technological University, Hyderabad'},
{ value:'Jaypee Institute of Information Technology, Uttar Pradesh'},
{ value:'Jaypee University of Information Technology'},
{ value:'JB Law College Guwahati'},
{ value:'Jesus & Mary College, [JMC] New Delhi'},
{ value:'Jesus & Mary College, New Delhi '},
{ value:'Jesus & Mary College, New Delhi '},
{ value:'JIMS Rohini - Jagan Institute of Management Studies'},
{ value:'Jindal Global Business School, Sonipat'},
{ value:'Jindal Global Law School Sonepat'},
{ value:'Jipmer, Pondicherry'},
{ value:'JJM Medical College Davangere'},
{ value:'JK Lakshmipat University - JKLU'},
{ value:'JNTU College of Engineering, Hyderabad'},
{ value:'JNU - Jaipur National University'},
{ value:'JSS Academy of Technical Education, [JSSATE] Noida'},
{ value:'JSS Academy of Technical Education,Noida, Uttar Pradesh'},
{ value:'Jubilee Mission Medical College & Research Institute Thrissur'},
{ value:'Justice Basheer Ahmed Sayeed College for Women'},
{ value:'Justice Basher Ahmed Sayeed College for Women, Chennai'},
{ value:'Jwaharlal Institute of Post-graduate Medical Education & Research (JIPMER) Pondicherry'},
{ value:'K J Somaiya Medical College Mumbai'},
{ value:'K S Hegde Medical Academy Mangalore'},
{ value:'K.J. Somaiya Institute of Management Studies & Reserach'},
{ value:'K.L. University'},
{ value:'K.L. University,Andhra Pradesh'},
{ value:'Kalasalingam Academy of Research and Higher Education, Tamil Nadu'},
{ value:'Kalinga Institute of Industrial Technology'},
{ value:'Kalinga Institute of Industrial Technology, Bhubaneswar'},
{ value:'Kalinga Institute of Medical Sciences Bhubaneswar'},
{ value:'Kanya Maha Vidyalaya'},
{ value:'Karnataka Institute of Medical Sciences (KIMS) Hubli'},
{ value:'Karpaga Vinayaga Institute of Medical Sciences & Research Centre Kanchipuram'},
{ value:'Karunya Institute of Technology and Sciences, Coimbatore'},
{ value:'Karunya Institute of Technology and Sciences,Coimbatore, Tamil Nadu'},
{ value:'Karunya University'},
{ value:'Karunya University'},
{ value:'Kashmir University, Srinagar'},
{ value:'Kasturba Medical College Manipal'},
{ value:'KCL Institute of Laws for Women Jalandhar'},
{ value:'Kempegowda Institute of Medical Sciences Bangalore'},
{ value:'Kerala Granthasala Sanghom, Kozhikode'},
{ value:'Kerala Law Academy Law College Thiruvananthapuram'},
{ value:'Keshav Mahavidyalaya, Delhi University'},
{ value:'Keshav Mahavidyalya, Delhi'},
{ value:'Keshav Mahavidyalya, Delhi'},
{ value:'Keshav Mahavidyalya, Delhi'}, 
{ value:'Khadir Mohideen College, Adirampattinam'},
{ value:'KIIT School of Management'},
{ value:'KIIT University, Bhubaneswar'},
{ value:'Kilpauk Medical College Chennai'},
{ value:'King Dashrath Medical College, Ayodhya'},
{ value:'King George Medical College - Chhatrapati Shahuji Maharaj Medical University, Lucknow'},
{ value:"King George's Medical College Lucknow"},
{ value:"King George's Medical University (KGMU), Lucknow"}, 
{ value:'Kirori Mal College, Delhi'},
{ value:"Kirorimal college, Delhi University ,'Delhi, Delhi NCR"},
{ value:'KJ Somaiya Institute of Management Studies and Research, [SIMSR] Mumbai'},
{ value:'KJC - Kristu Jayanthi College'},
{ value:'KLE Society’s Law College Bangalore'},
{ value:"KLE Society's Dr. M. S. Sheshgiri College of Engineering and Technology,Belgaum, Karnataka"},
{ value:'KM Centre for PG Studies, Pondicherry'},
{ value:'KM Centre for PG Studies, Pondicherry'},
{ value:'KMCT Medical College Kozhikode'},
{ value:'Koneru Lakshmaiah Education Foundation University, Andhra Pradesh'},
{ value:'Kongu Arts & Science College, Erode'},
{ value:'Kongu Arts & Science College, Erode'},
{ value:'Kongu Arts And Science College'},
{ value:'Kongu Engineering College, Tamil Nadu'},
{ value:'Kongu Engineering College,Erode, Tamil Nadu'},
{ value:'Kongunadu Arts & Science College, Coimbatore'},
{ value:'Kongunadu Arts & Science College, Coimbatore'},
{ value:'Kongunadu Arts & Science College, Coimbatore'},
{ value:'Kousali Institute of Management Studies'},
{ value:'Kovai Kalaimagal College of Arts and Science'},
{ value:'Kovai Medical Center Research & Educational Trust (KMCH) Coimbatore'},
{ value:'Kumaraguru College of Technology, Coimbatore'},
{ value:'Kuriakose Gregorios College, Kottayam'},
{ value:'Kuriakose Gregorios College, Kottayam'},
{ value:'Kuriakose Gregorios College, Kottayam '},
{ value:'KVG Medical College Sullia'},
{ value:'L L R M Medical College Meerut'},
{ value:'Lady Doak College, Madurai'}, 
{ value:'Lady Doak College, Madurai'}, 
{ value:'Lady Doak College, Madurai'}, 
{ value:'Lady Hardinge Medical College'},
{ value:'Lady Hardinge Medical College Delhi'},
{ value:'Lady Hardinge Medical College Delhi NCR'},
{ value:'Lady Irwin College, Delhi '},
{ value:'Lady Shri Ram College for Women, New Delhi'},
{ value:'Lady Shri Ram College for Women, New Delhi'},
{ value:'Lady Shri Ram College for Women, New Delhi'},
{ value:'Lakshmi Bai College, Delhi'},
{ value:'Lakshmi Bai College, Delhi '},
{ value:'Lala Lajpat Rai College of Law Mumbai'},
{ value:"Lingaya's Lalita Devi Institute of Management and Sciences"},
{ value:'LIU Bhopal'},
{ value:'Lokmanya Tilak Municipal Medical College Mumbai'},
{ value:'Loreto College, Calcutta'},
{ value:'Loreto College, Calcutta '},
{ value:'Lovely Professional University'},
{ value:'Lovely Professional University, [LPU] Jalandhar'},
{ value:'Loyala Academy, Hyderabad'},
{ value:'Loyola College'},
{ value:'Loyola College, Chennai'},
{ value:'Loyola College, Chennai'},
{ value:'Loyola College, Chennai'},
{ value:'Loyola College, Chennai '},
{ value:'Loyola College, Chennai'},
{ value:'Loyola Institute of Business Administration'},
{ value:'Lucknow University'},
{ value:'M. O. P. Vaishnav College for Women, Chennai'},
{ value:'M. S. Ramaiah Institute of Technology, Bengaluru'},
{ value:'M.S. Patel Institute of Management Studies'},
{ value:'M.S. Ramaiah College of Arts, Science and Commerce'},
{ value:'Madan Mohan Malaviya University of Technology, [MMMEC] Gorakhpur'},
{ value:'Madras Christian College, Chennai'},
{ value:'Madras Christian College, Chennai'},
{ value:'Madras Christian College, Chennai'},
{ value:'Madras Institute of Development Studies (MIDS)'},
{ value:'Madras Medical College Chennai'},
{ value:'Madras School of Economics'},
{ value:'Maharaja Agrasen College, Delhi'},
{ value:'"Maharaja Agrasen College, Delhi University'},
{ value:'Maharaja Ranjit Singh Punjab Technical University, [MRSPTU] Bathinda'},
{ value:'Maharaja Surajmal Institute'},
{ value:'Maharashtra Institute of Technology,Pune, Maharashtra'},
{ value:'Maharishi Markandeshwar Institute of Medical Sciences & Research Ambala'},
{ value:'Maharishi University of Information Technology, [MUIT] Lucknow'},
{ value:'Mahatma Gandhi College, Thiruvananthapuram '},
{ value:'Mahatma Gandhi College, Thiruvananthapuram '},
{ value:'Mahatma Gandhi College, Thiruvananthapuram '},
{ value:'Mahatma Gandhi Law College Gwalior'},
{ value:'Mahatma Gandhi Law College Hyderabad'},
{ value:'Mahatma Gandhi Memorial Medical College, Indore'},
{ value:'Mahatma Gandhi Mission’s College of Law Mumbai'},
{ value:'Mahatma Gandhi Mission’s Medical College Aurangabad'},
{ value:'Mahatma Gandhi University'},
{ value:'Mahatma Gandhi University (MGU)'},
{ value:'Mahendra Arts & Science College, Namakkal'},
{ value:'Mahendra Arts & Science College, Namakkal'},
{ value:'Mahendra Arts & Science College, Namakkal'},
{ value:'Maitreyi College, New Delhi'},
{ value:'Maitreyi College, New Delhi'},
{ value:'Maitreyi College, New Delhi'},
{ value:'Malaviya National Institute of Technology, Jaipur'},
{ value:'Management Development Institute'},
{ value:'Manav Rachna International Institute of Research and Studies, [MRIIRS] Faridabad'},
{ value:'Mandsaur University, [MU] Mandsaur'},
{ value:'Mangalmay Institute of Management & Technology,Delhi'},
{ value:'Manipal Institute of Communications, Manipal'},
{ value:'Manipal Institute of Technology'},
{ value:'Manipal Institute of Technology, [MIT] Manipal University'},
{ value:'Manipal Institute of Technology,manipal'},
{ value:'Manipal University'},
{ value:'Mar Ivanios College, Thiruvananthapuram'}, 
{ value:'Mar Ivanios College, Thiruvananthapuram'}, 
{ value:'Mar Ivanios College, Thiruvananthapuram'}, 
{ value:"Marathwada Mitra Mandal's College of Commerce (MMCC)"},
{ value:'Marian College, Kuttikanam'},
{ value:'Marian College, Kuttikanam'},
{ value:'Marian College, Kuttikanam'},
{ value:'Maris Stella College'},
{ value:'Massachusetts Institute of Technology (MIT), United States'},
{ value:'Mathuradevi Institute of Technology & Management, Indore'},
{ value:'Maulana Azad Medical College'},
{ value:'Maulana Azad Medical College (MAMC) Delhi'},
{ value:'Maulana Azad National Institute of Technology, Bhopal'},
{ value:'MCC - Madras Christian College'},
{ value:'MCM DAV College for Women'},
{ value:'MCM DAV College for Women, Chandigarh'},
{ value:'MCM DAV College for Women, Chandigarh'},
{ value:"MDI Gurgaon - Management Development Institute,Gurgaon"},
{ value:'med Forces Medical College (AFMC) Pune'},
{ value:'Medical College & Hospital Kolkata'},
{ value:'Medical College Baroda (MCB) Vadodara'},
{ value:'MediCaps University, Indore'},
{ value:'MGM Medical College Indore'},
{ value:'Miranda House, Delhi'},
{ value:'Miranda House, Delhi'},
{ value:'"Miranda House, Delhi University'},
{ value:'MIT Arts, Commerce and Science College'},
{ value:'MIT School of Telecom Management'},
{ value:'MIT World Peace University, [MIT-WPU] Pune'},
{ value:'MMK and SDM Mahila Maha Vidyalaya'},
{ value:'Mody University of Technology and Science, [MITS] Sikar'},
{ value:'Motilal Nehru Institute National Institute of Technology (NIT), Allahabad'},
{ value:'Motilal Nehru National Institute of Technology Allahabad Prayagraj'},
{ value:'Motilal Nehru National Institute of Technology, [MNNIT] Allahabad'},
{ value:'Motilal Nehru National Institute of Technology, Allahabad'},
{ value:'Mount Carmel College'},
{ value:'MS Ramaiah Institute of Management, Bangalore'},
{ value:'MS Ramaiah Law College Bangalore'},
{ value:'MS Ramaiah Medical College Bangalore'},
{ value:'Mt. Carmel Institute of Management'},
{ value:'Muffakham Jah College of Engineering and Technology,Hyderabad, Telangana'},
{ value:'Mukesh Patel School of Technology Management & Engineering, [MPSTME] Mumbai'},
{ value:'Muthurangam Government Arts College, Vellore'},
{ value:'MVJ College of Engineering,Bengaluru, Karnataka'},
{ value:'N K P Salve Institute of Medical Sciences & Research Centre, Nagpur'},
{ value:'Nalanda Law College Mumbai'},
{ value:'Nallamuthu Gounder Mahalingam College'},
{ value:'NALSAR Hyderabad'},
{ value:'Narayana Medical College Nellore'},
{ value:'Narsee Monjee Institute of Management Studies -Mumbai'},
{ value:'Narsee Monjee Institute of Management Studies, [NMIMS] Mumbai'},
{ value:'Narsee Monjee Institute of Management Studies, Mumbai'},
{ value:'National Academy of Legal Studies and Research University(NALSAR), Hyderabad'},
{ value:'National Centre for Agricultural Economics and Policy Research (NCAP)'},
{ value:'National College, Tiruchirapalli'}, 
{ value:'National College, Tiruchirapalli'}, 
{ value:'National College, Tiruchirapalli'}, 
{ value:'National Council of Applied Economic Research (NCAER)'},
{ value:'National Institute of Fashion Technology (NIFT), Bangalore'},
{ value:'National Institute of Fashion Technology (NIFT), Chennai'},
{ value:'National Institute of Fashion Technology (NIFT), Delhi'},
{ value:'National Institute of Fashion Technology (NIFT), Hyderabad'},
{ value:'National Institute of Industrial Engineering, Mumbai'},
{ value:'National Institute of Industrial Engineering, Mumbai'},
{ value:'National Institute of Management'},
{ value:'National Institute of Public Finance and Policy'},
{ value:'National Institute of Technology (NIT), Bharatidasan'},
{ value:'National Institute of Technology (NIT), Kurukshetra'},
{ value:'National Institute of Technology (NIT), Other'},
{ value:'National Institute of Technology (NIT), Patna'},
{ value:'National Institute of Technology (NIT), Raipur'},
{ value:'National Institute of Technology (NIT), Raipur'},
{ value:'National Institute of Technology (NIT), Srinagar'},
{ value:'National Institute of Technology (NIT), Tiruchirappalli'},
{ value:'National Institute of Technology Warangal'},
{ value:'National Institute of Technology, [NIT] Durgapur'},
{ value:'National Institute of Technology, [NIT] Kurukshetra'},
{ value:'National Institute of Technology, [NIT] Surathkal'},
{ value:'National Institute of Technology, [NIT] Thiruchirapalli'},
{ value:'National Law College Gurgaon'},
{ value:'National Law University Delhi'},
{ value:'Nehru Arts and Science College'},
{ value:'Ness Wadia College of Commerce'},
{ value:'Netaji Subhas Institute of Technology,delhi'},
{ value:'Netaji Subhash Chandra Bose Medical College Jabalpur'},
{ value:'Netaji Subhash Chandra Bose Medical College, Jabalpur'},
{ value:'New Horizon College of Engineering, Bengaluru'},
{ value:'New Law College Bharati Vidyapeeth Pune'},
{ value:'Nilratan Sircar Medical College, Kolkata'},
{ value:'NIMS University Jaipur'},
{ value:'Nirma University'},
{ value:'Nirma University of Science and Technology,Ahmedabad, Gujarat'},
{ value:'Nirmalagiri College, Kannur'},
{ value:'Nirmalagiri College, Kannur'},
{ value:'Nirmalagiri College, Kannur'},
{ value:'NIT Agartala'},
{ value:'NIT Calicut'},
{ value:'NIT Durgapur'},
{ value:'NIT Hamirpur'},
{ value:'NIT Kurukshetra'},
{ value:'NIT Meghalaya'},
{ value:'NIT Raipur'},
{ value:'NIT Rourkela'},
{ value:'NIT Silchar'},
{ value:'NIT Surathkal'},
{ value:'NIT Tiruchirappalli'},
{ value:'NIT Warangal'},
{ value:'NITIE'},
{ value:'Nitte Meenakshi Institute of Technology, [NMIT] Bangalore'},
{ value:'NITTE School of Management, Bangalore'},
{ value:'NLSIU Bangalore'},
{ value:'NLU Jodhpur'},
{ value:'Noida International University'},
{ value:'North Orissa University, Directorate of Distance and Continuing Education, [DDCE] Mayurbhanj'},
{ value:'Northern India Institute of Fashion Technology (NIIFT), Mohali'},
{ value:'NRI Medical College Guntur'},
{ value:'NUALS Kochi'},
{ value:'NUJS Kolkata'},
{ value:'Osmania Medical College, Hyderabad'},
{ value:'Osmania University'},
{ value:'P.E.S. Institute of Technology,Bangalore, Karnataka'},
{ value:'Padala Ram Reddy Law College Hyderabad'},
{ value:'Padmashree Dr D Y Patil Medical College Pune'},
{ value:'Padmashree Dr DY Patil College of Law Mumbai'},
{ value:'Padmashree Dr DY Patil College of Law Pune'},
{ value:'Padmashree Dr DY Patil Medical College Mumbai'},
{ value:'Pandit Deendayal Upadhyay Medical College Rajkot'},
{ value:'Pandit Dindayal Upadhyay Medical College Rajkot'},
{ value:'Pandit Dwarka Prasad Mishra Indian Institute of Information Technology, Design and Manufacturing (IIITDM) Jabalpur'},
{ value:'Panjab University'},
{ value:'Panjab University, Chandigarh'},
{ value:'Patel Group of Institutions, [PGI] Mehsana'},
{ value:'PEC University of Technology, Chandigarh'},
{ value:'Pendekanti Institute of Management'},
{ value:'Pentakanti Law College Hyderabad'},
{ value:"People's Medical College, Bhopal"},
{ value:'PES Modern Law College Pune'},
{ value:'PES University, Bengaluru'},
{ value:'PIMR - Prestige Institute of Management and Research (PG Campus)'},
{ value:'PK University, [PKU] Shivpuri'},
{ value:'Planning Unit, Indian Statistical Institute'},
{ value:'Poddar Group of Institutions'},
{ value:'Pondicherry Dental College, Pondicherry'},
{ value:'Pondicherry Engineering College'},
{ value:'Pondicherry Engineering College, Pondicherry'},
{ value:'Pondicherry Institute of Hospitality Crafts, Pondicherry'},
{ value:'Pondicherry Institute of Medical Sciences Pondicherry'},
{ value:'Pondicherry University'},
{ value:'Pondicherry University, Puducherry'},
{ value:'Post Graduate Institute of Medical Sciences & Research (PGIMER) Chandigarh'},
{ value:'Pragathi Mahavidyalaya, Hyderabad'},
{ value:'Pravara Institute of Medical Sciences Ahmednagar'},
{ value:'Presidency College, Bangalore'},
{ value:'Presidency College, Chennai'},
{ value:'Presidency College, Chennai'},
{ value:'Presidency College, Chennai'},
{ value:'Presidency College, Chennai '},
{ value:'Presidency College, Kolkatta'},
{ value:'Prestige Institute of Management and Research'},
{ value:'Prestige Institute of Management Dewas'},
{ value:'Prestige Institute of Mangement, Gwalior'},
{ value:'Prin. L.N. Welingkar Institute of Management Development & Research'},
{ value:'Priyadarshini Engineering College, Vellore'},
{ value:'Providence Womens College, Kozhikode'},
{ value:'PSG College of Arts and Science, Coimbatore '},
{ value:'PSG College of Arts and Science, Coimbatore '},
{ value:'PSG College of Arts and Science, Coimbatore '},
{ value:'PSG College of Technology'},
{ value:'PSG College of Technology, Coimbatore'},
{ value:'PSGR Krishnammal College for Women, Coimbatore '},
{ value:'PSGR Krishnammal College for Women, Coimbatore '},
{ value:'PSGR Krishnammal College for Women, Coimbatore '},
{ value:'Pt BD Sharma Postgraduate Institute of Medical Sciences Rohtak'},
{ value:'Pt Harishnkar Shukla Memorial College, Raipur'},
{ value:'Pt J.N.M. Medical College Raipur'},
{ value:'Pune University'},
{ value:'Punjab College of Law Patiala'},
{ value:'Punjab College of Technical Education'},
{ value:'Punjab School of Management Studies, Punjab University'},
{ value:'Queen Mary`s College, Chennai'},
{ value:'Queen Mary`s College, Chennai'},
{ value:'Queen Mary`s College, Chennai '},
{ value:'R Sankar Memorial SNDP Yogam Arts and Science College, Kozhikode'},
{ value:'R. V. College of Engineering, Bengaluru'},
{ value:'R.A. Podar Institute of Management, Jaipur'},
{ value:'R.V. College of Engineering,Bangalore, Karnataka'},
{ value:'Rai University'},
{ value:'Raja Rajeswari Medical College Bangalore'},
{ value:'Rajagiri Business School'},
{ value:'Rajendra Institute of Medical Sciences (RIMS) Ranchi'},
{ value:'Rajiv Gandhi Indian Institute of Management'},
{ value:'Rajiv Gandhi Institute of Law Kakinada'},
{ value:'Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal'},
{ value:'Rama Krishna Mission Vivekananda Centenary College, Rahara '},
{ value:'Rama PG College'},
{ value:'Ramakrishna Mission Residential College, Kolkata '},
{ value:'Ramakrishna Mission Residential College, Kolkata'},
{ value:'Ramakrishna Mission Vidyamandira, Howrah'},
{ value:'Ramakrishna Mission Vidyamandira, Howrah'},
{ value:'Ramakrishna Mission Vidyamandira, Howrah'},
{ value:'Ramanujan College, New Delhi'},
{ value:'Ramanujan College, New Delhi'},
{ value:'Ramanujan College, New Delhi'},
{ value:'"Ramjas College, Delhi University'},
{ value:'Rathinam College of Arts and Science - RCAS Coimbatore'},
{ value:'Rathinam College of Arts and Science, Coimbatore'},
{ value:'Rathinam College of Arts and Science, Coimbatore'}, 
{ value:'Rathinam College of Arts and Science, Coimbatore'}, 
{ value:'Rayat Bahra University, Hoshiarpur'},
{ value:'Rayat College of Law Chandigarh'},
{ value:'RCC Institute of Information Technology, Kolkata'},
{ value:'Research and Information System for Developing Countries (RIS)'},
{ value:'Reserve Bank of India'},
{ value:'Rizvi Law College Mumbai'},
{ value:'Rungta College of Engineering and Technology, [RCET] Bhilai'},
{ value:'S. B. College, Kottayam '},
{ value:'S. B. College, Kottayam '},
{ value:'S. B. College, Kottayam '},
{ value:'S. P. Jain Institute of Management & Research'},
{ value:'Sacred Heart College, Ernakulam '},
{ value:'Sacred Heart College, Ernakulam '},
{ value:'Sacred Heart College, Ernakulam '},
{ value:'Sacred Heart College, Tirupattur'},
{ value:'Sagi Ramakrishnam Raju Engineering College, Andhra Pradesh'},
{ value:'Sanjay Gandhi Postgraduate Institute of Medical Sciences Lucknow'},
{ value:'Sarala Birla University, [SBU] Ranchi'},
{ value:'Sardar Patel Institute of Technology, [SPIT] Mumbai'},
{ value:'Sardar Vallabhbhai National Institute of Technology, Gujarat'},
{ value:'Sarvepalli Radhakrishnan University, [SRKU] Bhopal'},
{ value:'Sathyabama Institute of Science and Technology, Chennai'},
{ value:'Sathyabama University'},
{ value:'Saveetha Medical College Chennai'},
{ value:'School of Communication & Management Studies'},
{ value:'School of Economics, Management and Information Systems, North-Eastern Hill University'},
{ value:'School of Economics, University of Hyderabad'},
{ value:'School of Indian Legal Thought MG University Kottayam'},
{ value:'School of Law ICFAI University Dehradun'},
{ value:'School of Management Studies, University of Hyderabad, Hyderabad '},
{ value:'School of Management, Pondicherry University'},
{ value:'School of Petroleum Management, Pandir Deendayal Petroleum University'},
{ value:'SCMS Pune - Symbiosis Centre for Management Studies'},
{ value:'Scott Christian College, Nagercoil'},
{ value:'Scott Christian College, Nagercoil '},
{ value:'Scott Christian College, Nagercoil '},
{ value:'SDM Institute for Management Development'},
{ value:'SDM Law College Mangalore'},
{ value:'SDM Medical College Dharwad'},
{ value:'Seth Gordhandas Sunderdas Medical College Mumbai'},
{ value:'Shaheed Bhagat Singh College (Evening), Delhi'},
{ value:'Shaheed Bhagat Singh College (Evening), Delhi'},
{ value:'Shaheed Rajguru College of Applied Sciences for Women, Delhi '},
{ value:'Shaheed Sukhdev College of Business Studies'},
{ value:'Shanmugha Arts Science Technology & Research Academy, Tamil Nadu'},
{ value:'Shanmugha Arts Science Technology &amp Research Academy (SASTRA)'},
{ value:'Sharda University Greater Noida'},
{ value:'Sharda University, Greater Noida'},
{ value:'Shiva Shivani Institute of Management'},
{ value:'Shivaji College, Delhi'},
{ value:'"Shivaji College, Delhi University'},
{ value:'Shri Aurobindo Institute of Medical Sciences Indore'},
{ value:'Shri Bhagawan Mahaveer Jain College, Bangalore'},
{ value:'Shri Bhagawan Mahaveer Jain College, Bangalore'},
{ value:'Shri Dharmasthala Manjunatheshwara College, Ujire'},
{ value:'Shri Girraj Maharaj College of Law and Professional Studies Mathura'},
{ value:'Shri Mata Vaishno Devi University, Jammu & Kashmir'},
{ value:'Shri Ram College of Commerce, Delhi '},
{ value:'Shri Ram College of Commerce, Delhi '},
{ value:'Shri Shankaracharya Technical Campus, [SSTC] Bhilai'},
{ value:'Shri Vaishnav Institute of Law Indore'},
{ value:'Shri Vaishnav Vidyapeeth Vishwavidyalaya, [SVVV] Indore'},
{ value:'Shyam Lal College, Delhi'},
{ value:'Shyam Lal College, Delhi '},
{ value:'Shyam Lal College, Delhi '},
{ value:'Shyam Shah Medical College, Rewa'},
{ value:'SICSR - Symbiosis Institute of Computer Studies and Research'},
{ value:'Siddaganga Institute of Technology, Tumkur'},
{ value:'SIES College of Management Studies, [SIESCOMS] Mumbai'},
{ value:'Silchar Medical College & Hospital Silchar'},
{ value:'Silver Jubilee Degree College, Kurnool '},
{ value:'Silver Jubilee Degree College, Kurnool '},
{ value:'Silver Jubilee Degree College, Kurnool '},
{ value:'Sinhgad Institute of Management'},
{ value:'Sinhgad Law College Pune'},
{ value:'Sir M. Visvesvaraya Institute of Technology,Bengaluru, Karnataka'},
{ value:'Sister Nivedita University, [SNU] Kolkata'},
{ value:'Sivananda Sarma Memorial RV Degree College'},
{ value:'Smt NHL Municipal Medical College Ahmedabad'},
{ value:'Softdot HiTech Educational and Training Institute, New Delhi'},
{ value:'SRCW - Sri Ramakrishna College of Arts & Science For Women'},
{ value:'Sreenidhi Institute of Science and Technology,Hyderabad, Telangana'},
{ value:'Sri Guru Ram Das Institute of Medical Sciences & Research Amritsar'},
{ value:'Sri Guru Tegh Bahadur Khalsa College, Delhi'},
{ value:'Sri Guru Tegh Bahadur Khalsa College, Delhi '},
{ value:'Sri Guru Tegh Bahadur Khalsa College, Delhi '},
{ value:'Sri Kanyaka Parameswari Arts and Science College for Women'},
{ value:'Sri Krishna Arts and Science College, Coimbatore'},
{ value:'Sri Krishna Arts and Science College, Coimbatore'},
{ value:'Sri Krishna Arts and Science College, Coimbatore '},
{ value:'Sri Krishna College of Engineering and Technology'},
{ value:'Sri Meenakshi Government College for Women, Madurai '},
{ value:'Sri Meenakshi Government College for Women, Madurai '},
{ value:'Sri Meenakshi Government College for Women, Madurai '},
{ value:'Sri Ramachandra Medical College & Research Institute, Chennai'},
{ value:'Sri Ramachandra Medical College Chennai'},
{ value:'Sri Ramakrishna College of Arts and Science'},
{ value:'Sri Ramakrishna Mission Vidyalaya College of Arts & Science, Coimbatore'},
{ value:'Sri Ramakrishna Mission Vidyalaya College of Arts & Science, Coimbatore'},
{ value:'Sri Ramakrishna Mission Vidyalaya College of Arts & Science, Coimbatore '},
{ value:'Sri RKM Law College Chittoor'},
{ value:'Sri Sairam Engineering College,Chennai, Tamil Nadu'},
{ value:'Sri Siddhartha Institute of Management Studies'},
{ value:'Sri Sivasubramaniya Nadar College of Engineering, Tamil Nadu'},
{ value:'Sri Sringeri Sharada Institute of Management'},
{ value:'Sri Venkateswara College, Delhi'},
{ value:'Sri Venkateswara College, Delhi '},
{ value:'Sri Venkateswara College, Delhi '},
{ value:'Sri Venkateswara University, Andhra Pradesh'},
{ value:'SRM Business School, [SRMBS] Lucknow'},
{ value:'SRM Institute of Science and Technology (SRM IST)'},
{ value:'SRM Institute of Science and Technology, Chennai'},
{ value:'SRM University, Chennai'},
{ value:'SRM University, NCR Campus, Ghaziabad'},
{ value:"St Ann's College for Women"},
{ value:"St Joseph'S College - SJC"},
{ value:'St Soldier Law College Jalandhar'},
{ value:'"St Stephens College, Delhi University, New Delhi'},
{ value:'St Wilfred’s College of Law Jaipur'},
{ value:'St. Aloysius College Magaluru'},
{ value:'St. Aloysius College, Mangalore '},
{ value:'St. Aloysius College, Mangalore '},
{ value:'St. Aloysius College, Mangalore '},
{ value:'St. Johns Medical College Bangalore'},
{ value:"St. John's Medical College, Bangalore"},
{ value:'St. Joseph`s College of Commerce, Bengaluru'},
{ value:'St. Joseph`s College, Calicut'},
{ value:'St. Joseph`s College, Calicut'},
{ value:'St. Joseph`s College, Calicut '},
{ value:'St. Joseph`s College, Tiruchirappalli'},
{ value:'St. Joseph`s College, Tiruchirappalli '},
{ value:'St. Joseph`s College, Tiruchirappalli '},
{ value:'St. Josephs Arts & Science College, Bengaluru '},
{ value:'St. Josephs Arts & Science College, Bengaluru '},
{ value:'St. Josephs Arts & Science College, Bengaluru '},
{ value:"St. Joseph's College, Thrissur"},
{ value:"St. Joseph's College, Thrissur"},
{ value:" St. Joseph's College, Thrissur "},
{ value:"St. Joseph's Degree and PG College (SJDPGC)"},
{ value:"St. Mira's College For Girls"},
{ value:'St. Stephen`s College, Delhi'},
{ value:'St. Stephen`s College, Delhi'},
{ value:'St. Teresa`s College, Ernakulam '},
{ value:'St. Teresa`s College, Ernakulam '},
{ value:'St. Thomas College, Thrissur '},
{ value:'St. Thomas College, Thrissur '},
{ value:'St. Thomas College, Thrissur'}, 
{ value:'St. Wilfreds P.G. College, Jaipur'},
{ value:'St. Xavier`s College, Ahmedabad'},
{ value:'St. Xavier`s College, Ahmedabad'},
{ value:'St. Xavier`s College, Ahmedabad '},
{ value:'St. Xavier`s College, Kolkata '},
{ value:'St. Xavier`s College, Kolkata '},
{ value:'St. Xavier`s College, Kolkata '},
{ value:'St. Xavier`s College, Mumbai '},
{ value:'St. Xavier`s College, Mumbai '},
{ value:'St. Xavier`s College, Mumbai '},
{ value:'St. Xavier`s College'},
{ value:'St. Xavier`s College - Goa'},
{ value:'St.Joseph`s College, Bangalore'},
{ value:'St.Xavier`s College, Kolkatta'},
{ value:'St.Xavier`s College, Palayamkottai '},
{ value:'St.Xavier`s College, Palayamkottai '},
{ value:'St.Xavier`s College, Palayamkottai '},
{ value:'Stanley Medical College (SMC) Chennai'},
{ value:'Stanley Medical College (SMC), Chennai'},
{ value:'State Institute of Education Technology (SIET), Lucknow'},
{ value:'State Institute of Education Technology (SIET), Patna'},
{ value:'State Institute of Education Technology (SIET), Thiruvananthapuram'},
{ value:'Stella Maris College (SMC), Chennai'},
{ value:'Stella Maris College for Women, Chennai '},
{ value:'Stella Maris College for Women, Chennai '},
{ value:'Stella Maris College for Women, Chennai '},
{ value:'Surana College UG College'},
{ value:'Swami Sarvanand Giri Panjab University Regional Centre Hoshiarpur'},
{ value:'Swami Vivekanand University, Sagar'},
{ value:'Sydenham Institute of Management Studies, Research and Entrepreneurship Education, Mumbai '},
{ value:'Symbiosis Centre for Management and HRD'},
{ value:'Symbiosis Centre for Management and Human Resource Development, Pune'},
{ value:'Symbiosis Institute of Business Management, Hyderabad'},
{ value:'Symbiosis Institute of Operations Management, Nashik'},
{ value:'Symbiosis Institute of Telecom Management, Pune'},
{ value:'Symbiosis Law College Pune'},
{ value:'Symbiosis Law School Noida'},
{ value:'T. John College'},
{ value:'T. K. M. College of Arts and Science, Kollam'},
{ value:'T. K. M. College of Arts and Science, Kollam '},
{ value:'T. K. M. College of Arts and Science, Kollam '},
{ value:'T.A. Pai Management Institute'},
{ value:'Tecnia Institute of Advanced Studies'},
{ value:'Tecnia Institute of Advanced Studies [TIAS], New Delhi'},
{ value:'Terna Medical College & Hospital Navi Mumbai'},
{ value:'Tezpur University'},
{ value:'Thapar Institute of Engineering & Technology'},
{ value:'Thapar Institute of Engineering & Technology, [TIET] Patiala'},
{ value:'Thapar University'},
{ value:'Thapar University, Patiala, Punjab'},
{ value:'The American College, Madurai'},
{ value:'The American College, Madurai'},
{ value:'The American College, Madurai '},
{ value:'The Business School, Jammu University'},
{ value:'The Chartered Institute of Management Accountants, Mumbai'},
{ value:'The Delhi Institute of Technology and Paramedical Sciences, New Delhi'},
{ value:'The ICFAI University, Sikkim'},
{ value:'The Institute of Chartered Accountants of India, Chennai'},
{ value:'The Institute of Post Graduate Medical Education & Research (IPGMER), Kolkata'},
{ value:'The Oxford College of Business Management'},
{ value:'The W.B. National University of Juridical Sciences(NUJS), Kolkata'},
{ value:'Thiagarajar College of Engineering, Madurai'},
{ value:'Thiagarajar College, Madurai'},
{ value:'Thiagarajar College, Madurai'},
{ value:'Thiagarajar College, Madurai '},
{ value:'TMU - Teerthanker Mahaveer University'},
{ value:'Topiwala National Medical College Mumbai'},
{ value:'University Business School (UBS), Chandigarh'},
{ value:'University College of Engineering, Andhra Pradesh'},
{ value:'University College of Engineering, Hyderabad'},
{ value:'"University College of Engineering,Hyderabad, Telangana'},
{ value:'University College of Law - Osmania University'},
{ value:'University College of Law University of Calcutta'},
{ value:'University College of Medical Sciences'},
{ value:'University College of Medical Sciences Delhi'},
{ value:'University College of Medical Sciences, [UCMS] New Delhi'},
{ value:'University College, Thiruvananthapuram'},
{ value:'University College, Thiruvananthapuram '},
{ value:'University Institute of Engineering and Technology,Chandigarh, Punjab & Haryana'},
{ value:'University Institute of Legal Studies Chandigarh'},
{ value:'University Law College Gauhati University'},
{ value:'University Law College Utkal University'},
{ value:'University of Delhi'},
{ value:'University of Mumbai'},
{ value:'University of Mumbai'},
{ value:'University of Technology, [UOT] Jaipur'},
{ value:'University School of Law & Legal Studies Guru Gobind Singh Indraprastha University Delhi'},
{ value:'Uttaranchal Institute of Management'},
{ value:'V. V. Vanniaperumal College for Women, Virudhnagar'}, 
{ value:'V. V. Vanniaperumal College for Women, Virudhnagar '},
{ value:'V. V. Vanniaperumal College for Women, Virudhnagar'}, 
{ value:'Vaikunth Mehta National Institute of Cooperative Management'},
{ value:'Vardhman Mahavir Medical College'},
{ value:'Vardhman Mahavir Medical College Delhi'},
{ value:'Vardhman Mahavir Medical College, [VMMC] New Delhi'},
{ value:'Veermata Jijabai Technological Institute, [VJTI] Mumbai'},
{ value:'Veermata Jijabai Technological Institute, Mumbai'},
{ value:'Veermata Jijabai Technological Institute,Mumbai, Maharashtra'},
{ value:'Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College, Chennai'},
{ value:'Vel Tech Rangarajan Dr. Sagunthala R & D Institute of Science and Technology, Chennai'},
{ value:'Vellalar College for Women, Erode '},
{ value:'Vellalar College for Women, Erode '},
{ value:'Vellalar College for Women, Erode '},
{ value:'Vellore Engineering College (VEC)'},
{ value:'Vellore Institute of Technology'},
{ value:'Vellore Institute of Technology'},
{ value:'Vellore Institute of Technology (VIT)'},
{ value:'Vidyasagar Institute of Management'},
{ value:'Vignan University, Guntur'},
{ value:'Vignana Jyothi Institute of Management'},
{ value:'Vimala College, Thrissur'}, 
{ value:'Vimala College, Thrissur'}, 
{ value:'Vimala College, Thrissur'}, 
{ value:'Vinoba Bhave University'},
{ value:'Vinod Gupta School of Management'},
{ value:'Virudhunagar Hindu Nadars Senthikumara Nadar College, Virudhnagar'}, 
{ value:'Virudhunagar Hindu Nadars Senthikumara Nadar College, Virudhnagar'}, 
{ value:'Virudhunagar Hindu Nadars Senthikumara Nadar College, Virudhnagar'}, 
{ value:'Visvesvaraya National Institute of Technology, Nagpur'},
{ value:'Visvesvaraya Technological University'},
{ value:'Visveswarapura College of Law Bangalore'},
{ value:'VIT Business School, Vellore'},
{ value:'VIT University, [VIT] Bhopal'},
{ value:'VIT University, [VIT] Vellore'},
{ value:'Vivekanand Institute of Professional Studies Delhi'},
{ value:'Vivekananda College of Law Bangalore'},
{ value:'Vivekananda Institute of Professional Studies, Pitampura'},
{ value:'Vydehi Institute of Medical Science & Research Bangalore'},
{ value:'Women`s Christian College, Chennai'},
{ value:'Women`s Christian College, Chennai '},
{ value:'Women`s Christian College, Chennai '},
{ value:'Women`s Christian College, Nagercoil'}, 
{ value:'Women`s Christian College, Nagercoil'}, 
{ value:'Women`s Christian College, Nagercoil'}, 
{ value:'Women`s Christian College'},
{ value:'Xavier Institute of Management'},
{ value:'Xavier Institute of Management & Entrepreneurship'},
{ value:'Xavier Institute of Management and Entrepreneurship, Bangalore'},
{ value:'Xavier Institute of Social Service, Ranchi'},
{ value:'Xavier Labour Relations Institute (XLRI)'},
{ value:'Xavier Labour Relations Institute (XLRI), Jamshedpur'},
{ value:'Xavier University'},
{ value:"XLRI Xavier School of Management,Jamshedpur"},
{ value:'YMCA Institute for Office Management, New Delhi'},
{ value:'YMCA University of Science and Technology, Faridabad'},
{value: 'Other'}
    ];

    this.courseTypes = [
      { value: 'PART TIME' },
      { value: 'FULL TIME' },
      { value: 'CORRESPONDING' },
    ];
    console.log(this.educations);
    this.signupEducationForm.patchValue({
      education: this.applicantEducation,
    });
  }
  educationFormInit() {
    this.signupEducationForm = this.formBuilder.group({
      education: this.formBuilder.array([]),
    });
  }
  qualificationChange(evt, i) {
    console.log(evt.target.value, i);
    this.disableLinks(
      this.qualificationsArray[0].indexOf({ value: evt.target.value }),
      i
    );
    evt.target.value === 'Below 10th' ? this.clearForm() : console.log('');
    if (evt.target.value === '10th' || '12th') {
    }
  }
  addfieldsFormGroup() {
    const newFields = this.formBuilder.group({
      qualification: ['', Validators.required],
      course: ['', Validators.required],
      specialization: ['', Validators.required],
      college: ['', Validators.required],
      course_type: ['', Validators.required],
      passing_year: ['', Validators.required],
    });
    this.educations.push(newFields);
    this.disableLink = false;
  }
  get educations() {
    return this.signupEducationForm.get('education') as FormArray;
  }
  deletePhonee(i) {
    this.educations.removeAt(i);
  }
  onFormSubmit() {
    console.log(this.educations.controls);
    console.log(
      this.educations.controls[this.educations.controls.length - 1].value
        .qualification
    );
    // this.router.navigate(['/candidate/dashboard']);
    console.log(this.items);
    for (let i = 0; i < this.educations.controls.length; i++) {
      if (this.educations.controls[i].value.qualification === '') {
        i++;
      } else {
        this.education.push(this.educations.controls[i].value);
      }
    }
    for (let i = 0; i < this.items.length; i++) {
      this.skills.push(this.items[i].display);
    }
    console.log('education', this.education);
    this.updateEducation();
  }
  disableLinks(i, j) {
    if (
      this.educations.controls[this.educations.controls.length - 1].value
        .qualification === ''
    ) {
      this.disableLink = false;
    } else {
      if (
        this.educations.controls[this.educations.controls.length - 1].value
          .qualification === 'Doctrate PHD'
      ) {
        this.addfieldsFormGroup();
        this.disableLink = false;
        this.changeQualifuctions(1, j);
      } else if (
        this.educations.controls[this.educations.controls.length - 1].value
          .qualification === 'Masters/Post Graduation'
      ) {
        this.addfieldsFormGroup();
        this.disableLink = false;
        this.changeQualifuctions(2, j);
      } else if (
        this.educations.controls[this.educations.controls.length - 1].value
          .qualification === 'Graduation/Diploma'
      ) {
        this.changeQualifuctions(3, j);
        this.disableLink = false;
        this.addfieldsFormGroup();
      } else if (
        this.educations.controls[this.educations.controls.length - 1].value
          .qualification === '12th'
      ) {
        // this.addfieldsFormGroup();
        this.disableLink = true;
        this.changeQualifuctions(4, j);
      } else if (
        this.educations.controls[this.educations.controls.length - 1].value
          .qualification === '10th'
      ) {
        this.disableLink = false;
      } else if (
        this.educations.controls[this.educations.controls.length - 1].value
          .qualification === 'Below 10th'
      ) {
        this.disableLink = false;
        this.clearForm();
      } else {
        this.disableLink = false;
      }
    }
  }
  changeQualifuctions(i, j) {
    console.log(i, j);
    this.below10 = true;
    const qualificationsNewArray = this.qualificationsArray[0].slice(i, 5);
    console.log(qualificationsNewArray);
    this.qualificationsArray.push(qualificationsNewArray);
  }
  clearForm() {
    console.log('reseting Form');
    this.below10 = false;
    this.disableLink = false;
    for (let i = 1; i < this.educations.controls.length; i++) {
      console.log(i);
      this.educations.removeAt(i);
    }
    console.log(this.educations.controls);
  }
  updateEducation() {
    const form = {
      education: this.education,
    };
    console.log(form);
  }

  setPersonalForm() {
    this.personalForm.patchValue({
      date_of_birth_date: this.applicantDetails.date_of_birth_date,
      date_of_birth_month: this.applicantDetails.date_of_birth_month,
      date_of_birth_Year: this.applicantDetails.date_of_birth_Year,
      differntly_abled: this.applicantDetails.differntly_abled,
      gender: this.applicantDetails.gender,
      languages: this.applicantDetails.languages,
      marital_status: this.applicantDetails.marital_status,
      address: this.applicantDetails.address,
      category: this.applicantDetails.category,
      area_pin_code: this.applicantDetails.area_pin_code,
    });
  }
  pesonalFormInit() {
    this.personalForm = new FormGroup({
      date_of_birth_date: new FormControl('', []),
      date_of_birth_month: new FormControl('', []),
      date_of_birth_Year: new FormControl('', []),
      differntly_abled: new FormControl('', []),
      gender: new FormControl('', []),
      languages: new FormControl('', []),
      marital_status: new FormControl('', []),
      address: new FormControl('', []),
      category: new FormControl('', []),
      area_pin_code: new FormControl('', []),
    });
  }
  updatePersonalForm() {
    const controls = this.personalForm.controls;
    const form = {
      date_of_birth_date: controls.date_of_birth_date.value,
      date_of_birth_month: controls.date_of_birth_month.value,
      date_of_birth_Year: controls.date_of_birth_Year.value,
      differntly_abled: controls.differntly_abled.value,
      gender: controls.gender.value,
      languages: controls.languages.value,
      marital_status: controls.marital_status.value,
      address: controls.address.value,
      category: controls.category.value,
      area_pin_code: controls.area_pin_code.value,
    };
    this.updateApplicantDetails(form);
    this.editPersonal();
  }
  cancelPersonalForm() {
    this.editPersonal();
  }
  editPersonal() {
    this.editPersonalForm = !this.editPersonalForm;
  }

  setCarrerEmployement() {
    this.desiredCareerForm.patchValue({
      industry: this.applicantDetails.industry,
      functional_area: this.applicantDetails.functional_area,
      role: this.applicantDetails.role,
      job_type: this.applicantDetails.job_type,
      employement_type: this.applicantDetails.employement_type,
      preferred_shift: this.applicantDetails.preferred_shift,
      expected_salary_lacs: this.applicantDetails.expected_salary_lacs,
      expected_salary_currency: this.applicantDetails.expected_salary_currency,
      expected_salary_thousand: this.applicantDetails.expected_salary_thousand,
      desired_location: this.applicantDetails.desired_location,
      desired_industry: this.applicantDetails.desired_industry,
    })
    this.selectIndustryEnd = this.applicantDetails.industry;
    this.selectFunctionalEnd = this.applicantDetails.functional_area;

    this.indus = this.industries.find(x => {
      return x._id === this.applicantDetails.industry;
    });
    console.log('asdsadsadasdsadasdad', this.indus);
    if (this.indus) this.indus = this.indus.value;

    this.indusd = this.industries.find(x => {
      return x._id === this.applicantDetails.desired_industry;
    });
    if (this.indusd) this.indusd = this.indusd.value;

    this.func = this.functionalArea.find(x => {
      return x._id === this.applicantDetails.functional_area;
    });

    console.log('asadsadasdasdas', this.func);
    if (this.func) this.func = this.func.value;
  }
  editCareerEmployement() {
    this.editCareerForm = !this.editCareerForm;
  }
  cancelCarrerForm() {
    this.editCareerEmployement();
    this.setCarrerEmployement();
  }
  updateCarrerForm() {
    const controls = this.desiredCareerForm.controls;
    // debugger
  //  console.log("controls",controls);
  //  console.log("evwrtg",controls.functional_area.value);
  }
  desiredCareerFormInit() {
    this.desiredCareerForm = this.formBuilder.group({
      industry: new FormControl('', []),
      functional_area: new FormControl('', []),
      role: new FormControl('', []),
      job_type: new FormControl('', []),
      employement_type: new FormControl('', []),
      preferred_shift: new FormControl('', []),
      expected_salary_lacs: new FormControl('', []),
      expected_salary_currency: new FormControl('', []),
      expected_salary_thousand: new FormControl('', []),
      desired_location: new FormControl('', []),
      desired_industry: new FormControl('', []),
    });
  }
  onDesiredFormSubmit() {
    const controls = this.desiredCareerForm.controls;
    const form = {
      industry: controls.industry.value,
      functional_area: controls.functional_area.value,
      role: controls.role.value,
      job_type: controls.job_type.value,
      employement_type: controls.employement_type.value,
      preferred_shift: controls.preferred_shift.value,
      expected_salary_lacs: controls.expected_salary_lacs.value,
      expected_salary_currency: controls.expected_salary_currency.value,
      expected_salary_thousand: controls.expected_salary_thousand.value,
      desired_location: controls.desired_location.value,
      desired_industry: controls.desired_industry.value,
    };
    this.updateApplicantDetails(form);
    this.editCareerEmployement();
  }

  employementFormInit() {
    this.employementForm = this.formBuilder.group({
      current_designation: new FormControl('', []),
      current_company: new FormControl('', []),
      current_salary_lakhs: new FormControl('', []),
      current_salary_thousand: new FormControl('', []),
      experience_year: new FormControl('', []),
      experience_month: new FormControl('', []),
      current_location: new FormControl('', []),
      duration_notice_period: new FormControl('', []),
      employement: this.formBuilder.array([]),
    });
  }

  updateEmployement() {
    const controls = this.employementForm.controls;
    console.log(controls);
    const form = {
      current_designation: controls.current_designation.value,
      current_company: controls.current_company.value,
      current_salary_lakhs: controls.current_salary_lakhs.value,
      current_salary_thousand: controls.current_salary_thousand.value,
      experience_year: controls.experience_year.value,
      experience_month: controls.experience_month.value,
      current_location: controls.current_location.value,
      duration_notice_period: controls.duration_notice_period.value,
      employment: controls.employement.value,
    };
    this.updateApplicantDetails(form);
    this.editEmployement();
  }
  cancelEmployement() {
    this.setEmployment();
    this.editEmployement();
  }
  addField() {
    if (this.employement.controls.length > 5) {
      this.toaster.warning('Cannot Add more than five Experiances');
    } else {
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
  }
  get employement() {
    return this.employementForm.get('employement') as FormArray;
  }
  noticeCheck() {
    this.Notice = !this.Notice;
  }

  editResume() {
    this.editCV = !this.editCV;
  }
  editEmployement() {
    this.editEmployementDetails = !this.editEmployementDetails;
    console.log(this.editEmployementDetails);
  }
  editSkills() {
    this.editSkill = !this.editSkill;
  }
  uploadSkills() {
    const Form = {
      skills: this.skill,
    };
    this.updateApplicantDetails(Form);
    this.editSkills();
  }
  deletePhone(i) {
    this.employement.removeAt(i);
  }
  setEmployment() {
    this.applicantEmployment = this.applicantDetails.employment;
    if (this.applicantEmployment === []) {
      this.isEmployment = false;
    } else {
      this.isEmployment = true;
      this.applicantEmployment = this.applicantDetails.employment;
    }
    this.employement.controls = [];
    console.log(this.applicantEmployment);

    for (const i of this.applicantEmployment) {
      // const x: any = [...i];
      // delete x._id;
      this.addField();
    }
    console.log(this.employement);
    this.employementForm.patchValue({
      duration_notice_period: this.applicantDetails.duration_notice_period,
      current_company: this.applicantDetails.current_company,
      current_designation: this.applicantDetails.current_designation,
      current_location: this.applicantDetails.current_location,
      current_salary_lakhs: this.applicantDetails.current_salary_lakhs,
      current_salary_thousand: this.applicantDetails.current_salary_thousand,
      experience_year: this.applicantDetails.experience_year,
      experience_month: this.applicantDetails.experience_month,
      employement: this.applicantEmployment,
    });
  }

  onItemAdded(evt) {
    console.log(evt);
    if (this.editSkill) {
      this.skill.push(evt.display);
      console.log(this.skill);
      console.log(this.skills);
    }
  }
  onItemRemoved(evt) {
    console.log(evt);
    if (this.editSkill) {
      const index = this.skill.indexOf(evt.display);
      if (index > -1) {
        this.skill.splice(index, 1);
      }
      console.log(this.skill);
    }
  }
  setSkills() {
    this.skill = [];
    this.skills = [];
    for (const i of this.applicantDetails.skills) {
      console.log(i);
      const obj = {
        display: i,
        value: i,
      };
      this.skills.push(obj);
      this.skill.push(i);
    }
  }
  cancelSkills() {
    this.setSkills();
    this.editSkill = false;
  }
  onItemSelectI(item: any) {
    console.log("here industry",item);
    this.selectIndustry.push(item);
    this.selectIndustryEnd.push(item['_id']);
    console.log("here industry @",this.selectIndustry);
  }
  OnItemDeSelectI(item: any) {
    console.log(item);
    for (let i = 0; i < this.selectIndustry.length; i++) {
      if (this.selectIndustry[i]._id === item._id) {
        this.selectIndustry.splice(i, 1);
      }
      if (this.selectIndustryEnd[i] === item._id) {
        this.selectIndustryEnd.splice(i, 1);
      }
    }
    console.log(this.selectIndustry);
  }
  onSelectAllI(items: any) {
    for (let i = 0; i < items.length; i++) {
      this.selectIndustry.push(items[i]);
      this.selectIndustryEnd.push(items[i]._id);
    }
    // this.selectIndustry = items
    // console.log(items);
  }
  onDeSelectAllI(items: any) {
    this.selectIndustry = [];
    this.selectIndustryEnd = [];
    console.log(this.selectIndustry);
  }

  onItemSelect(item: any) {
    console.log("data",item);
    console.log("selected",this.selectFunctional);
    this.selectFunctional.push(item);
    // this.selectFunctionalEnd.push(item._id);
    console.log(this.selectFunctional);
  }

  OnItemDeSelect(item: any) {
    console.log(item);
    for (let i = 0; i < this.selectFunctional.length; i++) {
      if (this.selectFunctional[i]._id === item._id) {
        this.selectFunctional.splice(i, 1);
      }
      if (this.selectFunctionalEnd[i] === item._id) {
        this.selectFunctionalEnd.splice(i, 1);
      }
    }
    console.log(this.selectFunctional);
  }

  onSelectAll(items: any) {
    //this.selectFunctional = items;
    for (let i = 0; i < items.length; i++) {
      this.selectFunctional.push(items[i]);
      this.selectFunctionalEnd.push(items[i]._id);
    }
    console.log(this.selectFunctional);
  }

  onDeSelectAll(items: any) {
    this.selectFunctional = [];
    this.selectFunctionalEnd = [];
    console.log(this.selectFunctional);
  }

  downloadCV(){
    console.log(this.applicantDownloadCV)
    window.open(this.applicantDownloadCV);
  }

  todoAttachResume() {
    document.getElementById("attach-resume").scrollIntoView(true);
    window.scrollBy(0, -150);
  }
todoResumeHeadline()
  {
    document.getElementById("resume-headline").scrollIntoView(true);
    window.scrollBy(0, -180);
  }
  todokeySkills(){
    document.getElementById("key-skills").scrollIntoView(true);
    window.scrollBy(0, -180);
  }
  todoEmployment(){
    document.getElementById("employment").scrollIntoView(true);
    window.scrollBy(0, -163);
  }
  todoEducation(){
    document.getElementById("education").scrollIntoView(true);
    window.scrollBy(0, -165);
  }

}
