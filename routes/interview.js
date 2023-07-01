var express = require("express")
var path = require('path');
var router = express.Router();
var interview = require('../ey_module/controllers/interview.js')
const auth = require('./../ey_module/global_vars/auth');
router.put('/confirm_slot/:_id', interview.confirm_slot);                    // confirm time slot by recruiter

router.use(auth);
router.get('/ping', interview.ping);

router.get('/client_job_list/:_id', interview.client_job_list)
router.post('/save_time_slot_job', interview.save_time_slot_job)
router.get('/recruiter_interview_dashboard/:_id', interview.recruiter_interview_dashboard)
router.get('/client_interview_dashboard/:_id', interview.client_interview_dashboard)
router.get('/client_slot_aviable_list/:_id', interview.client_slot_aviable_list)
router.get('/recruiter_calender_list/:_id/:job_id', interview.recruiter_calender_list)

router.put('/reschedule_request/:_id', interview.put_reschedule_request);               // make reschedule request for interview_id from recruiter
router.put('/process_reschedule_request/:_id', interview.process_reschedule_request);   // process requested reschedule request for interview_id from company
router.get('/reschedule_interviews/:company_id', interview.reschedule_interviews);     // get reschedule interviews by company_id
router.get('/reschedule_request/:_id', interview.get_reschedule_request);     // get reschedule request by interview_id

module.exports = router;  
