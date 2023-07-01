import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { config } from './app.config';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs';

@Injectable()
export class AppService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
// baseUrl= `//api-${window.location.hostname}/`; // for live
  // baseUrl = 'http://localhost:3000/';  //for localhost
  baseUrl ='http://api-b2b.peopleinfinia.in/' ;

  constructor(
    private http: Http, private httpC: HttpClient) {
  }
  private clientDashboardCountUrl = config.getEnvironmentVariable('endPoint') + 'post/client_dasboard_count/';
  public static getEnvironmentVariable(value) {
    const serverip = 'http://localhost:3000/';

    // let serverip = 'http://79719b07.ngrok.io/';
    // let serverip = 'http://192.168.0.19:8080/';
    // let serverip = 'http://7ed90083.ngrok.io/';
    //http://devexchange.Bitbose.io:36115/swagger/
    return serverip;
  }
  getApplicantDetails(id): Observable<any> {
    const url = this.baseUrl + 'candidate/getApplican/' + id;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._getSuggestedIndustriesErrorHandler);

  }
  editprofileApplicant(data, id) :Observable<any>{
    const url = this.baseUrl + 'candidate/edit_profile/' + id;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    console.log('Post Form1 : ', data);
    return this.http.put(url, data, options)
      .map((response: Response) => {
        const resp = response.json();
        console.log(resp);
        return resp;
      })
      .catch(this._postJobErrorHandler);

  }
  saveDraft(data): Observable<any> {

    const url = this.baseUrl + 'post/save_draft_post';
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    console.log('Post Form : ', data);
    return this.http.post(url, data, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._postJobErrorHandler);

  }

  _postJobErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }

  candidateLoginSrvc(data): Observable<any> {
    const url = this.baseUrl + 'candidate/login';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log('Candidate Login Form Data: ', data);
    return this.http.post(url, data, options)
      .map((response: Response) => {
        return response;
      });
  }

  candidateSignupSrvc(data) {
    // return of({ message: 'successfully run', status: true });
    console.log('signupForm Data:', data);
    const url = this.baseUrl + 'candidate/signup';
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    // return this.http.post(url, data, options).map(response => response).catch(this._errorHandler);
    return this.http
      .post(url, data, options)
      .map((response: Response) => {
        return response;
      });
  }

  postJob(data) {
    console.log(data, 'enteredddsdggs');
    return this.http.post('/post/client_post', data);
    // .subscribe(
    //      res => {
    //        console.log(res);
    //        return res;
    //      },
    //      err => {
    //        console.log("Error occured");
    //        return err;
    //      }
    //    );
  }
  getRecuiterDashbordJobs() {
    return this.http.get('/post/show_recuiter_dashbord_jobs ');
  }
  getRecruiterViewJob(id: any) {
    return this.http.get('/post/recruiter_view_job/' + id);
  }
  checkJobStatus(id) {
    const url = this.baseUrl + 'post/getJobStatus/' + id;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._getSuggestedIndustriesErrorHandler);

  }
  getPiShortlistedCandidates(id) {

    const url = this.baseUrl + 'post/pishortlisted_user';
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._getSuggestedIndustriesErrorHandler);

  }

  getSuggestedIndustries(): Observable<any> {
    const url = this.baseUrl + 'post/get_industry_list';
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._getSuggestedIndustriesErrorHandler);

  }
  getSuggestedFunctionalAreas(): Observable<any> {
    const url = this.baseUrl + 'post/get_function_list';
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._getSuggestedIndustriesErrorHandler);

  }
  _getSuggestedIndustriesErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }
  makeUploadRequest(body): Observable<any> {
    const url = this.baseUrl + 'media/upload';
    const headers = new Headers();

    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._uploadErrorHandler);

  }

  _uploadErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }

  candidateBulkUploadRequest(jobId, loginId, filePath): Observable<any> {
    const url = this.baseUrl + 'post/candidateBulkUpload/' + jobId + '/' + loginId;
    const headers = config.getHeader();

    var data = {

      'filePath': filePath
    };

    const options = new RequestOptions({ headers: headers });
    return this.http.put(url, data, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._candidateBulkUploadRequestErrorHandler);

  }
  replaceCV(id, form): Observable<any> {
    const url = this.baseUrl + 'post/replaceResume/' + id;
    const headers = config.getHeader();

    const options = new RequestOptions({ headers: headers });
    return this.http.put(url, form, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._candidateBulkUploadRequestErrorHandler);

  }
  readXLSX(filePath) {
    console.log('api');
    const url = this.baseUrl + 'post/readXlsxFileCandidates';
    const headers = config.getHeader();
    var data = {
      'filePath': filePath
    };
    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, data, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._candidateBulkUploadRequestErrorHandler);

  }
  updateInterviewConfirmation(interviewId): Observable<any> {
    const url = this.baseUrl + 'interview/confirm_slot/' + interviewId;
    const headers = config.getHeader();

    const options = new RequestOptions({ headers: headers });
    return this.http.put(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._candidateBulkUploadRequestErrorHandler);

  }

  _candidateBulkUploadRequestErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }


  recruiterAllJobList(): Observable<any> {
    const url = this.baseUrl + 'post/recruiter_all_job_list';

    const headers = config.getHeader();


    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterAllJobListErrorHandler);

  }
  getRescheduleRequestDetails(id): Observable<any> {
    const url = this.baseUrl + 'interview/reschedule_request/' + id;

    const headers = config.getHeader();


    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterAllJobListErrorHandler);

  }
  getEditJobsDetails(id, jobId) {
    console.log("id, jobId",id, jobId);
    
    const url = this.baseUrl + 'post/client_get_job_detail/' + jobId + '/' + id;

    const headers = config.getHeader();


    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterAllJobListErrorHandler);
  }
  _recruiterAllJobListErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }


  editJobPostRequest(jobId, data): Observable<any> {
    const url = this.baseUrl + 'post/edit_post/' + jobId;
    const headers = config.getHeader();


    const options = new RequestOptions({ headers: headers });
    return this.http.put(url, data, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._editJobPostRequestErrorHandler);

  }

  _editJobPostRequestErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }



  recruiterManageJobs(loginId): Observable<any> {
    const url = this.baseUrl + 'post/consultant_manage_jobs/' + loginId;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterManageJobsErrorHandler);

  }

  clientShortlistResumes(loginId): Observable<any> {
    const url = this.baseUrl + 'post/recruiter_manage_candidate/' + loginId;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterManageJobsErrorHandler);

  }
  _recruiterManageJobsErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }
  postSavedJob(data): Observable<any> {
    const url = this.baseUrl + 'post/client_post_saved';
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    console.log('Post Form : ' + data);
    return this.http.post(url, data, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._postJobErrorHandler);

  }
  saveBookMark(id, jobid): Observable<any> {
    const url = this.baseUrl + 'post/bookmark_post';
    const headers = config.getHeader();


    var body = {

      '_id': id,
      'job_id': jobid
    };

    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._saveBookMarkErrorHandler);

  }

  _saveBookMarkErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }


  bookMarkJobList(loginId): Observable<any> {
    const url = this.baseUrl + 'post/recruiter_bookmark_job_list/' + loginId;

    const headers = config.getHeader();


    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._bookMarkJobListErrorHandler);

  }

  _bookMarkJobListErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }


  clientDashboardCount(loginId): Observable<any> {
    // return this.http.get(this.clientDashboardCountUrl + loginId, {headers: config.getHeader()}).map((res: Response) => res.json());

    const url = this.baseUrl + 'post/client_dasboard_count/' + loginId;

    const headers = config.getHeader();


    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._clientDashboardCountErrorHandler);

  }

  _clientDashboardCountErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }



  recruiterDashboardCount(loginId): Observable<any> {
    const url = this.baseUrl + 'post/recruiter_dasboard_count/' + loginId;

    const headers = config.getHeader();

    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterDashboardCountErrorHandler);

  }

  _recruiterDashboardCountErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }



  clientShortListCandidate(status, jobid, candidateId, id): Observable<any> {
    const url = this.baseUrl + 'post/client_shortlist_candidate';
    const headers = config.getHeader();

    var body = {
      '_id': id,
      'status': status,
      'job_id': jobid,
      'candidate_id': candidateId
    };

    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._clientShortListCandidateErrorHandler);

  }

  _clientShortListCandidateErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }

  convertBaseToUploadCV(form): Observable<any> {
    const url = this.baseUrl + 'post/getUrlOfCandidateCv';
    const headers = config.getHeader();

    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, form, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._cvUploadRequestErrorHandler);

  }
  cvUploadRequest(form, loginId): Observable<any> {
    const url = this.baseUrl + 'post/upload_candidates_resume/' + loginId;
    const headers = config.getHeader();

    const options = new RequestOptions({ headers: headers });
    return this.http.put(url, form, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._cvUploadRequestErrorHandler);

  }
  rescheduleRequestDone(form, Id): Observable<any> {
    const url = this.baseUrl + 'interview/process_reschedule_request/' + Id;
    const headers = config.getHeader();

    const options = new RequestOptions({ headers: headers });
    return this.http.put(url, form, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._cvUploadRequestErrorHandler);

  }
  _cvUploadRequestErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }


  recruiterManageCandidate(loginId): Observable<any> {
    const url = this.baseUrl + 'post/recruiter_manage_candidate/' + loginId;

    const headers = config.getHeader();


    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterManageCandidateErrorHandler);

  }

  _recruiterManageCandidateErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }

  withdrawCandidate(loginId, candidatesId, jobId): Observable<any> {
    const url = this.baseUrl + 'post/withdraw_candidates';

    const headers = config.getHeader();


    var data = {
      'job_id': jobId,
      '_id': loginId,
      'candidates_id': candidatesId

    };



    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, data, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._withdrawCandidateErrorHandler);

  }

  _withdrawCandidateErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }


  clientDashboardFeed(loginId): Observable<any> {
    const url = this.baseUrl + 'post/client_dashboard_feed/' + loginId;

    const headers = config.getHeader();


    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._clientDashboardFeedErrorHandler);

  }

  _clientDashboardFeedErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }



  clientViewResumeOnDashBoard(jobId, loginId): Observable<any> {
    const url = this.baseUrl + 'post/client_view_resume/' + loginId + '/' + jobId;

    const headers = config.getHeader();


    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._clientViewResumeOnDashBoardErrorHandler);

  }

  _clientViewResumeOnDashBoardErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }

  changePassword(loginId, form): Observable<any> {
    const url = this.baseUrl + 'user/change_password/' + loginId;
    const headers = config.getHeader();

    const options = new RequestOptions({ headers: headers });
    return this.http.put(url, form, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._cvUploadRequestErrorHandler);

  }


  getProfileData(loginUserId, job_id, candidate_id): Observable<any> {
    const url = this.baseUrl + 'post/fetch_data' + '/' + loginUserId + '/' + job_id + '/' + candidate_id;
    console.log(url);
    const headers = config.getHeader();

    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterAllJobListErrorHandler);


  }
  setInterviewOfSingleCandidate(form): Observable<any> {
    const url = this.baseUrl + 'interview/save_time_slot_job';
    const headers = config.getHeader();

    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, form, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._uploadErrorHandler);

  }
  getUserEvent(userId): Observable<any> {
    const url = this.baseUrl + 'interview/client_slot_aviable_list/' + userId;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterAllJobListErrorHandler);
  }
  getScheduledInterview(userId): Observable<any> {
    const url = this.baseUrl + 'interview/client_interview_dashboard/' + userId;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterAllJobListErrorHandler);
  }

  getCandidateList(userId): Observable<any> {
    const url = this.baseUrl + 'post/client_candidate_list/' + userId;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterAllJobListErrorHandler);
  }

  getRecruiterCompanyList(id): Observable<any> {
    const url = this.baseUrl + 'post/recruiter_company_calender_list/' + id;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterAllJobListErrorHandler);
  }
  getCompanyEvent(id, cId): Observable<any> {
    const url = this.baseUrl + 'interview/recruiter_calender_list/' + id + '/' + cId;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterAllJobListErrorHandler);
  }


  getSkillsList(): Observable<any> {
    const url = this.baseUrl + 'post/newGetSkillsuggestion';
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterAllJobListErrorHandler);
  }

  getSingleJobData(id): Observable<any> {
    const url = this.baseUrl + 'post/showjob/' + id;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterAllJobListErrorHandler);
  }

  getNotificationsFeedRecuiterDashboard(id): Observable<any> {
    const url = this.baseUrl + 'interview/recruiter_interview_dashboard/' + id;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterAllJobListErrorHandler);
  }

  getCandidateJobStats(id, jobId): Observable<any> {
    const url = this.baseUrl + 'post/view_job_status_recruiter/' + id + '/' + jobId;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterAllJobListErrorHandler);
  }
  getSingleJobDetails(id, jobId): Observable<any> {
    const url = this.baseUrl + 'post/view_client_job_response/' + id + '/' + jobId;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._recruiterAllJobListErrorHandler);
  }

  recruiterProfile(id): Observable<any> {
    const url = this.baseUrl + 'user/get_profile/' + id;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    console.log('Profile Form : ' + id);
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._recruiterProfileErrorHandler);

  }

  _recruiterProfileErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }

  signupClient(data): Observable<any> {
    const url = this.baseUrl + 'user/first_signup';
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    console.log('User Form : ' + data);
    return this.http.post(url, data, options)
      .map((response: Response) => {
        const resp = response;
        return resp;
      })
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }
  updateProfile(loginId, form): Observable<any> {
    const url = this.baseUrl + 'user/edit_profile/' + loginId;
    const headers = config.getHeader();

    const options = new RequestOptions({ headers: headers });
    return this.http.put(url, form, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._cvUploadRequestErrorHandler);

  }
  updatePostJob(loginId, form): Observable<any> {
    const url = this.baseUrl + 'post/edit_post/' + loginId;
    const headers = config.getHeader();

    const options = new RequestOptions({ headers: headers });
    return this.http.put(url, form, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._cvUploadRequestErrorHandler);

  }
  deleteJob(jobId): Observable<any> {
    const url = this.baseUrl + 'post/delete_post/' + jobId;
    const headers = config.getHeader();

    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._cvUploadRequestErrorHandler);

  }

  resheduleRecruiterRequest(interviewId, form): Observable<any> {
    const url = this.baseUrl + 'interview/reschedule_request/' + interviewId;
    const headers = config.getHeader();

    const options = new RequestOptions({ headers: headers });
    return this.http.put(url, form, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._cvUploadRequestErrorHandler);

  }

  getRescheduleRequtes(id): Observable<any> {
    const url = this.baseUrl + 'interview/reschedule_interviews/' + id;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    console.log('Profile Form : ' + id);
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._recruiterProfileErrorHandler);

  }
  getSubmittedIssueUser(id): Observable<any> {
    const url = this.baseUrl + 'user/submit-issue/' + id;
    const headers = new Headers;
    const options = new RequestOptions({ headers: headers });
    console.log('Profile Form : ' + id);
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._recruiterProfileErrorHandler);

  }
  getAllSubmittedUsersByID(id): Observable<any> {
    const url = this.baseUrl + 'admin/user-issues?user=' + id;
    const headers = new Headers;
    const options = new RequestOptions({ headers: headers });
    console.log('Profile Form : ' + id);
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._recruiterProfileErrorHandler);

  }

  submitIssue(data): Observable<any> {
    const url = this.baseUrl + 'user/submit-issue';
    const headers = new Headers;
    const options = new RequestOptions({ headers: headers });
    // console.log("Profile Form : ");
    return this.http.post(url, data, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._recruiterProfileErrorHandler);

  }
  getSingleSubmittedIssues(id): Observable<any> {
    const url = this.baseUrl + 'user/submit-issue/' + id;
    const headers = new Headers;
    const options = new RequestOptions({ headers: headers });
    console.log('Profile Form : ' + id);
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._recruiterProfileErrorHandler);

  }

  //----------------------------------------------Admin---------------------------------------------------------------------------
  blockUserAdmin(id, form): Observable<any> {
    const url = this.baseUrl + 'admin/block_user/' + id;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.put(url, form, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._manageJobErrorHandler);

  }


  adminUserClientJob(id): Observable<any> {
    const url = this.baseUrl + 'post/client_managae_jobs/' + id;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._manageJobErrorHandler);

  }

  _manageJobErrorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }

  adminGetProfile(id): Observable<any> {
    const url = this.baseUrl + 'admin/get_profile/' + id;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    console.log('Profile Form : ' + id);
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._recruiterProfileErrorHandler);

  }
  adminLoginForm(form): Observable<any> {
    const url = this.baseUrl + 'admin/admin_login';
    const headers = config.getHeader();

    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, form, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._uploadErrorHandler);

  }

  manageJobsAdminpanel(): Observable<any> {
    const url = this.baseUrl + 'admin/admin_full_job_list';
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    //console.log("Profile Form : " + id);
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._manageJobsAdminPanel);

  }
  _manageJobsAdminPanel(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }
  manageUserAdminpanel(): Observable<any> {
    const url = this.baseUrl + 'admin/admin_manage_user';
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    //console.log("Profile Form : " + id);
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._manageJobsAdminPanel);

  }

  getAllJobsListAdmin(): Observable<any> {
    const url = this.baseUrl + 'admin/admin_full_job_list';
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    //console.log("Profile Form : " + id);
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._manageJobsAdminPanel);

  }
  getLastestJobsAdmin(): Observable<any> {
    const url = this.baseUrl + 'admin/admin_latest_job_list';
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    //console.log("Profile Form : " + id);
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._manageJobsAdminPanel);

  }
  getDashboardCountAdmin(): Observable<any> {
    const url = this.baseUrl + 'admin/admin_dasboard_count';
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    //console.log("Profile Form : " + id);
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._manageJobsAdminPanel);

  }
  resDeskAdmin(): Observable<any> {
    const url = this.baseUrl + 'admin/resdesk_admin';
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    //console.log("Profile Form : " + id);
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._manageJobsAdminPanel);

  }
  shortListAdminCandidiate(form): Observable<any> {
    const url = this.baseUrl + 'admin/admin_cv_shortlist';
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    //console.log("Profile Form : " + id);
    return this.http.post(url, form, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._manageJobsAdminPanel);

  }
  undoAdminCandidiate(form): Observable<any> {
    const url = this.baseUrl + 'admin/admin_cv_undo';
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    //console.log("Profile Form : " + id);
    return this.http.post(url, form, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._manageJobsAdminPanel);

  }
  getUsersOnJob(form): Observable<any> {
    const url = this.baseUrl + 'admin/admin_view_resume';
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    //console.log("Profile Form : " + id);
    return this.http.post(url, form, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._manageJobsAdminPanel);

  }
  getRecruiterJobsAdmin(id): Observable<any> {
    const url = this.baseUrl + 'admin/get_recruiter_jobs/' + id;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    //console.log("Profile Form : " + id);
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._manageJobsAdminPanel);
  }
  getUserProfileStatus(id): Observable<any> {
    const url = this.baseUrl + 'user/timeline/' + id;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    //console.log("Profile Form : " + id);
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._manageJobsAdminPanel);
  }
  setProfileStatus(form, id): Observable<any> {
    const url = this.baseUrl + 'user/timeline/' + id;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    //console.log("Profile Form : " + id);
    return this.http.post(url, form, options)
      .map((response: Response) => {
        const resp = response;

        return resp;
      })
      .catch(this._manageJobsAdminPanel);

  }
  activateAccountUser(id, form): Observable<any> {
    const url = this.baseUrl + 'user/edit_profile/' + id;
    const headers = config.getHeader();

    const options = new RequestOptions({ headers: headers });
    return this.http.put(url, form, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._cvUploadRequestErrorHandler);

  }
  getAllAdminQuestions(): Observable<any> {
    const url = this.baseUrl + 'admin/issues';
    const headers = new Headers;
    const options = new RequestOptions({ headers: headers });
    //console.log("Profile Form : " + id);
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response;
        return resp;
      })
      .catch(this._manageJobsAdminPanel);
  }
  adminCreateIssue(form): Observable<any> {
    const url = this.baseUrl + 'admin/issues';
    const headers = new Headers;
    const options = new RequestOptions({ headers: headers });
    //console.log("Profile Form : " + id);
    return this.http.post(url, form, options)
      .map((response: Response) => {
        const resp = response;
        return resp;
      })
      .catch(this._manageJobsAdminPanel);

  }
  updateQueryStatus(form, id): Observable<any> {
    const url = this.baseUrl + 'admin/user-issues/' + id;
    const headers = new Headers;


    const options = new RequestOptions({ headers: headers });
    return this.http.put(url, form, options)
      .map((response: Response) => {
        const resp = response.json();
        return resp;
      })
      .catch(this._cvUploadRequestErrorHandler);

  }
  getSubmitedIssuesAdmin(): Observable<any> {
    const url = this.baseUrl + 'admin/user-issues';
    const headers = new Headers;
    const options = new RequestOptions({ headers: headers });
    //console.log("Profile Form : " + id);
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response;
        return resp;
      })
      .catch(this._manageJobsAdminPanel);
  }
  getIssueById(id): Observable<any> {
    const url = this.baseUrl + 'user/submit-issue/' + id;
    const headers = new Headers;
    const options = new RequestOptions({ headers: headers });
    //console.log("Profile Form : " + id);
    return this.http.get(url, options)
      .map((response: Response) => {
        const resp = response;
        return resp;
      })
      .catch(this._manageJobsAdminPanel);
  }

//  <--------------------------------------------------------Added New Services------------------------------------------------------------------->

  candidateLoginWithGoogle(data): Observable<any> {
    const url = this.baseUrl + 'candidate/loginWithGoogle';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log('Candidate Login Form Data: ', data);
    return this.http.post(url, data, options)
      .map((response: Response) => {
        return response;
      });
  }

  candidateLoginWithFB(data): Observable<any> {
    const url = this.baseUrl + 'candidate/loginWithFB';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log('Candidate Login Form Data: ', data);
    return this.http.post(url, data, options)
      .map((response: Response) => {
        return response;
      });
  }

  forgotPassword(data): Observable<any> {
     const url = this.baseUrl + 'candidate/forget_password';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log('Candidate Login Form Data: ', data);
    return this.http.post(url, data, options)
      .map((response: Response) => {
        return response;
      });
  }

  getChangePassword(user,id) {
    const url = this.baseUrl + 'candidate/change_password/'+ id;
    const headers = config.getHeader();
    const options = new RequestOptions({ headers: headers });
    return this.http.put(url, user, options)
      .map((response: Response) => {
        return response;
      });
  }


}
