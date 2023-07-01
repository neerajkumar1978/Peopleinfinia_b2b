import {Component, OnInit} from '@angular/core';
import {PostjobService} from './postjob.service';
import {IMyDpOptions} from 'mydatepicker';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators, NgForm, FormArray, FormBuilder} from '@angular/forms';
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {AppService} from '../app.component.service';
import {Options} from 'ng5-slider';
import {ToastrService} from 'ngx-toastr';
import {Title, DomSanitizer} from '@angular/platform-browser';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';

// import { flattenStyles } from '@angular/platform-browser/';
@Component({
  selector: 'app-post-new-job',
  templateUrl: './post-new-job.component.html',
  styleUrls: ['./post-new-job.component.css']
})
export class PostNewJobComponent implements OnInit {
  value: number = 5;
  options: Options = {
    floor: 0,
    ceil: 10
  };
  sampleCV;
  selectFunctionalEnd = [];
  selectIndustryEnd = [];
  selectFunctional = [];
  selectIndustry = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  postNewJobForm1: FormGroup;
  postNewJobForm2: FormGroup;
  postNewJobForm3: FormGroup;
  postNewJobForm4: FormGroup;
  activeTab = '1';
  skills = [];
  industries: any = [];
  UGCoursesSelected = [];
  functionalArea: any = [];
  qualifications: any = [];
  spans: any = [];
  currencies: any = [];
  periods: any = [];
  doc;
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  public items = [
    // {display: 'NodeJs', value: 'NodeJs'},
    // {display: 'Angular', value: 'Angular'},
    // {display: 'JavaScript', value: 'JavaScript'},
  ];
  user: any = {};
  commission;
  file: File;
  CVfileError = false;
  fileError = false;
  fileError1 = false;
  typeImage: any;
  CVtypeImage: any;
  fileArray = [];
  CVfileArray = [];
  fileName;
  CVfileName;
  base64textString: String = '';
  base64textString1: String = '';
  control1;
  control2;
  control3;
  control4;
  CTCLacs = [];
  MCTCLacs = [];
  dropdownSettingsLocation = {};
  CTCTh = [];
  submitted = false;
  submitted2 = false;
  dropdownSettingsI = {};
  dropdownSettingsF = {};
  dropdownSettingsUG = {};
  locations = [];
  PGCources = [];
  UGCources = [];
  PGColleges = [];
  grade = [];
  locationSelected = [];
  UGColleges = [];
  submitted3 = false;
  submitted4 = false;
  showJDFile = false;
  showCV = false;
  showJD;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
  };
  public model: any = {date: {year: 2018, month: 10, day: 9}};

  constructor(
    private postjobService: PostjobService,
    private appService: AppService,
    private completerService: CompleterService, private router: Router,
    private toastr: ToastrService,
    private _sanitizer: DomSanitizer) {
    this.getUser();
    this.getIndustries();
    this.getFunctionalArea();

  }

  ngOnInit() {
    this.getCompanyDetails()
    this.initForms();
    this.CTCLacs = [
      {value: '0 Lacs', display: '0'},
      {value: '1 Lacs', display: '1'},
      {value: '2 Lacs', display: '2'},
      {value: '3 Lacs', display: '3'},
      {value: '4 Lacs', display: '4'},
      {value: '5 Lacs', display: '5'},
      {value: '6 Lacs', display: '6'},
      {value: '7 Lacs', display: '7'},
      {value: '8 Lacs', display: '8'},
      {value: '9 Lacs', display: '9'},
      {value: '10 Lacs', display: '10'},
      {value: '11 Lacs', display: '11'},
      {value: '12 Lacs', display: '12'},
      {value: '13 Lacs', display: '13'},
      {value: '14 Lacs', display: '14'},
      {value: '15 Lacs', display: '15'},
      {value: '16 Lacs', display: '16'},
      {value: '17 Lacs', display: '17'},
      {value: '18 Lacs', display: '18'},
      {value: '19 Lacs', display: '19'},
      {value: '20 Lacs', display: '20'},
      {value: '21 Lacs', display: '21'},
      {value: '22 Lacs', display: '22'},
      {value: '23 Lacs', display: '23'},
      {value: '24 Lacs', display: '24'},
      {value: '25 Lacs', display: '25'},
      {value: '26 Lacs', display: '26'},
      {value: '27 Lacs', display: '27'},
      {value: '28 Lacs', display: '28'},
      {value: '29 Lacs', display: '29'},
      {value: '30 Lacs', display: '30'},
      {value: '31 Lacs', display: '31'},
      {value: '32 Lacs', display: '32'},
      {value: '33 Lacs', display: '33'},
      {value: '34 Lacs', display: '34'},
      {value: '35 Lacs', display: '35'},
      {value: '36 Lacs', display: '36'},
      {value: '37 Lacs', display: '37'},
      {value: '38 Lacs', display: '38'},
      {value: '39 Lacs', display: '39'},
      {value: '40 Lacs', display: '40'},
      {value: '41 Lacs', display: '41'},
      {value: '42 Lacs', display: '42'},
      {value: '43 Lacs', display: '43'},
      {value: '44 Lacs', display: '44'},
      {value: '45 Lacs', display: '45'},
      {value: '46 Lacs', display: '46'},
      {value: '47 Lacs', display: '47'},
      {value: '48 Lacs', display: '48'},
      {value: '49 Lacs', display: '49'},
      {value: '50 Lacs', display: '50'}
    ];
    this.MCTCLacs = [
      {value: '0 Lacs', display: '0'},
      {value: '1 Lacs', display: '1'},
      {value: '2 Lacs', display: '2'},
      {value: '3 Lacs', display: '3'},
      {value: '4 Lacs', display: '4'},
      {value: '5 Lacs', display: '5'},
      {value: '6 Lacs', display: '6'},
      {value: '7 Lacs', display: '7'},
      {value: '8 Lacs', display: '8'},
      {value: '9 Lacs', display: '9'},
      {value: '10 Lacs', display: '10'},
      {value: '11 Lacs', display: '11'},
      {value: '12 Lacs', display: '12'},
      {value: '13 Lacs', display: '13'},
      {value: '14 Lacs', display: '14'},
      {value: '15 Lacs', display: '15'},
      {value: '16 Lacs', display: '16'},
      {value: '17 Lacs', display: '17'},
      {value: '18 Lacs', display: '18'},
      {value: '19 Lacs', display: '19'},
      {value: '20 Lacs', display: '20'},
      {value: '21 Lacs', display: '21'},
      {value: '22 Lacs', display: '22'},
      {value: '23 Lacs', display: '23'},
      {value: '24 Lacs', display: '24'},
      {value: '25 Lacs', display: '25'},
      {value: '26 Lacs', display: '26'},
      {value: '27 Lacs', display: '27'},
      {value: '28 Lacs', display: '28'},
      {value: '29 Lacs', display: '29'},
      {value: '30 Lacs', display: '30'},
      {value: '31 Lacs', display: '31'},
      {value: '32 Lacs', display: '32'},
      {value: '33 Lacs', display: '33'},
      {value: '34 Lacs', display: '34'},
      {value: '35 Lacs', display: '35'},
      {value: '36 Lacs', display: '36'},
      {value: '37 Lacs', display: '37'},
      {value: '38 Lacs', display: '38'},
      {value: '39 Lacs', display: '39'},
      {value: '40 Lacs', display: '40'},
      {value: '41 Lacs', display: '41'},
      {value: '42 Lacs', display: '42'},
      {value: '43 Lacs', display: '43'},
      {value: '44 Lacs', display: '44'},
      {value: '45 Lacs', display: '45'},
      {value: '46 Lacs', display: '46'},
      {value: '47 Lacs', display: '47'},
      {value: '48 Lacs', display: '48'},
      {value: '49 Lacs', display: '49'},
      {value: '50+ Lacs', display: '50+'}
    ];
    this.CTCTh = [
      {value: '0 Thousand', display: '0'},
      {value: '10 Thousand', display: '10'},
      {value: '20 Thousand', display: '20'},
      {value: '30 Thousand', display: '30'},
      {value: '40 Thousand', display: '40'},
      {value: '50 Thousand', display: '50'},
      {value: '60 Thousand', display: '60'},
      {value: '70 Thousand', display: '70'},
      {value: '80 Thousand', display: '80'},
      {value: '90 Thousand', display: '90'},
    ];

    this.spans = ['0', '2-5', '5-8 yrs', '8-10 yrs', '10-15 yrs', '15-20 yrs', '20+ yrs'];
    this.grade = ['1 star', '2 star', '3 star', '4 star', '5 star', 'All'];
    this.dropdownSettingsI = {
      singleSelection: false,
      idField: '_id',
      textField: 'value',
      enableCheckAll: false,

      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettingsF = {
      singleSelection: false,
      idField: '_id',
      textField: 'value',
      enableCheckAll: false,
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettingsUG = {
      singleSelection: false,
      idField: 'value',
      textField: 'value',
      enableCheckAll: false,

      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettingsLocation = {
      singleSelection: false,
      idField: 'value',
      textField: 'value',
      enableCheckAll: false,

      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.PGColleges = ['Any',
      'Department of Management Studies (IIT), Delhi',
      'Faculty of Management Studies (FMS), Delhi',
      'Goa Institute of Management (GIM),Goa',
      'Great Lakes Institute of Management (GLIM), Chennai',
      'Indian Institute of Foreign Trade (IIFT), Delhi',
      'Indian Institute of Management (IIM), Ahmedabad',
      'Indian Institute of Management (IIM), Bangalore',
      'Indian Institute of Management (IIM), Calcutta',
      'Indian Institute of Management (IIM), Indore',
      'Indian Institute of Management (IIM), Kozhikode',
      'Indian Institute of Management (IIM), Lucknow',
      'Indian Institute of Management (IIM),Kashipur',
      'Indian Institute of Management (IIM),Raipur',
      'Indian Institute of Management (IIM),Rohtak',
      'Indian Institute of Management (IIM),Shillong',
      'Indian Institute of Management (IIM),Tiruchirappalli',
      'Indian Institute of Management (IIM),Udaipur',
      'Indian School of Business (ISB), Hyderabad',
      'Institute of Rural Management Anand (IRMA)',
      'Jamnalal Bajaj Institute of Management Studies (JBIMS)',
      'Management Development Institute (MDI), Gurgaon',
      'Narsee Monjee Institute of Management Studies (NMIMS), Mumbai',
      'National Institute of Industrial Engineering (NITIE), Mumbai',
      'SJMSOM IIT Bombay',
      'SP Jain Institute of Management and Research (SPJIMR), Mumbai',
      'Symbiosis Centre for Management and Human Resource Development (SCMHRD), Pune',
      'Symbiosis Institute of Business Management (SIBM), Pune',
      'T.A. Pai Management Institute(TAPMI), Manipal',
      'Tata Institute of Social Sciences (TISS), Mumbai',
      'Vinod Gupta School of Management,IIT Kharagpur',
      'Xavier Institute of Management (XIMB), Bhubaneshwar',
      'Xavier Labour Research Institute (XLRI), Jamshedpur',
    ];
    this.UGColleges = ['Any',
      'Anna University, Guindy campus',
      'Banaras Hindu University (BHU) Varanasi',
      'Birla Institute of Technology (BIT),Mesra,Ranchi',
      'Birla Institute of Technology and Science (BITS), Pilani',
      'Delhi College of Engineering (DCE), Delhi',
      'Dr. B.R. Ambedkar National Institute of Technology (NIT), Jalandhar',
      'Indian Institute of Information Technology (IIIT), Allahabad',
      'Indian Institute of Science (IISc), Bangalore',
      'Indian Institute of Technology (IIT), Delhi',
      'Indian Institute of Technology (IIT), Guwahati',
      'Indian Institute of Technology (IIT), Kanpur',
      'Indian Institute of Technology (IIT), Kharagpur',
      'Indian Institute of Technology (IIT), Madras',
      'Indian Institute of Technology (IIT), Mumbai',
      'Indian Institute of Technology (IIT), Roorkee',
      'Indian School Of Mines (ISM), Dhanbad',
      'Indian Statistical Institute (ISI) Calcutta',
      'International Institute of Information Technology (IIIT), Bangalore',
      'International Institute of Information Technology (IIIT), Hyderabad',
      'International Institute of Information Technology (IIIT), Kolkata',
      'Jadavpur University (JU), Kolkata',
      'Malviya National Institute of Technology (NIT), Jaipur',
      'Manipal Institute of Technology (MIT), Manipal',
      'Maulana Azad National Institute of Technology (NIT), Bhopal',
      'Motilal Nehru National Institute of Technology (NIT), Allahabad',
      'National Institute of Industrial Engineering (NITIE), Mumbai',
      'National Institute of Technology (NIT), Calicut',
      'National Institute of Technology (NIT), Durgapur',
      'National Institute of Technology (NIT), Hamirpur',
      'National Institute of Technology (NIT), Jamshedpur',
      'National Institute of Technology (NIT), Kurukshetra',
      'National Institute of Technology (NIT), Raipur',
      'National Institute of Technology (NIT), Rourkela',
      'National Institute of Technology (NIT), Silchar',
      'National Institute of Technology (NIT), Surathkal',
      'National Institute of Technology (NIT), Tiruchirappalli',
      'National Institute of Technology (NIT), Warangal',
      'Netaji Subhas Institute of Technology (NSIT), Delhi',
      'Punjab Engineering College (PEC), Chandigarh',
      'Sardar Vallabhbhai National Institute of Technology (NIT), Surat',
      'Thapar Institute of Engineering and Technology (TIET), Patiala',
      'University of Petroleum and Energy Studies (UPES), Dehradun',
      'Veermata Jijabai Technological Institute (VJTI), Mumbai',
      'Vellore Institute of Technology (VIT), Vellore',
      'Visvesvaraya National Institute of Technology (NIT), Nagpur',

    ];
    this.UGCources = [
      {value: 'Any'},
      {value: 'Any Engineering'},
      {value: 'Any Engineering (From Top Ranked Colleges)'},
      {value: 'Any Management'},
      {value: 'Any Computers(Degree/Diploma)'},
      {value: 'Any Hotel-Management'},
      {value: 'Any Diploma Holders'},
      {value: 'Any Medical'},
      {value: 'Bachelor of Arts (B.A)'},
      {value: 'Bachelor of Architecture (B.Arch.)'},
      {value: 'Bachelor of Computer Applications (B.C.A.)'},
      {value: 'Bachelor of Business Administration (B.B.A.)'},
      {value: 'Bachelor of Commerce (B.Com.)'},
      {value: 'Bachelor of Education (B.Ed.)'},
      {value: 'Bachelor of Dental Science (B.D.S.)'},
      {value: 'Bachelor of Hotel Management (B.H.M.)'},
      {value: 'Bachelor of Pharmacy (B.Pharma.)'},
      {value: 'Bachelor of Science (B.Sc.)'},
      {value: 'B.Tech/B.E.'},
      {value: 'B.Tech/B.E (From Top Ranked Colleges)'},
      {value: 'LLB'},
      {value: 'MBBS'},
      {value: 'Diploma'},
      {value: 'Bachelor of Veterinary Science (B.V.Sc.)'},
      {value: 'Fashion/Designing'},
      {value: 'Journalism/Mass Communication'},
      {value: 'PR/Advertising'},
      {value: 'Tourism'},
      {value: 'Vocational-Training'},
      {value: 'Others'},
      {value: 'Not Pursuing Graduation'},

    ];
    this.PGCources = [
      'None',
      'Any',
      'Any Computers Degree/Diploma',
      'Any Engineering',
      ' Any Engineering (From Top Ranked Colleges)',
      ' Any Management',
      'Any Management (From Top Ranked Colleges)',
      ' Chartered Accountant (C.A.)',
      'Company Secretary (C.S.)',
      ' ICWA',
      'Integrated PG Course',
      'Journalism/Mass Comunication',
      ' Master of Law (L.L.M.)',
      '  Master of Arts (M.A.)',
      'Master of Architecture (M.Arch.)',
      ' Master of Commerce (M.Com.)',
      'Master of Education (M.Ed.)',
      'Master of Pharmacy (M.Pharma.)',
      ' Master of Science (M.Sc.)',
      'Master of Technology (M.Tech.)',
      ' M.Tech (From Top Ranked Colleges)',
      'MBA/PGDM',
      'MBA/PGDM (From Top Ranked Colleges)',
      'Master of Computer Applications (M.C.A.)',
      'Medical (M.S. / M.D.)',
      'Master of Veterinary Science (M.V.Sc.)',
      'PG Diploma',
      'PR/Advertising',
      'Tourism',
      'Other',
    ];
    this.locations = [
      {value: 'Any'},
      {value: 'Anywhere in India'},
      {value: 'Anywhere in Northern India'},
      {value: 'Anywhere in South India'},
      {value: 'Anywhere in West India'},
      {value: 'Anywhere in East India'},
      {value: 'Any International Location'},
      {value: 'Top Metropolitan Cities'},
      {value: 'Ahmedabad'},
      {value: 'Bengaluru/Bangalore'},
      {value: 'Kolkata'},
      {value: 'Chennai'},
      {value: 'Delhi/NCR'},
      {value: 'Hyderabad'},
      {value: 'Mumbai (All Areas)'},
      {value: 'Pune'},
      {value: 'Chandigarh'},
      {value: 'Dadra & Nagar Haveli - Silvassa'},
      {value: 'Daman & Diu'},
      {value: 'Pondicherry'},
      {value: 'Andhra Pradesh'},
      {value: 'Anantapur'},
      {value: 'Chitoor'},
      {value: 'Eluru'},
      {value: 'Gannavaram'},
      {value: 'Guntakal'},
      {value: 'Guntur'},
      {value: 'Kadapa/Cuddapah'},
      {value: 'Kakinada'},
      {value: 'Kurnool'},
      {value: 'Machilipatnam'},
      {value: 'Nandyal'},
      {value: 'Nellore'},
      {value: 'Ongole'},
      {value: 'Rajahmundry'},
      {value: 'Tada'},
      {value: 'Tirupati'},
      {value: 'Vijayawada'},
      {value: 'Visakhapatnam'},
      {value: 'Vizianagaram'},
      {value: 'Andhra Pradesh - Other'},
      {value: 'Arunachal Pradesh'},
      {value: 'Itanagar'},
      {value: 'Arunachal Pradesh - Other'},
      {value: 'Assam'},
      {value: 'Guwahati'},
      {value: 'Silchar'},
      {value: 'Assam - Other'},
      {value: 'Bihar'},
      {value: 'Bhagalpur'},
      {value: 'Patna'},
      {value: 'Bihar - Other'},
      {value: 'Chhattisgarh'},
      {value: 'Bhillai'},
      {value: 'Bilaspur'},
      {value: 'Raipur'},
      {value: 'Chhattisgarh - Other'},
      {value: 'Delhi'},
      {value: 'Goa'},
      {value: 'Panjim'},
      {value: 'Vasco Da Gama'},
      {value: 'Goa - Other'},
      {value: 'Gujarat'},
      {value: 'Ahmedabad'},
      {value: 'Anand'},
      {value: 'Ankleshwar'},
      {value: 'Baroda'},
      {value: 'Bharuch'},
      {value: 'Bhavnagar'},
      {value: 'Bhuj'},
      {value: 'Gir'},
      {value: 'Gandhinagar'},
      {value: 'Jamnagar'},
      {value: 'Kandla'},
      {value: 'Porbandar'},
      {value: 'Rajkot'},
      {value: 'Surat'},
      {value: 'Valsad'},
      {value: 'Vapi'},
      {value: 'Gujarat - Other'},
      {value: 'Haryana'},
      {value: 'Faridabad'},
      {value: 'Gurgaon'},
      {value: 'Hisar'},
      {value: 'Karnal'},
      {value: 'Kurukshetra'},
      {value: 'Panipat'},
      {value: 'Rohtak'},
      {value: 'Haryana - Other'},
      {value: 'Himachal Pradesh'},
      {value: 'Dalhousie'},
      {value: 'Dharmasala'},
      {value: 'Kulu/Manali'},
      {value: 'Shimla'},
      {value: 'Himachal Pradesh - Other'},
      {value: 'Jammu & Kashmir'},
      {value: 'Jammu'},
      {value: 'Srinagar'},
      {value: 'Jammu and Kashmir - Other'},
      {value: 'Jharkhand'},
      {value: 'Bokaro'},
      {value: 'Dhanbad'},
      {value: 'Jamshedpur'},
      {value: 'Ranchi'},
      {value: 'Jharkhand - Other'},
      {value: 'Karnataka'},
      {value: 'Bengaluru/Bangalore'},
      {value: 'Belgaum'},
      {value: 'Bellary'},
      {value: 'Bidar'},
      {value: 'Dharwad'},
      {value: 'Gulbarga'},
      {value: 'Hubli'},
      {value: 'Kolar'},
      {value: 'Mangalore'},
      {value: 'Mysore'},
      {value: 'Karnataka - Other'},
      {value: 'Kerala'},
      {value: 'Kozhikode / Calicut'},
      {value: 'Ernakulam / Kochi / Cochin'},
      {value: 'Kannur'},
      {value: 'Kollam'},
      {value: 'Kottayam'},
      {value: 'Palakkad / Palghat'},
      {value: 'Thrissur'},
      {value: 'Trivandrum'},
      {value: 'Kerala - Other'},
      {value: 'Madhya Pradesh'},
      {value: 'Bhopal'},
      {value: 'Gwalior'},
      {value: 'Indore'},
      {value: 'Jabalpur'},
      {value: 'Ujjain'},
      {value: 'Madhya Pradesh - Other'},
      {value: 'Maharashtra'},
      {value: 'Ahmednagar'},
      {value: 'Aurangabad'},
      {value: 'Jalgaon'},
      {value: 'Kolhapur'},
      {value: 'Mumbai'},
      {value: 'Mumbai Suburbs'},
      {value: 'Nagpur'},
      {value: 'Nasik'},
      {value: 'Navi Mumbai'},
      {value: 'Pune'},
      {value: 'Solapur'},
      {value: 'Maharashtra - Other'},
      {value: 'Manipur'},
      {value: 'Imphal'},
      {value: 'Manipur - Other'},
      {value: 'Meghalaya'},
      {value: 'Shillong'},
      {value: 'Meghalaya - Other'},
      {value: 'Mizoram'},
      {value: 'Aizawal'},
      {value: 'Mizoram - Other'},
      {value: 'Nagaland'},
      {value: 'Dimapur'},
      {value: 'Nagaland - Other'},
      {value: 'Orissa'},
      {value: 'Bhubaneshwar'},
      {value: 'Cuttack'},
      {value: 'Paradeep'},
      {value: 'Puri'},
      {value: 'Rourkela'},
      {value: 'Orissa - Other'},
      {value: 'Punjab'},
      {value: 'Amritsar'},
      {value: 'Bathinda'},
      {value: 'Jalandhar'},
      {value: 'Ludhiana'},
      {value: 'Mohali'},
      {value: 'Pathankot'},
      {value: 'Patiala'},
      {value: 'Punjab - Other'},
      {value: 'Rajasthan'},
      {value: 'Ajmer'},
      {value: 'Jaipur'},
      {value: 'Jaisalmer'},
      {value: 'Jodhpur'},
      {value: 'Kota'},
      {value: 'Udaipur'},
      {value: 'Rajasthan - Other'},
      {value: 'Sikkim'},
      {value: 'Gangtok'},
      {value: 'Sikkim - Other'},
      {value: 'Tamil Nadu'},
      {value: 'Hosur'},
      {value: 'Nagercoil'},
      {value: 'Chennai'},
      {value: 'Coimbatore'},
      {value: 'Cuddalore'},
      {value: 'Erode'},
      {value: 'Madurai'},
      {value: 'Ooty'},
      {value: 'Salem'},
      {value: 'Thanjavur'},
      {value: 'Tirunelveli'},
      {value: 'Trichy'},
      {value: 'Tuticorin'},
      {value: 'Vellore'},
      {value: 'Tamil Nadu - Other'},
      {value: 'Telangana'},
      {value: 'Adilabad'},
      {value: 'Bhadrachalam'},
      {value: 'Godavarikhani'},
      {value: 'Hanumakonda'},
      {value: 'Hyderabad / Secunderabad'},
      {value: 'Karimnagar'},
      {value: 'Khammam'},
      {value: 'Kodad'},
      {value: 'Kothagudem'},
      {value: 'Mahaboobnagar/Mahabubnagar'},
      {value: 'Mancherial'},
      {value: 'Medak'},
      {value: 'Nalgonda'},
      {value: 'Nizamabad'},
      {value: 'Rangareddy'},
      {value: 'Razole'},
      {value: 'Sangareddy'},
      {value: 'Siddipet'},
      {value: 'Suryapet'},
      {value: 'Tuni'},
      {value: 'Warangal'},
      {value: 'Telangana - Other'},
      {value: 'Tripura'},
      {value: 'Agartala'},
      {value: 'Tripura - Other'},
      {value: 'Uttar Pradesh'},
      {value: 'Agra'},
      {value: 'Aligarh'},
      {value: 'Allahabad'},
      {value: 'Bareilly'},
      {value: 'Faizabad'},
      {value: 'Ghaziabad'},
      {value: 'Gorakhpu'},
      {value: 'Kanpur'},
      {value: 'Lucknow'},
      {value: 'Mathura'},
      {value: 'Meerut'},
      {value: 'Noida'},
      {value: 'Varanasi'},
      {value: 'Moradabad'},
      {value: 'Uttar Pradesh - Other'},
      {value: 'Uttaranchal'},
      {value: 'Dehradun'},
      {value: 'Roorkee'},
      {value: 'Uttaranchal - Other'},
      {value: 'West Bengal'},
      {value: 'Asansol'},
      {value: 'Durgapur'},
      {value: 'Haldia'},
      {value: 'Kharagpur'},
      {value: 'Kolkata'},
      {value: 'Siliguri'},
      {value: 'West Bengal - Other'},
      {value: 'India'},
      {value: 'Australia'},
      {value: 'Austria'},
      {value: 'Bahrain'},
      {value: 'Canada'},
      {value: 'China'},
      {value: 'Doha'},
      {value: 'Dubai/ UAE'},
      {value: 'France'},
      {value: 'Germany'},
      {value: 'Greece'},
      {value: 'Hong Kong'},
      {value: 'Iceland'},
      {value: 'Indonesia'},
      {value: 'Ireland'},
      {value: 'Japan'},
      {value: 'Kenya'},
      {value: 'Kuwait'},
      {value: 'Malaysia'},
      {value: 'Nepal'},
      {value: 'New Zealand'},
      {value: 'Nigeria'},
      {value: 'Oman'},
      {value: 'Poland'},
      {value: 'Qatar'},
      {value: 'Quilon'},
      {value: 'Saudi Arabia'},
      {value: 'Singapore'},
      {value: 'South Korea'},
      {value: 'Sri Lanka'},
      {value: 'Sweden'},
      {value: 'Thailand'},
      {value: 'United Kingdom (UK)'},
      {value: 'United States (US)'},
      {value: 'Yemen'},
      {value: 'Other - International Locations'}
    ];

    this.qualifications = ['graduate', 'post-graduate'];
    this.currencies = ['US Dollar', 'Indian rupee', 'AED'];
    this.periods = ['1 week', '15 days', '30 days', '60 days'];
    this.getDataList();
  }

  getIndustries() {
    this.postjobService.getSuggestedIndustries()
      .subscribe(
        res => {
          this.industries = res.result;
          console.log(res);
          return res;
        },
        err => {
          console.log('Error occured');
          return err;
        }
      );
  }

  getFunctionalArea() {
    this.appService.getSuggestedFunctionalAreas()
      .subscribe(
        res => {
          this.functionalArea = res.result;
          console.log(res);
          return res;
        },
        err => {
          console.log('Error occured');
          return err;
        }
      );
  }

  onModuleSelect(evnt) {
    console.log(evnt);
  }

  getDataList() {
    this.appService.getSkillsList().subscribe((data) => {
      this.items = data.result;
      console.log(data);
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].display = this.items[i]['_id'];
        this.items[i].value = this.items[i]['item_id'];
        delete this.items[i]._id;
        delete this.items[i].item_id;
      }
      console.log(this.items);
    });

  }

  getUser(): any {
    var user = localStorage.getItem('loginSessId');
    if (user) {
      user = JSON.parse(user);
    }
    this.user = user;
  }


  nextPage(a) {
    this.activeTab = a;
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
    this.step4 = false;
  }

  nextPage2(a) {
    console.log('step2');
    this.activeTab = a;
    this.step1 = false;
    this.step2 = true;
    this.step3 = false;
    this.step4 = false;
  }

  nextPage3(a) {
    this.activeTab = a;

    this.step1 = false;
    this.step2 = false;
    this.step3 = true;
    this.step4 = false;
  }

  nextPage4(a) {

    this.activeTab = a;
    this.step1 = false;
    this.step2 = false;
    this.step3 = false;
    this.step4 = true;
  }

  onOptionsSelected(event) {
    console.log(event);
  }

  onItemAdded(evt) {
    this.skills.push(evt.display);
  }

  onItemRemoved(evt) {
    console.log(evt);
    var index = this.skills.indexOf(evt.display);
    if (index > -1) {
      this.skills.splice(index, 1);
    }
    console.log(this.skills);
  }

  setCommission(evt) {
    console.log(evt);
    this.commission = evt.value;

  }

  showUploadedJD() {
    //console.log(cv);
    window.open(this.showJD, '_blank');
  }

  addprop1(evt) {
    // this.control1 = this.postNewJobForm1.controls;
    this.postNewJobForm1.patchValue({
      All: true
    });
    console.log(this.control1.All.value);
    if (!this.control1.All.value) {
      this.postNewJobForm1.patchValue({
        fun: [],
        indus: []
      });
      this.selectFunctional = [];
      this.selectFunctionalEnd = [];
      this.selectIndustry = [];
      this.selectIndustryEnd = [];
    }
  }

  handleFileSelect(evt) {
    console.log(evt);
    this.fileError = false;
    console.log(evt);
    this.fileArray.push(evt.target.files[0].name);
    this.fileName = evt.target.files[0].name;
    let ext = this.fileName.substr(this.fileName.lastIndexOf('.') + 1);
    if (ext === 'pdf') {
      let files = evt.target.files;
      let file = files[0];
      this.typeImage = files[0].type;
      if (files && file) {
        let reader = new FileReader();
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
      this.toastr.success('uploaded JD successfully');
      this.doc = this.base64textString;
      console.log(this.doc);
      this.showJDFile = true;
      // this.showJD = this._sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+ this.base64textString);
      this.showJD = this._sanitizer.bypassSecurityTrustUrl('data:base64,' + this.base64textString);

    }
  }

  handleFileSelect1(evt) {
    console.log(evt);
    this.CVfileError = false;
    console.log(evt);
    this.CVfileArray.push(evt.target.files[0].name);
    this.CVfileName = evt.target.files[0].name;
    let ext = this.CVfileName.substr(this.CVfileName.lastIndexOf('.') + 1);
    if (ext === 'pdf') {
      let files = evt.target.files;
      let file = files[0];
      this.CVtypeImage = files[0].type;
      if (files && file) {
        let reader = new FileReader();
        reader.onload = this._handleReaderLoaded1.bind(this);
        reader.readAsBinaryString(file);
      }
    } else {
      this.fileError1 = false;
      this.toastr.warning('Invalid File Type! Only pdf allowed');
    }
  }

  _handleReaderLoaded1(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString1 = btoa(binaryString);
    if (this.base64textString1) {
      this.toastr.success('uploaded CV successfully');
      this.sampleCV = this.base64textString1;
      console.log(this.sampleCV);
      this.showCV = true;
      // this.showJD = this._sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+ this.base64textString);
      this.showJD = this._sanitizer.bypassSecurityTrustUrl('data:base64,' + this.base64textString1);

    }
  }

  removeJD() {
    this.doc = '';
    this.showJDFile = false;
    this.toastr.warning('JD removed');
  }

  removeCV() {
    this.sampleCV = '';
    this.showCV = false;
    this.toastr.warning('CV removed');
  }

  nextStep2(tab) {
    this.submitted = true;
    console.log(tab);
    console.log(this.postNewJobForm1.controls);
    if (this.postNewJobForm1.valid) {
      this.control1 = this.postNewJobForm1.controls;
      this.activeTab = tab;
      this.step1 = false;
      this.step2 = true;
      this.step3 = false;
      this.step4 = false;
    }
  }

  nextStep3(tab) {
    this.submitted2 = true;
    console.log(this.postNewJobForm2.controls);
    console.log(tab);
    if (this.postNewJobForm2.valid) {
      this.control2 = this.postNewJobForm2.controls;
      this.activeTab = tab;
      this.step1 = false;
      this.step2 = false;
      this.step3 = true;
      this.step4 = false;
    }
  }

  nextStep4(tab) {
    this.submitted3 = true;
    console.log(this.postNewJobForm3.controls);
    console.log(tab);
    if (this.postNewJobForm3.valid) {
      this.control3 = this.postNewJobForm3.controls;
      this.activeTab = tab;
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = true;
    }
  }
  companyEmail:any;CompanyId:any;
getCompanyDetails(){
  let id =localStorage.getItem('loginSessId')
  this.appService.recruiterProfile(JSON.parse(id)).subscribe(objS=>{
    var resp = objS.json();
    let CompanyUser:any=resp.result;
    console.log(CompanyUser,"user")
    this.companyEmail = CompanyUser.email_id 
    this.CompanyId =  CompanyUser._id

  })
}
  postNewJob() {
    console.log(this.postNewJobForm4.controls);

    this.submitted4 = true;
    //local storage loginSessId )  company_email   company_id
    if (this.postNewJobForm1.valid && this.postNewJobForm2.valid && this.postNewJobForm3.valid && this.postNewJobForm4.valid) {
      this.control4 = this.postNewJobForm4.controls;
      var userDetail = {
        'ctc_min': this.control3.minLac.value + '.' + this.control3.minTh.value,
        'ctc_max': this.control3.maxLac.value + '.' + this.control3.maxTh.value,
        'user_id': this.user,
        'job_title': this.control1.jobTitle.value,
        'industry': this.selectIndustryEnd,
        'functional_area': this.selectFunctionalEnd,
        'skills': this.skills,
        'company_email':this.companyEmail,
        'company_id':this.CompanyId,
        'vacancy': this.control1.vacancy.value,
        'Location': this.locationSelected,
        'ug_course': this.UGCoursesSelected,
        'ug_college': this.control2.UGC.value,
        'pg_course': this.control2.PG.value,
        'pg_college': this.control2.PGC.value,
        'experience': this.control2.experiancemin.value + ' - ' + this.control2.experiancemax.value,
        'description': this.control4.companyDescription.value,
        'ctc': this.control3.ctcType.value,
        'company_name': this.control4.companyName.value,
        // "commission":this.commission,
        'deadline': this.control4.deadline.value,
        'notice_period': this.control4.noticePeriod.value,
        //"contact_period":this.control4.contactPeriod.value,
        'doc': this.doc,
        'sampleCV': this.sampleCV
      };
      this.postjobService.postJob(userDetail)
        .subscribe(
          res => {
            console.log(res);
            this.toastr.success('job has been proposed');
            this.submitted4 = false;
            this.initForms();
            this.router.navigate(['/clientHeader/manageJobs']);
            return res;
          },
          err => {
            this.toastr.warning('Error occured');
            return err;
          }
        );
      console.log(userDetail);
    }
  }

  saveDraft() {
    this.control1 = this.postNewJobForm1.controls;
    this.control2 = this.postNewJobForm2.controls;
    this.control3 = this.postNewJobForm3.controls;
    this.control4 = this.postNewJobForm4.controls;
    console.log('deqwde', this.locationSelected);
    if (this.control1.jobTitle.status != 'INVALID') {
      let userDetail = {
        'ctc_min': this.control3.minLac.value + '.' + this.control3.minTh.value,
        'ctc_max': this.control3.maxLac.value + '.' + this.control3.maxTh.value,
        'user_id': this.user,
        'job_title': this.control1.jobTitle.value,
        'industry': this.selectIndustryEnd,
        'functional_area': this.selectFunctionalEnd,
        'skills': this.skills,
        'vacancy': this.control1.vacancy.value,
        'Location': this.locationSelected,
        'ug_course': this.UGCoursesSelected,
        'ug_college': this.control2.UGC.value,
        'pg_course': this.control2.PG.value,
        'pg_college': this.control2.PGC.value,
        'experience': this.control2.experiancemin.value + ' - ' + this.control2.experiancemax.value,
        'description': this.control4.companyDescription.value,
        'ctc': this.control3.ctcType.value,
        'company_name': this.control4.companyName.value,
        'company_email':this.companyEmail,
        'company_id':this.CompanyId,
        // "commission":this.commission,
        'deadline': this.control4.deadline.value,
        'notice_period': this.control4.noticePeriod.value,
        //"contact_period":this.control4.contactPeriod.value,
        'doc': this.doc,
        'sampleCV': this.sampleCV
      };
      console.log(this.control1);
      this.appService.saveDraft(userDetail).subscribe((data) => {
        console.log(data);
        this.toastr.success('Job saved successfully ');
        //this.submitted4 = false;
        this.initForms();
        this.router.navigate(['/clientHeader/manageJobs']);
      }, (err) => {
        console.log(err);
      });
    } else {
      this.toastr.warning('Fill some fields first');
    }
  }

  initForms() {
    this.postNewJobForm1 = new FormGroup({
      jobTitle: new FormControl('', [
        Validators.required
      ]),
      indus: new FormControl(''),
      fun: new FormControl(''),
      gender: new FormControl(''),
      skills: new FormControl(''),
      vacancy: new FormControl('', [
        Validators.required
      ]),
      All: new FormControl(false),
      location: new FormControl('', [
        Validators.required
      ])
    });

    this.postNewJobForm2 = new FormGroup({
      UG: new FormControl(''),
      UGC: new FormControl(''),
      PG: new FormControl(''),
      PGC: new FormControl(''),
      experiancemin: new FormControl('', [
        Validators.required
      ]),
      experiancemax: new FormControl('', [
        Validators.required
      ])
    });

    this.postNewJobForm3 = new FormGroup({
      ctcType: new FormControl('', [
        Validators.required
      ]),
      minLac: new FormControl('', [
        Validators.required
      ]),
      minTh: new FormControl('', [
        Validators.required
      ]),
      maxLac: new FormControl('', [
        Validators.required
      ]),
      maxTh: new FormControl('', [
        Validators.required
      ])
      // perks: new FormControl('', [
      //  Validators.required
      // ])
    });

    this.postNewJobForm4 = new FormGroup({
      deadline: new FormControl('', [
        Validators.required
      ]),
      companyName: new FormControl('', [
        Validators.required
      ]),
      company_email: new FormControl('', [
        Validators.required
      ]),  
       company_id: new FormControl('', [
        Validators.required
      ]),
      companyDescription: new FormControl('', [
        Validators.required
      ]),
      noticePeriod: new FormControl('', [
        Validators.required
      ])
      // contactPeriod: new FormControl('', [
      //   Validators.required
      // ])
    });

  }

//----------------------------functional Area ----------------------------

  onItemSelect(item: any) {
    if (this.selectFunctional.length === 0) {
      this.postNewJobForm1.patchValue({
        All: false
      });
    }
    this.selectFunctional.push(item);
    this.selectFunctionalEnd.push(item._id);
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

//----------------------------UGCourse --------------------------------


  onItemSelectUG(item: any) {
    console.log(item);
    this.UGCoursesSelected.push(item);
    console.log(this.UGCoursesSelected);
  }

  OnItemDeSelectUG(item: any) {
    console.log(item);
    for (let i = 0; i < this.UGCoursesSelected.length; i++) {
      if (this.UGCoursesSelected[i] === item) {
        this.UGCoursesSelected.splice(i, 1);
      }
    }
    console.log(this.UGCoursesSelected);
  }

  onSelectAllUG(items: any) {
    for (let i = 0; i < items.length; i++) {
      this.UGCoursesSelected.push(items);
    }
    console.log(this.UGCoursesSelected);
  }

  onDeSelectAllUG(items: any) {
    this.UGCoursesSelected = [];
    console.log(this.UGCoursesSelected);
  }

//----------------------------Location--------------------------------

  onItemSelectL(item: any) {
    this.locationSelected.push(item);
  }

  OnItemDeSelectL(item: any) {
    console.log(item);
    for (let i = 0; i < this.locationSelected.length; i++) {
      if (this.locationSelected[i] === item) {
        this.locationSelected.splice(i, 1);
      }
    }
    console.log(this.locationSelected);
  }

  onSelectAllL(items: any) {
    for (let i = 0; i < items.length; i++) {
      this.locationSelected.push(items);
    }
    console.log(this.locationSelected);
  }

  onDeSelectAllL(items: any) {
    this.locationSelected = [];
    console.log(this.locationSelected);
  }


//----------------------------Industries --------------------------------


  onItemSelectI(item: any) {
    if (this.selectIndustry.length === 0) {
      this.postNewJobForm1.patchValue({
        All: false
      });
    }
    this.selectIndustry.push(item);
    this.selectIndustryEnd.push(item._id);
    console.log(this.selectIndustry);
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
  }

  onDeSelectAllI(items: any) {
    this.selectIndustry = [];
    this.selectIndustryEnd = [];
    console.log(this.selectIndustry);
  }

}
