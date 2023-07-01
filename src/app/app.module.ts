import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {ModalModule} from 'ngx-bootstrap/modal';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {Ng2CompleterModule} from 'ng2-completer';
import {Ng5SliderModule} from 'ng5-slider';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {MglTimelineModule} from 'angular-mgl-timeline';
import {appRouter} from './app.routing';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  NgModule,
  Injectable,
} from '@angular/core';
import {SocialLoginModule, AuthServiceConfig} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      '630071816933-l4pq4ca5onsh359ru7pnapi5m82lcbo3.apps.googleusercontent.com'
    ),
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('411803122802002'),
  },
]);

export function provideConfig() {
  return config;
}

import {AngularDateTimePickerModule} from 'angular2-datetimepicker';
import {BarRatingModule} from 'ngx-bar-rating';
import {TagInputModule} from 'ngx-chips';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {RecruiterDashboardComponent} from './recruiter-dashboard/recruiter-dashboard.component';
import {ClientDashboardComponent} from './client-dashboard/client-dashboard.component';
import {ClientHeaderComponent} from './client-header/client-header.component';
import {RecruiterHeaderComponent} from './recruiter-header/recruiter-header.component';
import {ManageJobsComponent} from './manage-jobs/manage-jobs.component';
import {CandidatesComponent} from './candidates/candidates.component';
import {SupportIssueComponent} from './support-issue/support-issue.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {PostNewJobComponent} from './post-new-job/post-new-job.component';
import {ReqJobProposalComponent} from './req-job-proposal/req-job-proposal.component';
import {ViewResponseComponent} from './view-response/view-response.component';
import {AllSendProposalComponent} from './all-send-proposal/all-send-proposal.component';
import {RecruiterProfileComponent} from './recruiter-profile/recruiter-profile.component';
import {ViewProposalComponent} from './view-proposal/view-proposal.component';
import {CandidateRecuiterComponent} from './candidate-recuiter/candidate-recuiter.component';
import {RecuiterManageJobsComponent} from './recuiter-manage-jobs/recuiter-manage-jobs.component';
import {RecruiterScheduleComponent} from './recruiter-schedule/recruiter-schedule.component';
import {ViewResumeComponent} from './view-resume/view-resume.component';
import {JobStatsComponent} from './job-stats/job-stats.component';
import {LoginComponent} from './login/login.component';
import {AboutComponent} from './about/about.component';
import {MainHeaderComponent} from './main-header/main-header.component';
import {FaqComponent} from './faq/faq.component';

// candidate
import {CandidateComponent} from './candidate/candidate.component';
import {CandidateSignupComponent} from './candidate-signup/candidate-signup.component';

