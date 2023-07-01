import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // baseUrl = `//api-${window.location.hostname}/`;
  // baseUrl ='http://localhost:3000/';
  baseUrl ='http://api-b2b.peopleinfinia.in/' ;
  private hasDoneSetup  = new BehaviorSubject(false);
  IsSetupDone = this.hasDoneSetup.asObservable();
  constructor(private http:Http) {
  console.log(this.http,"serviceeee")
   }

  changeSetupStatus(status: boolean) {
    this.hasDoneSetup.next(status);
  }


  loginClient(data): Observable <any>{
      let url = this.baseUrl+'user/login';
      let headers = new Headers({'Content-Type':'application/json'});
      let options = new RequestOptions({ headers: headers});
      console.log("User Form : " , data);
      return this.http.post(url,data,options)
      .map((response:Response) => {
        let resp = response;
        return resp;
      })
      .catch(this._loginErrorHandler);

    }

    _loginErrorHandler(error: Response) {
      console.error(error);
      return Observable.throw(error || "Server Error");
    }
    resetPassword(form){
      let url = this.baseUrl+'user/forget_password';
      let headers = new Headers({'Content-Type':'application/json'});
      let options = new RequestOptions({ headers: headers});
      //console.log("User Form : " + data);
      return this.http.post(url,form,options)
      .map((response:Response) => {
        let resp = response;
        return resp;
      })
      .catch(this._loginErrorHandler);

    }
}
