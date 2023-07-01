import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.component.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  showPop;
  page =1;
  data;
  ShowPagination = false;
  users;
  userName = "";
  userId ="";
  pendingUser = [];
  constructor(
    private appService:AppService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUser();
  }
  
    getUser(){
      this.appService.manageUserAdminpanel().subscribe((Data)=>{
        this.data = JSON.parse(Data._body);
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
        if(this.pendingUser.length > 10){
          this.ShowPagination = true;
        }
      }
    }
    console.log(this.pendingUser);
  }
}
