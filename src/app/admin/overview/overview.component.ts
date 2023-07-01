import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.component.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ToastrService } from 'ngx-toastr';
import { PostjobService } from '../../post-new-job/postjob.service'

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  totolEmployer  = 0;
  issues= [];
  pendingIssues= [];
  resolvedIssues= [];
  showingArray =[];
  closedIssues= [];
  newIssues =[];
  reverse: boolean = false;
  key: string = 'created_at';
  ShowPagination = false ;
  ShowPagination1 = false ;
  ShowPagination2 = false ;
  ShowPagination3 = false ;
  data;
  users;
  totalConsultant = 0;
  pendingUser =[];
  count;
  totalCount = 0
  doughnutChartColors = [{ // grey
    backgroundColor: '#30CE25',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  { // dark grey
    backgroundColor: 'rgba(77,83,96,0.2)',
    borderColor: 'rgba(77,83,96,1)',
    pointBackgroundColor: 'rgba(77,83,96,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }]
  barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels:string[] = ['2015', '2016','2017','2018','2019'];
  barChartType:string = 'bar';
  barChartLegend:boolean = true;

  barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Jobs'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Resumes'}
  ];
  barChartLabels2:string[] = ['2015', '2016','2017','2018','2019'];

  barChartData2:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Clients'},
  ];
  doughnutChartLabels:string[] = ['Employe', 'Clients'];
  doughnutChartLabels2:string[] = ['Clients'];
  doughnutChartData:number[] = [];
  doughnutChartType:string = 'doughnut';
  Allissues = [] ;
  allnewJobs  = [];
  single = [
        {
          "name": "jan",
          "value": 89400
        },
        {
          "name": "feb",
          "value": 50000
        },
        {
          "name": "march",
          "value": 72000
        },
        {
          "name": "april",
          "value": 50000
        },
        {
          "name": "may",
          "value": 50000
        }
      ];
      view: any[] = [400 , 300];

        // options
        showXAxis = true;
        showYAxis = true;
        gradient = false;
        showLegend = true;
        showXAxisLabel = true;
        xAxisLabel = 'Months';
        showYAxisLabel = true;
        yAxisLabel = 'Clients';
        dashboardJobs:any=[];

         colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor(
      private appService1:PostjobService,

  	  private appService:AppService,
  	  private toastr: ToastrService ) {
  	   }

  ngOnInit() {
  	this.getJobsList()
    this.getCount()
    this.getDashboardJobs();
    this.getLeads();
    this.getIssues();
  }
  getDashboardJobs(){
    this.appService1.dashboardJob().subscribe(res => {
      debugger
          this.dashboardJobs=res;
          console.log(this.dashboardJobs);
          return res;
        },err => {
          console.log("Error occured");
          return err;
        }
      );
  }
  getCount(){
    this.appService.getDashboardCountAdmin().subscribe((data)=>{
  //      console.log(data);
   //     console.log(JSON.parse(data._body));
        this.count  = JSON.parse(data);
        this.totalConsultant  = this.count.result.TotalClient;
        this.totolEmployer = this.count.result.TotalRecruiter;
        this.totalCount = this.totalConsultant + this.totolEmployer;
        this.doughnutChartData.push(this.totolEmployer);
        this.doughnutChartData.push(this.totalConsultant);
        console.log(this.totalCount);
    },(err)=>{
      console.log(err);
    })
  }
  getJobsList(){
  	this.appService.getAllJobsListAdmin().subscribe((data)=>{
  //console.log(data);
  let resp = data['_body'];
  console.log(JSON.parse(resp));
	},(err)=>{
	console.log(err);
	 })
  }
    onSelect(event) {
    console.log(event);
  }
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  getLeads(){
    this.appService.manageUserAdminpanel().subscribe((Data)=>{
      this.data = JSON.parse(Data);
      if(this.data.responseCode === 200){
      this.users = this.data.result
      console.log(this.users)
      this.setUser(this.users);
      }else{
       this.toastr.warning(this.data.responseMessage);
      }
    },(err) => {
      console.log(err);
    })
  }
  setUser(data){
      console.log(data);
      for(let i = 0 ; i < data.length ; i++){
        console.log(data[i])
      if(data[i].user_type === "1" && data[i].status === "pending"){
        this.pendingUser.push(data[i]);
      }
    }
    console.log(this.pendingUser);
  }
  getIssues(){

      this.appService.getSubmitedIssuesAdmin().subscribe((data)=>{
          let resp = JSON.parse(data['_body']);
        console.log(resp)

        this.setIssueArray(resp);
      },(err)=>{
        console.log(err)
      })

  }
  setIssueArray(data){
    this.issues = data;
    for(let i = 0; i < this.issues.length ; i++){
      this.setArray(this.issues[i]);

      }
    }
    setArray(data){
    let i = data.timeline.length -1;
    // console.log(i,data)

        if(data.timeline[i].status === "created"){
          this.newIssues.push(data);
          if(this.newIssues.length > 5){
            this.ShowPagination = true;
          }
        }
        if(data.timeline[i].status === "reviewed"){

          this.pendingIssues.push(data);
          if(this.pendingIssues.length > 5){
            this.ShowPagination1 = true;
          }
        }
        if(data.timeline[i].status === "resolved"){
          this.resolvedIssues.push(data);
          if(this.resolvedIssues.length > 5){
            this.ShowPagination2 = true;
          }
        }
        this.changeArray('1');
      }
      changeArray(num){
        this.showingArray = [];
        if(num === '1'){this.showingArray = this.pendingIssues}
        if(num === '2'){this.showingArray = this.newIssues}
        if(num === '3'){this.showingArray = this.resolvedIssues}
        console.log(this.showingArray);
      }
}
