import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../home/home.component.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.css']
})
export class NewHomeComponent implements OnInit, AfterViewInit {
  id: string;

  constructor(
    private actRoute: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
    private homeService: HomeService,

  ) {



    this.id = this.actRoute.snapshot.params.id;
    // console.log("Verify",this.actRoute,this.actRoute.snapshot);
    
    if (this.id === undefined || this.id === null || this.id === 'undefined') {
      
    }
    else{

      this.homeService.emailVerifyC(this.id).subscribe(
        (res: any) => {
      console.log(" active email",res);
      window.open("https://peopleinfinia.com","_self");

          if (res.responseCode === 200){
    window.open("https://peopleinfinia.com","_self");

          this.toastr.success(res.responseMessage);
    // window.location.href = 'https://peopleinfinia.com';
          }
          else {
            this.toastr.success(res.responseMessage);
    setInterval(() => { window.open("https://peopleinfinia.com","_self"); }, 9000);

          }
        }, (err) => {
          console.log("err active");
          
          this.toastr.success(err);
        }
      )
    }
   }

  ngOnInit() {
  }

  ngAfterViewInit(){
    $(document).ready(function () {
      $('.owl-carousel').owlCarousel({});
    });
    $('#client-lgo').owlCarousel({
      loop:true,
      margin:10,
      autoplay:true,
      autoplayTimeout:2000,
      nav:true,
      navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
      responsive:{
          0:{
              items:1
          },
          600:{
              items:3
          },
          1000:{
              items:7
          }
      }
  
  });

  $('#call-kb').owlCarousel({
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:2000,
    nav:true,
    navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:6
        }
    }

});
  }
  goToSubscribe(){
    // onclick="window.location.href = 'https://peopleinfinia.in/subscribe';"

    window.open("https://peopleinfinia.in/subscribe", "_blank");

  }
  goToHome(){
    console.log("home")
    window.open("https://peopleinfinia.com","_self");

  }
  openMessage(){
  
    window.open("https://api.whatsapp.com/send?phone=91'9717790397'&text='hello'", "_blank");
  }

}
