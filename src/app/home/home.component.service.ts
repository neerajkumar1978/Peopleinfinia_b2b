import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { config } from '../app.config';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class HomeService {
  // baseUrl= `//api-${window.location.hostname}/`;
    //  baseUrl ='http://localhost:3000/' ;
  baseUrl = 'http://api-b2b.peopleinfinia.in/' ;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) {}

  signupClient(data): Observable<any> {
    let url = this.baseUrl + 'user/first_signup';
    let headers = config.getHeader();
    let options = new RequestOptions({ headers: headers });
    console.log('User Form : ' + data);
    return this.http
      .post(url, data, options)
      .map((response: Response) => {
        let resp = response;
        return resp;
      })
      .catch(this._errorHandler);
  }
  emailVerifyC(id): Observable <any>{
    let url = this.baseUrl+'user/account_verification/'+id;
    let headers =config.getHeader();
    let options = new RequestOptions({ headers: headers});
    console.log("verify Form : " + id);
    return this.http.get(url,options)
    .map((response:Response) => {
      let resp = response;
      return resp;
    })
    .catch(this._errorHandler);

  }
  _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }
}
