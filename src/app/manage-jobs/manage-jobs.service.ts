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
export class ManageJobsService {
//  baseUrl= `//api-${window.location.hostname}/`;
  // baseUrl ='http://localhost:3000/' ;
  baseUrl ='http://api-b2b.peopleinfinia.in/' ;

   constructor(private http:Http) {
       this.http=http;
   }

  manageJob(id): Observable <any>{
      let url = this.baseUrl+'post/client_managae_jobs/'+id;
      let headers =config.getHeader();
      let options = new RequestOptions({ headers: headers});
      return this.http.get(url,options)
      .map((response:Response) => {
        let resp = response.json();
        return resp;
      })
      .catch(this._manageJobErrorHandler);

    }

    _manageJobErrorHandler(error: Response) {
      console.error(error);
      return Observable.throw(error || "Server Error");
    }

    updateJobStatus(id,data): Observable <any>{


      let url = this.baseUrl+'post/change_job_post_status/'+id;
      let headers = config.getHeader();
      let options = new RequestOptions({ headers: headers});

      let updateData={
        "status":data
      }
      return this.http.put(url,updateData,options)
      .map((response:Response) => {
        let resp = response.json();
        return resp;
      })
      .catch(this._updateJobStatusErrorHandler);

    }

     _updateJobStatusErrorHandler(error: Response) {
      console.error(error);
      return Observable.throw(error || "Server Error");
    }





}
