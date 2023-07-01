import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecruiterDashboardComponent } from './recruiter-dashboard/recruiter-dashboard.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ClientHeaderComponent } from './client-header/client-header.component';
import { RecruiterHeaderComponent } from './recruiter-header/recruiter-header.component';
import { ManageJobsComponent } from './manage-jobs/manage-jobs.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { SupportIssueComponent } from './support-issue/support-issue.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { EditJobsComponent } from './edit-jobs/edit-jobs.component';
import { PostNewJobComponent } from './post-new-job/post-new-job.component';
import { ReqJobProposalComponent } from './req-job-proposal/req-job-proposal.component';
import { ViewResponseComponent } from './view-response/view-response.component';
import { AllSendProposalComponent } from './all-send-proposal/all-send-proposal.component';
import { RecruiterProfileComponent } from './recruiter-profile/recruiter-profile.component';
import { ViewProposalComponent } from './view-proposal/view-proposal.component';
import { CandidateRecuiterComponent } from './candidate-recuiter/candidate-recuiter.component';
import { RecuiterManageJobsComponent } from './recuiter-manage-jobs/recuiter-manage-jobs.component';
import { RecruiterScheduleComponent } from './recruiter-schedule/recruiter-schedule.component';
import { ViewResumeComponent } from './view-resume/view-resume.component';
import { JobStatsComponent } from './job-stats/job-stats.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { FaqComponent } from './faq/faq.component';
import { RecruiterSignUpComponent } from './recruiter-sign-up/recruiter-sign-up.component';

// candidate
import { CandidateComponent } from './candidate/candidate.component';
import { CandidateSignupComponent } from './candidate-signup/candidate-signup.component';
import { CandidateSignupPersonalComponent } from './candidate-signup-personal/candidate-signup-personal.component';
import { CandidateSignupEducationComponent } from './candidate-signup-education/candidate-signup-education.component';
import { CandidateSignupEmploymentComponent } from './candidate-signup-employment/candidate-signup-employment.component';
import { CandidateDashboardComponent } from './candidate-dashboard/candidate-dashboard.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { CandidateLoginComponent } from './candidate-login/candidate-login.component';

