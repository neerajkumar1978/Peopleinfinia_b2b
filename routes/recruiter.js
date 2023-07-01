var express = require("express")
var router = express.Router();
var recruiter = require('../ey_module/controllers/recruiter')
const auth = require('./../ey_module/global_vars/auth');

router.get('/for_try',recruiter.for_try);
// router.post('/sign_up',recruiter.sign_up);
// router.post('/login',recruiter.login);
router.use(auth);
router.get('/recruiter_dashboard',recruiter.recruiter_dashboard);
// router.post('/job_post',recruiter.post_job);
// router.post('/candidate',candiadate_applied_for_jobpost);
router.get('/all_post_job',recruiter.all_job_posted);
router.delete('/job_post_delete',recruiter.delete_job_post);

module.exports = router;