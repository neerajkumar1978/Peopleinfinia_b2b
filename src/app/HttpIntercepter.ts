import { Http, Request, Headers, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http"
import { Observable } from "rxjs/Rx"
import { Injectable,ViewContainerRef } from "@angular/core"
import { Router } from "@angular/router";
import { CommonFunctionsService } from "./sheared/index";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { AppService} from './app.component.service';
import { ErrorMessageService } from "./sheared/error-message.service";
import { environment } from "../environments/environment";
import "rxjs/add/operator/catch"
import "rxjs/add/observable/throw"
import "rxjs/add/operator/map"

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  private count: number = 0;
  constructor(private router: Router,
    private commonFunctions: CommonFunctionsService,
    private errorService: ErrorMessageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.count++;
    //  if (this.count == 1) { document.getElementById("spinner").style.display = "block"; }

    let token = '';
    const value: string = localStorage.getItem('token');
    let currentUser = JSON.parse(value);

    let endPoint = AppService.getEnvironmentVariable('endPoint')
    console.log("currentUser",currentUser);
    if (currentUser && req.url.startsWith(endPoint)) {
      token = currentUser;
      req = req.clone({ headers: req.headers.set('x-auth-token' , token) });
    }
    // if (!req.headers.has('Content-Type')) {
    //   req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    // }

    // req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

     let handleRequest: Observable<HttpEvent<any>> = next.handle(req);

    return handleRequest.catch((err: any) => {
    //   this.count--;
    // if (this.count == 0) document.getElementById("spinner").style.display = "none";

      if (err.status == 401) {
        this.commonFunctions.logout();
        // this.router.navigate(['/']);
        window.location.href = 'https://peopleinfinia.com';
        this.errorService.addErrors([`Your session has expired. Please Sign In again.`]);
      }
      else if (err.status == 500) {
        this.errorService.addErrors([`Some server error has occured. Please try again later.`]);
      }
      // document.getElementById("spinner").style.display = "none";
      return Observable.throw(err);
    }).do(event => {
      if (event instanceof HttpResponse) {

        // this.count--;
        // if (this.count == 0) document.getElementById("spinner").style.display = "none";
      }
    });
  }
}



