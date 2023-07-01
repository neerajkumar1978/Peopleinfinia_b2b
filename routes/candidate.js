const express = require('express');
const router = express.Router();
const user = require('../ey_module/controllers/applicant.js')
const auth = require('./../ey_module/global_vars/auth');

// router.get('/ping', user.ping);
// router.post('/forget_password', user.forget_password);
// router.post('/signup', user.signup);
// router.post('/login', user.login);
// router.post('/loginWithGoogle',user.loginWithGoogle);
// router.post('/loginWithFB',user.loginWithFB);
// router.get('/account_verification/:_id', user.account_verification);
// // router.use(auth);
// router.get('/getApplican/:_id', user.getDetails);
// // router.get('/get_profile/:_id', user.get_profile);
// router.put('/change_password/:_id', user.change_password);
router.put('/edit_profile/:_id',auth, user.edit_profile);

// b2c
router.get("/ping", auth, user.ping);
router.post("/signup", user.signup);
router.post("/login", user.login);
router.post("/loginWithGoogle", user.loginWithGoogle);
router.post("/loginWithFB", user.loginWithFB);
router.post("/forget_password", user.forget_password);
router.get("/account_verification/:_id", user.account_verification);
router.get("/getApplican/:_id", auth, user.getDetails);
router.put("/change_password/:_id", auth, user.change_password);
router.put("/edit_profile", auth, user.edit_profile_auth);
router.post("/interview_training",  user.interview_training);
router.post("/VideoAssistance",  user.VideoAssistance);
router.post("/uploadVideoCv",  user.uploadVideoCv);
router.post("/candidateSearch", auth, user.candidateSearch);
router.post('/apply_for_job/:id',auth,user.apply_for_job);
router.get('/applied_jobs/:id',auth,user.all_applied_jobs);
router.post('/get_user_detail',auth, user.get_user_detail)
// b2c




module.exports = router;
