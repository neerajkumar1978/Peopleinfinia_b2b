import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.component.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-resdeck',
  templateUrl: './resdeck.component.html',
  styleUrls: ['./resdeck.component.css']
})
export class ResdeckComponent implements OnInit {
	allCV;
  allCVS;
  userName="";
  location="";
  companyName= "";
  showPagination = false;
  jobTitle = "";
  status = "";
  page = 1;
  constructor(
  	private appService:AppService,
  	private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService ) {
     }

  ngOnInit() {
  	this.getrestDesk()
  }
  setCV(cv){
  console.log(cv);
      window.open(cv, "_blank");
  }
  getrestDesk(){
  	this.appService.resDeskAdmin().subscribe((data)=>{
  		console.log(data);
  		this.allCV = JSON.parse(data['_body']);
      this.allCVS = this.allCV.result;
      if(this.allCVS.length > 12){
        this.showPagination =true;
      }
  	})
  }
}
