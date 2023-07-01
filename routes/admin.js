var express = require("express")
var path = require('path');
var router = express.Router();
var admin = require('../ey_module/controllers/admin.js');
const auth = require('./../ey_module/global_vars/auth');

router.post('/admin_login', admin.admin_login)
router.get('/issues', admin.get_issues);
router.post('/issues', admin.post_issues);
router.put('/issues/:_id', admin.put_issues);
router.get('/issues/:_id', admin.get_issueByID);
router.put('/user-issues/:_id', admin.put_user_issues);         // update a specific submitted issue (userIssue._id)
router.get('/delete_issues/:_id', admin.delete_issues);         // delete a specific submitted issue (userIssue._id)
// 

router.post('/getCurrentYearDataMonthWise', admin.getCurrentYearDataMonthWise);
router.post('/getCurrentYearDataMonthWiseResumes', admin.getCurrentYearDataMonthWiseResumes);
router.post('/getCurrentYearDataMonthWiseJobs', admin.getCurrentYearDataMonthWiseJobs);
router.post('/findGraphCount', admin.findGraphCount);
router.post('/findGraphJobs', admin.findGraphJobs);
router.post('/findGraphResumes', admin.findGraphResumes);
router.get('/delete_AllUserIsses', admin.delete_AllUserIsses);
router.get('/delete_AllUserResumes', admin.delete_AllUserResumes);
router.get('/delete_AllJobs', admin.delete_AllJobs);
router.get('/delete_AllUsers', admin.delete_AllUsers);
router.get('/user-issues', admin.get_user_issues);    
router.get('/get_profile/:_id', admin.get_profile);
          // get all submitted issues
router.use(auth);
router.get('/ping', admin.ping);
router.get('/admin_full_job_list', admin.admin_full_job_list);
router.get('/admin_manage_user', admin.admin_manage_user);
router.get('/admin_latest_job_list', admin.admin_latest_job_list);
router.get('/admin_All_job_list', admin.admin_All_job_list);

router.get('/admin_dasboard_count', admin.admin_dasboard_count);
router.get('/resdesk_admin', admin.resdesk_admin);
router.get('/get_Job_Id_profile/:_id', admin.get_Job_Id_profile);
router.get('/get_recruiter_jobs/:_id', admin.get_recruiter_jobs);

router.put('/block_user/:_id', admin.block_user);
router.post('/admin_view_resume', admin.admin_view_resume);
router.post('/admin_cv_shortlist', admin.admin_cv_shortlist);

router.post('/admin_cv_undo', admin.admin_cv_undo);

// The functionality is like, system has some predefined set of queries which will be managed by Admin only. And then recuriter or company would be able to raise there issue in respect of these queries. So, admin should be able to add/edit/delete predefined queries.
router.get('/issues', admin.get_issues);
router.post('/issues', admin.post_issues);
router.put('/issues/:_id', admin.put_issues);
router.get('/issues/:_id', admin.get_issueByID);

router.get('/user-issues', admin.get_user_issues);              // get all submitted issues

module.exports = router;
