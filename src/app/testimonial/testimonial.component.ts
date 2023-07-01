import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    $(document).ready(function () {
      $('.owl-carousel').owlCarousel({});
    });
    $('.companies-inn .owl-carousel').owlCarousel({
      loop:true,
      margin:10,
      autoplay:true,
      autoplayTimeout:2500,
      nav:false,
      responsive:{
          0:{
              items:1
          },
          600:{
              items:3
          },
          1000:{
              items:5
          }
      }
  });
  }

}
