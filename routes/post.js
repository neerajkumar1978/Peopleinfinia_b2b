var express = require("express")
var path = require('path');
var router = express.Router();
var post = require('../ey_module/controllers/post.js')
const auth = require('./../ey_module/global_vars/auth');

router.get('/get_industry_list', post.get_industry_list);
router.get('/get_function_list', post.get_function_list);
router.post('/readXlsxFileCandidates', post.readXlsxFileCandidates);

router.use(auth);
router.get('/ping', post.ping);

router.post('/client_post', post.client_post);


router.get('/recruiter_view_job/:_id', post.recruiter_view_job);
router.get('/show_recuiter_dashbord_jobs', post.show_recuiter_dashbord_jobs);
router.get('/show_recuiter_dashbord_All_jobs', post.show_recuiter_dashbord_All_jobs);

router.get('/pishortlisted_user', post.pishortlisted_user);
// router.get('/show_recuiter_dashbord_jobs/:_user_id', post.show_recuiter_dashbord_jobs);

router.put('/change_job_post_status/:post_id', post.change_job_post_status);
router.get('/getSkillSuggestion/:text', post.getSkillSuggestion);
router.post('/save_industry', post.save_industry);
router.post('/save_functionalArea', post.save_functionalArea);

router.put('/candidateBulkUpload/:job_id/:_id', post.candidateBulkUpload);
router.get('/client_managae_jobs/:_id', post.client_managae_jobs);
router.put('/edit_post/:_id', post.edit_post);

router.get('/recruiter_all_job_list', post.recruiter_all_job_list);
// router.get('/recruiter_all_job_list/:_user_id', post.recruiter_all_job_list);
router.post('/getUrlOfCandidateCv', post.getUrlOfCandidateCv);

router.get('/consultant_manage_jobs/:_id', post.consultant_manage_jobs);
router.post('/bookmark_post', post.bookmark_post);
router.get('/recruiter_bookmark_job_list/:_id', post.recruiter_bookmark_job_list);
router.get('/client_dasboard_count/:_id', post.client_dasboard_count);
router.get('/recruiter_dasboard_count/:_id', post.recruiter_dasboard_count);
router.post('/client_shortlist_candidate', post.client_shortlist_candidate);
router.put('/upload_candidates_resume/:_id', post.upload_candidates_resume);
router.get('/recruiter_manage_candidate/:_id', post.recruiter_manage_candidate);
router.get('/recruiter_manage_Reject_candidate/:_id', post.recruiter_manage_Reject_candidate);

router.post('/withdraw_candidates', post.withdraw_candidates);
router.get('/client_dashboard_feed/:_id', post.client_dashboard_feed);
router.get('/client_view_resume/:_id/:job_id', post.client_view_resume);
router.get('/fetch_data/:_id/:job_id/:candidate_id', post.fetch_data);
router.get('/client_candidate_list/:_id', post.client_candidate_list);
router.get('/recruiter_company_calender_list/:_id', post.recruiter_company_calender_list);
router.get('/newGetSkillsuggestion', post.newGetSkillsuggestion);
router.get('/view_client_job_response/:_id:/:job_id', post.view_client_job_response);
router.post('/candidate_status_undo', post.candidate_status_undo);

router.get('/showjob/:_id', post.showjob);
router.get('/view_job_status_recruiter/:_id/:job_id', post.view_job_status_recruiter);
router.get('/view_client_job_response/:_id/:job_id', post.view_client_job_response);
router.get('/client_get_job_detail/:_id/:job_id', post.client_get_job_detail);
router.post('/save_draft_post', post.save_draft_post);
router.get('/delete_post/:_id', post.delete_post);
router.put('/replaceResume/:_id', post.replaceResume);
router.get('/getJobStatus/:_id', post.getJobStatus);
router.get('/get_job_Id_detail/:_id', post.get_job_Id_detail);


module.exports = router;
