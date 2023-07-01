import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { AppService } from "../app.component.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-client-dashboard",
  templateUrl: "./client-dashboard.component.html",
  styleUrls: ["./client-dashboard.component.css"],
})
export class ClientDashboardComponent implements OnInit {
  clientCount: any = [];
  jobFeeds = [];
  eyCount;
  Data;UserActive:Boolean=false;
  intervieweS = [];
  requestsReschedule = [];
  reverse: boolean = false;
  key: string = "interview_date";
  noRequest = false;
  userD;
  noInterviews = false;
  noFeeds = false;

  name = "";
  companyName: "";
  public userId: any;
  hasDoneSetup: boolean = JSON.parse(localStorage.getItem("hasDoneSetup"));
  ngOnInit() {
    this.getReschedulerequest();
    !(this.hasDoneSetup) && this.toastr.warning("Please update your profile");
  }
  public constructor(
    private appService: AppService,
    private router: Router,
    appService1: AppService,
    private toastr: ToastrService
  ) {
    this.userId = localStorage.getItem("loginSessId");
    console.log("inside");
    this.appService.clientDashboardCount(JSON.parse(this.userId)).subscribe(
      (res) => {
        //var result =JSON.parse(res);
        this.clientCount = res;
        this.eyCount = this.clientCount.ey_qualifiedResume[0].count;
        //alert(JSON.stringify(res));
        console.log("res---", res);

        return res;
      },
      (err) => {
        console.log("Error occured");
        return err;
      }
    );

    this.appService.clientDashboardFeed(JSON.parse(this.userId)).subscribe(
      (res) => {
        //var result =JSON.parse(res);
        if (res.responseCode === 204) {
          this.noFeeds = true;
        }
        this.jobFeeds = res;
        //alert(JSON.stringify(res));

        console.log(this.noFeeds);

        console.log("res56565---", res);
        return res;
      },
      (err) => {
        console.log("Error occured");
        return err;
      }
    );
    this.appService.recruiterProfile(JSON.parse(this.userId)).subscribe(
      (objS) => {
        var resp = objS.json();
        this.userD = resp;
        this.name = this.userD.user_name;
        this.companyName = this.userD.company_name;
        console.log("ecerv", this.userD);
        if(this.userD.status == "active"){
          this.UserActive = true;
        }else{
          this.UserActive = false;
        }
      },
      (objE) => {
        console.log(objE);
      }
    );
  }
  formVal = 1;

  setOrder(value: string) {
    if (this.key === value) {
      this.reverse = !this.reverse;
    }
    this.key = value;
  }

  get user(): any {
    var user = localStorage.getItem("loginSessId");
    console.log(user);
    if (user) {
      user = JSON.parse(user);
      return user;
    }
  }

  getSheduledInterview() {
    this.appService.getScheduledInterview(JSON.parse(this.userId)).subscribe(
      (data) => {
        console.log(data, "interviewed list");
        if (data.responseCode === 204) {
          this.noInterviews = true;
        }
        this.intervieweS = data;
        this.setOrder("interview_date");
        console.log(this.intervieweS);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getReschedulerequest() {
    this.appService.getRescheduleRequtes(JSON.parse(this.userId)).subscribe(
      (data) => {
        console.log(data);
        this.Data = JSON.parse(data["_body"]);
        console.log(this.Data);
        this.requestsReschedule = this.Data;
        if (this.Data.responseCode === 204) {
          this.noRequest = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  processRescheduleRequest(id) {
    console.log(id);
    this.router.navigate(["clientHeader/schedule/" + id]);
  }
}
