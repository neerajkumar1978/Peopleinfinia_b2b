import { Component, OnInit ,ViewChild} from '@angular/core';
import { AppService } from '../app.component.service'
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-candidate-recuiter',
  templateUrl: './candidate-recuiter.component.html',
  styleUrls: ['./candidate-recuiter.component.css']
})
export class CandidateRecuiterComponent implements OnInit {
    @ViewChild('withdrawModal', {static: true}) public modalWithdraw: ModalDirective;

jobID='';
CandidateID='';
page = 1
  noDataI =false;
  showCandidates =[];
  ShowPagination = false;
  public userId:any;
  public manageCandidates:any;

  constructor(
  	private appService:AppService,
  	private toastr: ToastrService
  	        ) {

  		this.userId = localStorage.getItem('loginSessId');



  }

  ngOnInit() {
  	this.getData();
  }
  getData(){
  	this.appService.clientShortlistResumes(JSON.parse(this.userId))
		   .subscribe(
		        res => {
		          //var result =JSON.parse(res);
		          this.manageCandidates=res.result;
              console.log(res);
            this.showingCandidates(this.manageCandidates);
              if(this.manageCandidates.length > 12 ) this.ShowPagination = true;
		          // alert(JSON.stringify(res));
		          return res;
		        },
		        err => {
		          console.log("Error occured");
		          return err;
		        }
		   );

  }
  showingCandidates(data){
    this.showCandidates =[];
    for(let i = 0 ;  i < data.length ; i++){
      if(!data[i].candidates.withdraw){
       this.showCandidates.push(data[i])
      }
    }
  }
	withdrawModalOpen(jobID, candiID){
   console.log(jobID, candiID)
     this.jobID = jobID;
     this.CandidateID = candiID;
     this.modalWithdraw.show();
   }
   withdrawCandi(){
    this.appService.withdrawCandidate(JSON.parse(this.userId),this.CandidateID,this.jobID).subscribe((data)=>{
      console.log(data);
      this.toastr.success(data.responseMessage);
      this.getData();
      this.modalWithdraw.hide();
    },(err)=>{
      console.log(err);
    })
   }
}
