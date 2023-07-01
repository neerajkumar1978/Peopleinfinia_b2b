import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { config } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class RecruiterProfileService {
  //  baseUrl= `//api-${window.location.hostname}/`;
//  baseUrl ='http://localhost:3000/' ;
  baseUrl ='http://api-b2b.peopleinfinia.in/' ;

  constructor(private http:Http) {
   }

   recruiterProfile(id): Observable <any>{
      let url = this.baseUrl+'user/get_profile/'+id;
      let headers =config.getHeader();
      let options = new RequestOptions({ headers: headers});
      console.log("Profile Form : " + id);
      return this.http.get(url,options)
      .map((response:Response) => {
        let resp = response;
        return resp;
      })
      .catch(this._recruiterProfileErrorHandler);

    }

    _recruiterProfileErrorHandler(error: Response) {
      console.error(error);
      return Observable.throw(error || "Server Error");
    }

}
