import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.component.service';

@Component({
  selector: 'app-recuiter-manage-jobs',
  templateUrl: './recuiter-manage-jobs.component.html',
  styleUrls: ['./recuiter-manage-jobs.component.css']
})
export class RecuiterManageJobsComponent implements OnInit {
  showFilter = false;
  manageJobs: any = [];
  public userId: any;
  jobPostion = '';
  location = '';
  page = 1;
  s;
  createdAt = '';
  jobStatus = '';
  ShowPagination = false;
  shortlisted = '';
  postedBy = '';

  constructor(private appService: AppService) {


  }

  ngOnInit() {

    this.userId = localStorage.getItem('loginSessId');

    if (this.userId) {
      this.appService.recruiterManageJobs(JSON.parse(this.userId))
        .subscribe(
          res => {
            // var result =JSON.parse(res);
            this.manageJobs = res.result;
            if (this.manageJobs && this.manageJobs.length > 12) {
              this.ShowPagination = true;
            }
            console.log('res-----', res);
            return res;
          },
          err => {
            console.log('Error occured');
            return err;
          }
        );
    }
  }

  // handleFileSelect = function(evt) {
  //   var files = evt.target.files;
  //   var file = files[0];

  //   if (files && file) {
  //       var reader = new FileReader();

  //       reader.onload = function() {
  //           var binaryString = reader.result.split(',')[1];
  //           alert(btoa(binaryString));
  //       };

  //   }
  // }

  /*this.appService.cvUploadRequest(JSON.parse(this.userId))
        .subscribe(
             res => {
               //var result =JSON.parse(res);
               this.manageJobs=res.result;

               alert(JSON.stringify(res));
               return res;
             },
             err => {
               console.log("Error occured");
               return err;
             }
           );*/


}
