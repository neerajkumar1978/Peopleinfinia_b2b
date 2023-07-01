import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {config} from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class PostjobService {
  //  baseUrl= `//api-${window.location.hostname}/`;
  // baseUrl ='http://localhost:3000/' ;
  // baseUrl ='http://localhost:3000/' ;
baseUrl = 'http://api-b2b.peopleinfinia.in/';

  constructor(private http: Http) {
    this.http = http;
  };


  postJob(data): Observable<any> {
    let url = this.baseUrl + 'post/client_post';
    let headers = config.getHeader();
    let options = new RequestOptions({headers: headers});
    console.log('Post Form : ' + data);
    return this.http.post(url, data, options)
      .map((response: Response) => {
        let resp = response.json();
        return resp;
      })
      .catch(this._postJobErrorHandler);

  }

  _postJobErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }

  getSuggestedSkills(): Observable<any> {
    let url = this.baseUrl + 'post/getSkillSuggestion/node';
    let headers = config.getHeader();
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .map((response: Response) => {
        let resp = response.json();
        return resp;
      })
      .catch(this._getSuggestedSkillsErrorHandler);

  }

  _getSuggestedSkillsErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }


  getSuggestedIndustries(): Observable<any> {
    let url = this.baseUrl + 'post/get_industry_list';
    let headers = config.getHeader();
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .map((response: Response) => {
        let resp = response.json();
        return resp;
      })
      .catch(this._getSuggestedIndustriesErrorHandler);

  }

  _getSuggestedIndustriesErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }

  viewJob(id): Observable<any> {
    let url = this.baseUrl + 'post/recruiter_view_job/' + id;
    let headers = config.getHeader();
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .map((response: Response) => {
        let resp = response.json();
        return resp;
      })
      .catch(this._viewJobErrorHandler);

  }

  _viewJobErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }


  dashboardJob(): Observable<any> {
    let url = this.baseUrl + 'post/show_recuiter_dashbord_jobs';
    let headers = config.getHeader();
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options)
      .map((response: Response) => {
        let resp = response.json();
        return resp;
      })
      .catch(this._dashboardJobErrorHandler);

  }

  _dashboardJobErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }


}
