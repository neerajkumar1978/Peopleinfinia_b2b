import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.component.service'

@Component({
  selector: 'app-all-send-proposal',
  templateUrl: './all-send-proposal.component.html',
  styleUrls: ['./all-send-proposal.component.css']
})
export class AllSendProposalComponent implements OnInit {
      showJobs =[];
      p=1;
      showPagination = false;
      title = '';
      companyName = '';
	    public userId:any;
	    recruiterJobs:any=[];

constructor(private appService:AppService){
    this.userId = localStorage.getItem('loginSessId');
    }


ngOnInit() {
    this.getList();
  }
  
  getList(){
   this.appService.recruiterAllJobList()
   .subscribe(
        res => {
          //var result =JSON.parse(res);
          this.recruiterJobs=res.result;
          console.log(this.recruiterJobs)
          const sortedJobs = this.recruiterJobs.slice().sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf())
          // alert(JSON.stringify(res));
          this.showJobs = sortedJobs;
          if(this.showJobs.length>10){
              this.showPagination = true;
          }
          return res;
        },
        err => {
          console.log("Error occured");
          return err;
        }
      );

  }
  applyFilter(){
    this.showJobs = [];
   this.showJobs = this.transform(this.recruiterJobs,this.title,this.companyName)  
    
  }
  transform(items : any[] , title: string, companyName: string){
        if (items && items.length){
            return items.filter(item =>{
                if (title && item.job_title.toLowerCase().indexOf(title.toLowerCase()) === -1){
                    return false;
                }
                if (companyName && item.company_name.toLowerCase().indexOf(companyName.toLowerCase()) === -1){
                    return false;
                }
                return true;
           })
        }
        else{
            return items;
        }
    }
}
