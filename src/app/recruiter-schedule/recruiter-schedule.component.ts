import { Component,  OnInit,  ChangeDetectionStrategy,  ViewChild,  TemplateRef,  ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { AppService } from '../app.component.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import {  startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth,addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  CalendarEvent,  CalendarEventAction, CalendarEventTimesChangedEvent,  CalendarView} from 'angular-calendar';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-recruiter-schedule',
  templateUrl: './recruiter-schedule.component.html',
  styleUrls: ['./recruiter-schedule.component.css']
})
export class RecruiterScheduleComponent implements OnInit {
 @ViewChild('Reschedule', {static: true}) public modalR: ModalDirective;
 jobId;
  candidateID;
  conformButton = false;
  userId;
  editMode = false;
  companyNameList =[];
  rescheduleForm:FormGroup;
  selectedCandi;
  customerDetails;
  jobTitle;
  public currentCompany;
  CandiName="";
  eventArray = [] ;
  @ViewChild('modalContent', {static: true})
  modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
      date: Date = new Date();
    settings = {
        bigBanner: true,
        timePicker: false,
        format: 'dd-MM-yyyy',
        defaultOpen: true
    }
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        //this.handleEveventArrayent('Deleted', event);
      }
    }
  ];
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  modes = [{"value":"Skype"},{"value":"Face To Face"}]
  userDetailsForm : FormGroup;
  submitted = false;
  activeDayIsOpen: boolean = true;
  constructor(private modal: NgbModal,
    private route: ActivatedRoute,
    private appService:AppService,
    private router: Router,
    private toastr: ToastrService)
    // private toastr: ToastsManager,
    // private _vcr: ViewContainerRef) {
    // this.toastr.setRootViewContainerRef(_vcr);
    {
      this.userId = localStorage.getItem('loginSessId');
}

  ngOnInit() {
    this.initForm();
      this.route.params
      .subscribe(
        (params: Params) => {
          this.jobId = params.jobId;
          this.candidateID = params.id;
          this.editMode = params.id != null;
        //  console.log(this.jobId,this.candidateID)
        //  this.getEventsUser(this.userId);
        });
      // setTimeout(()=>{
      //         this.getEventsUser(this.companyNameList[0].job_id._id,this.userId)

      //       }, 500)
      this.getCompanyList();
        //  this.initForm();
       //   this.getDetails();
  }
dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
   console.log(action, event)
   this.selectedCandi = this.eventArray.find(myObj => myObj.interview_date === event.start);
   console.log(this.selectedCandi);
    this.CandiName = event.title ;
    this.jobTitle = event.start;
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
  getEventsUser(companyId,id){
    this.currentCompany = companyId;
    this.events = []
    this.appService.getCompanyEvent(JSON.parse(id),companyId).subscribe((data)=>{
      if(data.responseCode === 200){
        this.eventArray = data.result;
               setTimeout(() => {
                      this.postEventsOnCalender();
                  }, 500);
              this.toastr.success("Success", 'Check all scheduled Interview.');
               console.log(data) ;
      }else{
        this.toastr.warning('No interview scheduled yet')
      }

    },(error)=>{
      console.log(error);
    })
  }
  AddEventInCalander(col,i){
    this.events.push({
      title: " Candidate "+this.eventArray[i].candidate_name+"'s Interview scheduled For "+this.eventArray[i].job_id.job_title + " Job ",
      start: this.eventArray[i].interview_date,
      end: addHours(this.eventArray[i].interview_date, 1),
      color:col,
      draggable: false,
      resizable: {
        beforeStart: false,
        afterEnd: false
      }
    });
  }
postEventsOnCalender(){
  console.log(this.eventArray)
   for(let i = 0 ; i < this.eventArray.length ; i++){
    console.log(i);
    this.AddEventInCalander
    if(!this.eventArray[i].status){
      console.log('waha')
      let blue = colors.blue;
      this.conformButton = true;
      this.AddEventInCalander(blue,i)
    }else{
      let red = colors.red;
      this.conformButton = false;
      this.AddEventInCalander(red,i)
    }
    this.refresh.next();
    console.log(this.events);
   }
   this.refresh.next();

  }
getCompanyList(){

	this.appService.getRecruiterCompanyList(JSON.parse(this.userId)).subscribe((data)=>{
		this.companyNameList = data.result;
				console.log(data);
        if(data.responseCode !== 204){
          console.log(this.companyNameList[0].job_id._id, this.userId);
          this.getEventsUser(this.companyNameList[0].job_id._id, this.userId );
          console.log(data);
        }else{
          this.toastr.warning("No interview scheduled")
        }

	},(error) => {
		console.log(error);
	})
	}
conformInterview(){
  this.appService.updateInterviewConfirmation(this.selectedCandi._id).subscribe((data)=>{
    console.log(data);

    this.getEventsUser(this.currentCompany,this.userId);
  },(err)=>{
    console.log(err);
  })
}
initForm(){
   this.rescheduleForm = new FormGroup({
    reason: new FormControl('',[Validators.required]),
    periodStart: new FormControl('',[Validators.required]),
    periodEnd : new FormControl('',[Validators.required])
   })
      }
  rescheduleInterview(){
    this.submitted = true;
    let control = this.rescheduleForm.controls;
    console.log(control)
    let form = {
      "reschedule": 1,
     "reschedule_reason": control.reason.value,
     "reschedule_recruiter_dates": [control.periodStart.value, control.periodEnd.value]
      }
      this.appService.resheduleRecruiterRequest(this.selectedCandi._id,form).subscribe((data)=>{
        console.log(data);
        this.modalR.hide();
        this.toastr.success("Reschedule request has been sent");
      },(err)=>{
        console.log(err);
      })
    }
}