import {RecruiterSignUpComponent} from './recruiter-sign-up/recruiter-sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeService} from './home/home.component.service';
import {LoginService} from './login/login.service';
import {HttpModule, Http} from '@angular/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {CommonFunctionsService} from './sheared';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {AuthGuard, AdminAuthGuard} from './guards/index';
import {AuthInterceptor} from './HttpIntercepter';
import {AppService} from './app.component.service';
import {MyDatePickerModule} from 'mydatepicker';
import {TermsComponent} from './terms/terms.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import 'flatpickr/dist/flatpickr.css';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlatpickrModule} from 'angularx-flatpickr';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {ToastrModule} from 'ngx-toastr';
import {NewComponentComponent} from './new-component/new-component.component';
import {EditJobsComponent} from './edit-jobs/edit-jobs.component';
//admin
import {HeaderComponent} from './admin/header/header.component';
import {OverviewComponent} from './admin/overview/overview.component';
import {LeadsComponent} from './admin/leads/leads.component';
import {AdminManageJobsComponent} from './admin/manage-jobs/admin-manage-jobs.component';
import {ManageUserComponent} from './admin/manage-user/manage-user.component';
import {IssueComponent} from './admin/issue/issue.component';
import {ResdeckComponent} from './admin/resdeck/resdeck.component';
import {ProfileReportComponent} from './admin/profile-report/profile-report.component';
import {ResumePdfComponent} from './admin/resume-pdf/resume-pdf.component';
import {ViewStatusComponent} from './admin/view-status/view-status.component';
import {UserProfileComponent} from './admin/user-profile/user-profile.component';
import {AdminLoginComponent} from './admin/admin-login/admin-login.component';
import {ViewResumeAdminComponent} from './admin/view-resume-admin/view-resume-admin.component';
import {AdminRecruiterProfileComponent} from './admin/admin-recruiter-profile/admin-recruiter-profile.component';
import {ViewJobComponent} from './admin/view-job/view-job.component';
import {ClientprofileComponent} from './clientprofile/clientprofile.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {JobSearchPipe} from './sheared/filter.pipe';
import {AdminUserSearch} from './sheared/adminUserFilter.pipe';
import {adminJobSearchPipe} from './sheared/adminJobsFilter.pipe';
import {LeadsFilterSearch} from './sheared/leadsFilter.pipe';
import {adminRestdeskSearchPipe} from './sheared/resdeskFilter.pipe';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {Ng2Timeline} from 'ng2-timeline';
import {NgAlertModule} from '@theo4u/ng-alert';
import {IssuesQuestionsComponent} from './admin/issues-questions/issues-questions.component';
import {OrderModule} from 'ngx-order-pipe';
import {PiShortlistedComponent} from './pi-shortlisted/pi-shortlisted.component';
import {CandidateSignupEducationComponent} from './candidate-signup-education/candidate-signup-education.component';
import {CandidateSignupPersonalComponent} from './candidate-signup-personal/candidate-signup-personal.component';
import {CandidateSignupEmploymentComponent} from './candidate-signup-employment/candidate-signup-employment.component';
import {CandidateDashboardComponent} from './candidate-dashboard/candidate-dashboard.component';
import {CandidateProfileComponent} from './candidate-profile/candidate-profile.component';
import {CandidateLoginComponent} from './candidate-login/candidate-login.component';
import {CandidateSignupTypeComponent} from './candidate-signup-type/candidate-signup-type.component';
import {CandidateHeaderComponent} from './candidate-header/candidate-header.component';
import {CandidateForgotPasswordComponent} from './candidate-forgot-password/candidate-forgot-password.component';
import {NewHomeComponent} from './new-home/new-home.component';
import {TestimonialComponent} from './testimonial/testimonial.component';
import {HugeTalentPoolComponent} from './huge-talent-pool/huge-talent-pool.component';
import {SearchAndMatchComponent} from './search-and-match/search-and-match.component';
import {SubscribeComponent} from './subscribe/subscribe.component';
import {TwoStepScreeningProcessComponent} from './two-step-screening-process/two-step-screening-process.component';
import {RefundPolicyComponent} from './refund-policy/refund-policy.component';
import {ChangePasswordComponent} from './app/change-password/change-password.component';
import {RecuriterChangePasswordComponent} from './app/recuriter-change-password/recuriter-change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecruiterDashboardComponent,
    ClientDashboardComponent,
    ClientHeaderComponent,
    RecruiterHeaderComponent,
    ManageJobsComponent,
    CandidatesComponent,
    SupportIssueComponent,
    JobSearchPipe,
    AdminUserSearch,
    adminRestdeskSearchPipe,
    adminJobSearchPipe,
    LeadsFilterSearch,
    ScheduleComponent,
    PostNewJobComponent,
    ReqJobProposalComponent,
    ViewResponseComponent,
    AllSendProposalComponent,
    RecruiterProfileComponent,
    ViewProposalComponent,
    CandidateRecuiterComponent,
    RecuiterManageJobsComponent,
    RecruiterScheduleComponent,
    ViewResumeComponent,
    JobStatsComponent,
    AboutComponent,
    MainHeaderComponent,
    FaqComponent,

    CandidateComponent,
    CandidateSignupComponent,

    RecruiterSignUpComponent,
    LoginComponent,
    TermsComponent,
    PrivacyPolicyComponent,
    ContactUsComponent,
    NewComponentComponent,
    EditJobsComponent,
    //admin
    HeaderComponent,
    AdminLoginComponent,
    OverviewComponent,
    LeadsComponent,
    AdminManageJobsComponent,
    ManageUserComponent,
    IssueComponent,
    ResdeckComponent,
    ProfileReportComponent,
    ResumePdfComponent,
    ViewStatusComponent,
    UserProfileComponent,
    ClientprofileComponent,
    ViewResumeAdminComponent,
    AdminRecruiterProfileComponent,
    ViewJobComponent,
    IssuesQuestionsComponent,
    PiShortlistedComponent,
    CandidateSignupEducationComponent,
    CandidateSignupPersonalComponent,
    CandidateDashboardComponent,
    CandidateSignupEmploymentComponent,
    CandidateProfileComponent,
    CandidateLoginComponent,
    CandidateSignupTypeComponent,
    CandidateHeaderComponent,
    CandidateForgotPasswordComponent,
    NewHomeComponent,
    TestimonialComponent,
    HugeTalentPoolComponent,
    SearchAndMatchComponent,
    SubscribeComponent,
    TwoStepScreeningProcessComponent,
    RefundPolicyComponent,
    ChangePasswordComponent,
    RecuriterChangePasswordComponent

  ],
  imports: [
    appRouter,
    TagInputModule,
    BrowserModule,
    OrderModule,
    ChartsModule,
    AngularDateTimePickerModule,
    NgAlertModule,
    OrderModule,
    TagInputModule,
    Ng2Timeline,
    NgxPaginationModule,
    CarouselModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    OwlDateTimeModule,
    PdfViewerModule,
    NgxChartsModule,
    MglTimelineModule,
    Ng2CompleterModule,
    Ng5SliderModule,
    OwlNativeDateTimeModule,
    BarRatingModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // HttpClientModule,
    FlatpickrModule.forRoot(),
    NgbModalModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MyDatePickerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-full-width'
    }),
    SocialLoginModule
  ],
  providers: [
    AuthInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
    AuthGuard,
    AdminAuthGuard,
    HomeService,
    LoginService,
    CommonFunctionsService,
    AppService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ChangePasswordComponent,
    RecuriterChangePasswordComponent
  ]
})
export class AppModule {
}
