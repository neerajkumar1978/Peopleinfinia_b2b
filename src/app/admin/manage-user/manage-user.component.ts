import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.component.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  users;
  data;
  recruiter = "1";
  company = "0";
  recruiterArray=[];
  isCompany = true;
  companyArray = [];
  showingArray =[];
  ShowPagination = false ;
  ShowPagination2 = false ;
  userName = '';
  page =1 ;
  page2 =1;
  userId = '';
  constructor(
  	  private appService:AppService,
  	  private toastr: ToastrService,
      private router: Router,
       ) { 
  }

  ngOnInit() {
  	this.getUsers();
  }   
  getUsers(){
  	this.appService.manageUserAdminpanel().subscribe((Data)=>{
  		this.data = JSON.parse(Data._body);
      if(this.data.responseCode === 200){
      this.users = this.data.result
      // console.log("users",this.users,this.company)
      this.setArrayType(this.company);
      }else{
       this.toastr.warning(this.data.responseMessage);   
      }
  	},(err) =>{
  		console.log(err)
  	})
  }
  setArrayType(type){
    if(type === "1"){
      this.isCompany = false;
      this.setShowingArray(this.recruiter)
      
    }else if (type === "0"){
      this.isCompany = true;
      this.setShowingArray(this.company)
    }
  }
  ordtmp = true; pno: any;
  funorder() {
    this.ordtmp = !this.ordtmp
  }
  setShowingArray(type){
    this.userName ='';
    this.userId = '';
    this.showingArray = [];
    for(let i = 0 ; i < this.users.length ; i++){
      if(this.users[i].user_type === type && this.users[i].status === "active"){
        this.showingArray.push(this.users[i])
        if(this.showingArray.length>8){
          this.ShowPagination =true;
          this.ShowPagination2 = true;
        }
      }
    }
  }
  downloadPDF(){
    this.generatePDF(this.showingArray);
  }
  generatePDF(myOrderList) {
   
    console.log(myOrderList);
    var doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [15, 7]
    });
    var col = ['Name', 'User-ID', 'Company', 'Activation date', 'Email', 'Number', 'Status'];
    var rows = [];

    for (var key in myOrderList) {
      let list = myOrderList[key];

      var temp = [list.user_name, list.user_id, list.company_name, list.created_at, list.email_id, list.mobile, list.status];

      rows.push(temp);
    }

    doc.autoTable(col, rows);

    doc.save( ' Users.pdf');
  }

}