//admin
import { HeaderComponent } from './admin/header/header.component';
import { OverviewComponent } from './admin/overview/overview.component';
import { LeadsComponent } from './admin/leads/leads.component';
import { AdminManageJobsComponent } from './admin/manage-jobs/admin-manage-jobs.component';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { IssueComponent } from './admin/issue/issue.component';
import { ResdeckComponent } from './admin/resdeck/resdeck.component';
import { ProfileReportComponent } from './admin/profile-report/profile-report.component';
import { ResumePdfComponent } from './admin/resume-pdf/resume-pdf.component';
import { ViewStatusComponent } from './admin/view-status/view-status.component';
import { UserProfileComponent } from './admin/user-profile/user-profile.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ViewResumeAdminComponent } from './admin/view-resume-admin/view-resume-admin.component';
import { AdminRecruiterProfileComponent } from './admin/admin-recruiter-profile/admin-recruiter-profile.component';
import { ViewJobComponent } from './admin/view-job/view-job.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ClientprofileComponent } from './clientprofile/clientprofile.component';
import { IssuesQuestionsComponent } from './admin/issues-questions/issues-questions.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AuthGuard, AdminAuthGuard } from './guards/index';
import { PiShortlistedComponent } from './pi-shortlisted/pi-shortlisted.component';
import { CandidateSignupTypeComponent } from './candidate-signup-type/candidate-signup-type.component';
import { CandidateHeaderComponent } from './candidate-header/candidate-header.component';
import { NewHomeComponent } from './new-home/new-home.component';
import { HugeTalentPoolComponent } from './huge-talent-pool/huge-talent-pool.component';
import { SearchAndMatchComponent } from './search-and-match/search-and-match.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { TwoStepScreeningProcessComponent } from './two-step-screening-process/two-step-screening-process.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import {ChangePasswordComponent} from './app/change-password/change-password.component';
import {RecuriterChangePasswordComponent} from './app/recuriter-change-password/recuriter-change-password.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  {
    path: 'admin-home',
    component: HeaderComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'manageUser',
        component: ManageUserComponent,
        canActivate: [AuthGuard],
      },
      { path: 'leads', component: LeadsComponent, canActivate: [AuthGuard] },
      {
        path: 'manageJobs',
        component: AdminManageJobsComponent,
        canActivate: [AuthGuard],
      },
      { path: 'issue', component: IssueComponent, canActivate: [AuthGuard] },
      {
        path: 'resdesk',
        component: ResdeckComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profilereport/:id',
        component: ProfileReportComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'resumepdf',
        component: ResumePdfComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewstatus',
        component: ViewStatusComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'userprofile/:id',
        component: UserProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewResume/:id',
        component: ViewResumeAdminComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'recruiterProfile/:id',
        component: AdminRecruiterProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewJob/:id',
        component: ViewJobComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin_issues',
        component: IssuesQuestionsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'recruiterSignUp', component: RecruiterSignUpComponent },
  {
    path: 'viewResume/:id',
    component: ViewResumeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'main',
    component: MainHeaderComponent,
    children: [
      { path: 'home', component: NewHomeComponent },
      { path: 'partners', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'terms', component: TermsComponent },
      { path: 'contactus', component: ContactUsComponent },
      { path: 'refundpolicy', component: RefundPolicyComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'login/:id', component: LoginComponent },
      { path: 'hugetalentpool', component: HugeTalentPoolComponent },
      { path: 'searchandmatch', component: SearchAndMatchComponent },
      { path: 'subscribe', component: SubscribeComponent },
      { path: 'twostepscreen', component: TwoStepScreeningProcessComponent }

    ],
  },
  {
    path: 'candidate',
    component: CandidateComponent,
    children: [
      {
        path: 'signup',
        component: CandidateSignupComponent,
        children: [
          { path: 'type', component: CandidateSignupTypeComponent },
          { path: 'personal', component: CandidateSignupPersonalComponent },
        ],
      },
      { path: 'login', component: CandidateLoginComponent },
    ],
  },
  {
    path: 'candidateHeader',
    component: CandidateHeaderComponent,
    children: [
      {
        path: 'signup/education/:id',
        component: CandidateSignupEducationComponent,
      },
      {
        path: 'signup/employment/:id',
        component: CandidateSignupEmploymentComponent,
      },
      {
        path: 'profile',
        component: CandidateProfileComponent,
        canActivate: [AuthGuard],
      },
      { path: 'dashboard', component: CandidateDashboardComponent },
    ],
  },
  {
    path: 'clientHeader',
    component: ClientHeaderComponent,
    children: [
      {
        path: 'schedule/:jobId/:id',
        component: ScheduleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'clientDashboard',
        component: ClientDashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'manageJobs',
        component: ManageJobsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'candidates',
        component: CandidatesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'subscribe',
        component: SubscribeComponent,
        canActivate: [AuthGuard],
      },
      
      {
        path: 'supportIssue',
        component: SupportIssueComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: ClientprofileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
        canActivate: [AuthGuard],
      },
      
      {
        path: 'schedule/:id',
        component: ScheduleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'postNewJob',
        component: PostNewJobComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ReqJobProposal',
        component: ReqJobProposalComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewResponse/:id',
        component: ViewResponseComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-jobs/:jobId',
        component: EditJobsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'PiShortListed',
    component: PiShortlistedComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'recruiterHeader',
    component: RecruiterHeaderComponent,
    children: [
      {
        path: 'recuiterDashboard',
        component: RecruiterDashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'sendProposal',
        component: AllSendProposalComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ViewProposal/:id',
        component: ViewProposalComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'candidateRecuiter',
        component: CandidateRecuiterComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'recuiterManageJobs',
        component: RecuiterManageJobsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'supportIssue',
        component: SupportIssueComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'recruiterSchedule',
        component: RecruiterScheduleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'jobStats/:id',
        component: JobStatsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'recruiterProfile',
    component: RecruiterProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'recuriter-changePassword',
    component: RecuriterChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/main/home', pathMatch: 'full' },


];

export const appRouter: ModuleWithProviders = RouterModule.forRoot(routes);
