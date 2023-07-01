import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.component.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './admin-manage-jobs.component.html',
  styleUrls: ['./admin-manage-jobs.component.css']
})
export class AdminManageJobsComponent implements OnInit {
  response;
  userName = ''; 
  companyName = "";
  jobDeadline= '';
  page =1;
  jobStat = '';
  ShowPagination= false;
  alljobs;
  constructor( 
  	private appService:AppService,
  	private toastr: ToastrService) {
  	   }

  ngOnInit() {
  	this.getJobs();
  }
  getJobs(){
  	this.appService.manageJobsAdminpanel().subscribe((data)=>{
  		console.log(data);
      this.response = JSON.parse(data['_body'])
      
      this.alljobs = this.response.result ;
      console.log(this.alljobs);
      if(this.alljobs.length >10){
        this.alljobs;
      }
  	},(err)=>{
  		console.log(err);
  	})
  }
  showJD(doc){
    if(doc === "" || doc === null){
      this.toastr.warning("Not uploaded!")
    }else{
      window.open(doc, "_blank");

    }
  } 
}
