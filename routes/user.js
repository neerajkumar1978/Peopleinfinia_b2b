var express = require("express")
var path = require('path');
var router = express.Router();
var user = require('../ey_module/controllers/user')
var onBoard = require('../ey_module/controllers/onboardinguser.js')
var pdms = require('../ey_module/controllers/pmsUsers')
const auth = require('./../ey_module/global_vars/auth');
router.post('/forget_password', user.forget_password);
router.post('/first_signup', user.first_signup);
router.post('/login', user.login);
router.get('/account_verification/:_id', user.account_verification);
router.get('/submit-issue/:_id', user.get_submit_issue);        // get a specific submitted issue (userIssue._id)
router.post('/submit-issue', user.post_submit_issue);    
router.post('/pms_login', pdms.pms_login);
router.post('/pms_forget_password', pdms.pms_forget_password); 
router.use(auth);
router.get('/ping', user.ping);
router.get('/get_profile/:_id', user.get_profile);
router.put('/change_password/:_id', user.change_password);
router.put('/edit_profile/:_id', user.edit_profile);
router.post('/userBulkUpload', user.userBulkUpload);
router.get('/timeline/:_id', user.get_timeline);
router.post('/timeline/:_id', user.post_timeline);
router.post('/verfication_payment', user.verification_payment);
router.get('/resume_viewed/:_id', auth, user.rsume_view);
router.post('/invoice', user.create_invoice);
router.post('/get_order_id', auth, user.get_order_id);

// onboarding
router.post('/OnBoard_user_signup', onBoard.OnBoard_user_signup);
router.post('/sendOnboardingUserDetails', onBoard.sendOnboardingUserDetails);
router.put('/OnBoard_user_edit_profile', onBoard.OnBoard_user_edit_profile);
router.put('/OnBoard_MeetingWithHRedits_profile', onBoard.OnBoard_MeetingWithHRedits_profile);

router.put('/OnBoard_userFiles_edit_profile', onBoard.OnBoard_userFiles_edit_profile);
router.get('/get_onb_user_detail/:_id', onBoard.get_onb_user_detail);
router.get('/get_All_onb_user_detailCorporate/:_id', onBoard.get_All_onb_user_detailCorporate);
router.get('/get_All_onb_user_detail', onBoard.get_All_onb_user_detail);

router.get('/get_All_PMS_user_detailCorporate/:_id', pdms.get_All_pms_user_detailCorporate);
router.post('/PMS_user_signup', pdms.pms_user_signup);
router.put('/PMS_user_edit_profile', pdms.pms_user_edit_profile);
router.get('/get_PMS_user_detail/:_id', pdms.get_pms_user_detail);
router.get('/get_All_PMS_user_detail', pdms.get_All_pms_user_detail);
router.put('/pms_Meeting_Edit_profile', pdms.pms_Meeting_Edit_profile);

router.post('/goalPost', pdms.goalPost);
router.put('/update_Goal/:_id', pdms.update_Goal);

router.put('/pms_change_password/:_id', pdms.pms_change_password);
router.post('/postCources', user.postCources);
router.get('/get_All_corpo_Cources/:_id', user.get_All_corpo_Cources);
router.put('/edit_Cources', user.edit_Cources);
router.get('/get_courcebyId_detail/:_id', user.get_courcebyId_detail);
router.post('/postFeedback', pdms.postFeedback);
router.get('/get_All_corpo_feedbacks/:_id', pdms.get_All_corpo_feedbacks);
router.get('/get_All_corpo_Goals/:_id', pdms.get_All_corpo_Goals);
router.get('/get_All_User_Goals/:_id', pdms.get_All_User_Goals);

router.get('/get_All_postedPerson_feedbacks/:_id', pdms.get_All_postedPerson_feedbacks);
router.get('/get_All_received_feedbacks/:_id', pdms.get_All_received_feedbacks);
router.get('/del_goal/:_id', pdms.del_goal);         // delete a specific submitted issue (userIssue._id)


// get_All_PMS_user_detail  get_All_PMS_user_detailCorporate 
//   get_PMS_user_detail PMS_user_signup PMS_user_edit_profile
router.get('/onping', onBoard.onping);

      // submit a issue

module.exports = router;  
