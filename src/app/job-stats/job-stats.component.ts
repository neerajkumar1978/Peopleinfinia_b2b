import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.component.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-job-stats',
  templateUrl: './job-stats.component.html',
  styleUrls: ['./job-stats.component.css']
})
export class JobStatsComponent implements OnInit {
	activeMenu = 1;
	userId;
	id;
	Stats;
	StatsCandidates= [];
	shortedListed = [];
	onHold = [];
	Selected = [];
  CV = "";
  StatsJobs;
  job_title ;
  vacancy ;
  deadline;
	interviewed = [];
  constructor(
    private appService:AppService,
  	private route: ActivatedRoute,
    private router: Router,) { 
    	  		this.userId = localStorage.getItem('loginSessId');
}
  
  ngOnInit() {
  	this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params.id;  
          this.getStats(this.id,this.userId)        }
      );

  }

  getStats(id,userId){
  	this.appService.getCandidateJobStats(JSON.parse(userId),id).subscribe((data)=>{
  	console.log(data);
  	this.Stats = data.result;
    this.StatsJobs = data.result[0].job_id[0];
     console.log(this.StatsJobs);
     this.job_title  =  this.StatsJobs.job_title;
     this.vacancy = this.StatsJobs.vacancy;
     this.deadline =  this.StatsJobs.deadline;
  	this.StatsCandidates = data.result[0].candidates;
    console.log(this.StatsCandidates);
  	this.setArray();
  },(err)=>{
  	console.log(err);
  })
  }

  setCV(cv){
      window.open(cv, "_blank");
  }

  
  setArray(){
  	for(let i = 0 ; i < this.StatsCandidates.length ; i++){
  		if(this.StatsCandidates[i].status === "0"){this.shortedListed.push(this.StatsCandidates[i])};
  		if(this.StatsCandidates[i].status === "2"){this.onHold.push(this.StatsCandidates[i])};
  		if(this.StatsCandidates[i].status === "4"){this.Selected.push(this.StatsCandidates[i])};
  		if(this.StatsCandidates[i].status === "1"){this.interviewed.push(this.StatsCandidates[i])};
  	}
  }


}
