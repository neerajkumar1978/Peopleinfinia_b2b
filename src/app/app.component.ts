import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare let gtag:Function;
declare let fbq:Function;
declare let twq:Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      h1 {
        text-decoration: underline;
        background-color: green !important;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {
    router.events.subscribe((y: NavigationEnd) => {
      if (y instanceof NavigationEnd) {
        gtag('config', 'UA-153495656-1');
        fbq('track', 'PageView');
        twq('track', 'PageView');
      }
    });
  }

  ngOnInit() {
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  
}
