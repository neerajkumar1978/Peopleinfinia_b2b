var SparkPost = require('sparkpost');
var config = require('./config.js');
var client = new SparkPost(config.sparkPostApiKey);

module.exports = {
  send: function(from_, to_, subject_, message_, bcc_) {
    // from_="no-reply@senzecit.com"
    // console.log("from_---", from_)
    // console.log("subject_---", subject_)
    // console.log("message_---", message_)

    return new Promise(function(resolve, reject) {
      client.transmissions
        .send({
          options: {
            sandbox: false,
          },
          content: {
            from: from_,
            subject: subject_,
            html: message_,
          },
          recipients: [
            { address: to_ },
            {
              address: {
                email: bcc_,
                header_to: to_,
              },
            },
          ],
        })
        .then(data => {
          console.log('data', data);
          resolve({ status: true });
        })
        .catch(err => {
          console.log('err----', err);
          resolve({ status: false });
        });
    });
  },

  mailer_header: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
    <!--[if gte mso 9]><xml>
     <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
     </o:OfficeDocumentSettings>
    </xml><![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <title></title>
    <!--[if !mso]><!-- -->
	<link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
	<!--<![endif]-->
  <style type="text/css" id="media-query">
body{margin:0;padding:0}table,td,tr{vertical-align:top;border-collapse:collapse}.ie-browser table,.mso-container table{table-layout:fixed}*{line-height:inherit}a[x-apple-data-detectors=true]{color:inherit!important;text-decoration:none!important}[owa] .img-container button,[owa] .img-container div{display:block!important}[owa] .fullwidth button{width:100%!important}[owa] .block-grid .col{display:table-cell;float:none!important;vertical-align:top}.ie-browser .block-grid,.ie-browser .num12,[owa] .block-grid,[owa] .num12{width:605px!important}.ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td{line-height:100%}.ie-browser .mixed-two-up .num4,[owa] .mixed-two-up .num4{width:200px!important}.ie-browser .mixed-two-up .num8,[owa] .mixed-two-up .num8{width:400px!important}.ie-browser .block-grid.two-up .col,[owa] .block-grid.two-up .col{width:302px!important}.ie-browser .block-grid.three-up .col,[owa] .block-grid.three-up .col{width:201px!important}.ie-browser .block-grid.four-up .col,[owa] .block-grid.four-up .col{width:151px!important}.ie-browser .block-grid.five-up .col,[owa] .block-grid.five-up .col{width:121px!important}.ie-browser .block-grid.six-up .col,[owa] .block-grid.six-up .col{width:100px!important}.ie-browser .block-grid.seven-up .col,[owa] .block-grid.seven-up .col{width:86px!important}.ie-browser .block-grid.eight-up .col,[owa] .block-grid.eight-up .col{width:75px!important}.ie-browser .block-grid.nine-up .col,[owa] .block-grid.nine-up .col{width:67px!important}.ie-browser .block-grid.ten-up .col,[owa] .block-grid.ten-up .col{width:60px!important}.ie-browser .block-grid.eleven-up .col,[owa] .block-grid.eleven-up .col{width:55px!important}.ie-browser .block-grid.twelve-up .col,[owa] .block-grid.twelve-up .col{width:50px!important}@media only screen and (min-width:625px){.block-grid,.block-grid .col.num12{width:605px!important}.block-grid .col{vertical-align:top}.block-grid.mixed-two-up .col.num4{width:200px!important}.block-grid.mixed-two-up .col.num8{width:400px!important}.block-grid.two-up .col{width:302px!important}.block-grid.three-up .col{width:201px!important}.block-grid.four-up .col{width:151px!important}.block-grid.five-up .col{width:121px!important}.block-grid.six-up .col{width:100px!important}.block-grid.seven-up .col{width:86px!important}.block-grid.eight-up .col{width:75px!important}.block-grid.nine-up .col{width:67px!important}.block-grid.ten-up .col{width:60px!important}.block-grid.eleven-up .col{width:55px!important}.block-grid.twelve-up .col{width:50px!important}}@media (max-width:625px){.block-grid,.col,img.fullwidth,img.fullwidthOnMobile{max-width:100%!important}.block-grid,.col{min-width:320px!important;display:block!important}.block-grid{width:calc(100% - 40px)!important}.col{width:100%!important}.col>div{margin:0 auto}.no-stack .col{min-width:0!important;display:table-cell!important}.no-stack.two-up .col{width:50%!important}.no-stack.mixed-two-up .col.num4{width:33%!important}.no-stack.mixed-two-up .col.num8{width:66%!important}.no-stack.three-up .col.num4{width:33%!important}.no-stack.four-up .col.num3{width:25%!important}.mobile_hide{min-height:0;max-height:0;max-width:0;display:none;overflow:hidden;font-size:0}}
  </style>
</head>
<body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #FFFFFF">
  <style type="text/css" id="media-query-bodytag">
    @media (max-width:520px){.block-grid,.col,img.fullwidth,img.fullwidthOnMobile{max-width:100%!important}.block-grid,.col{min-width:320px!important;width:100%!important;display:block!important}.col>div{margin:0 auto}.no-stack .col{min-width:0!important;display:table-cell!important}.no-stack.two-up .col{width:50%!important}.no-stack.mixed-two-up .col.num4{width:33%!important}.no-stack.mixed-two-up .col.num8{width:66%!important}.no-stack.three-up .col.num4{width:33%!important}.no-stack.four-up .col.num3{width:25%!important}.mobile_hide{min-height:0!important;max-height:0!important;max-width:0!important;display:none!important;overflow:hidden!important;font-size:0!important}}
  </style>
  <!--[if IE]><div class="ie-browser"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #FFFFFF;width: 100%" cellpadding="0" cellspacing="0">
	<tbody>
	<tr style="vertical-align: top">
		<td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">

    <!-- header starts -->
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #FFFFFF;"><![endif]-->
    <div style="background-color:#0db655;">
      <div style="Margin: 0 auto;min-width: 320px;max-width: 605px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:#0db655;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 605px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
              <!--[if (mso)|(IE)]><td align="center" width="605" style=" width:605px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
            <div class="col num12" style="min-width: 320px;max-width: 605px;display: table-cell;vertical-align: top;">
              <div style="background-color: transparent; width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                  <tbody>
                      <tr style="vertical-align: top">
                          <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 20px;padding-left: 20px;padding-top: 20px;padding-bottom: 20px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                              <table class="divider_content" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                  <tbody>
                                      <tr style="vertical-align: top">
                                          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                              <span></span>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                  </tbody>
              </table>
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
	</div>
	<!-- header over -->
	`,

  mailer_footer: `<!-- footer starts -->
    <div style="background-color:transparent;">
      <div style="Margin: 0 auto;min-width: 320px;max-width: 605px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid mixed-two-up ">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 605px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
              <!--[if (mso)|(IE)]><td align="center" width="403" style=" width:403px; padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:15px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
            <div class="col num8" style="display: table-cell;vertical-align: top;min-width: 320px;max-width: 400px;">
              <div style="background-color: transparent; width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:15px; padding-bottom:15px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
                    <div class="">
                      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
                      <div style="color:#8F8F8F;font-family:'Open Sans', Helvetica, Arial, sans-serif;line-height:120%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">
                      	<div style="font-size:12px;line-height:14px;color:#8F8F8F;font-family:'Open Sans', Helvetica, Arial, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><span style="font-size: 11px; line-height: 13px;">Copyright © 2019 <a style="color:#8F8F8F;text-decoration: underline;" href="https://peopleinfinia.com" target="_blank" rel="noopener">peopleinfinia.com</a>, All rights reserved. </span><br><span style="font-size: 11px; line-height: 13px;">You subscribed to our newsletter via our website, <a style="color:#8F8F8F;text-decoration: underline;" href="https://peopleinfinia.com" target="_blank" rel="noopener">peopleinfinia.com</a></span></p></div>
                      </div>
                      <!--[if mso]></td></tr></table><![endif]-->
                    </div>
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
              <!--[if (mso)|(IE)]></td><td align="center" width="202" style=" width:202px; padding-right: 10px; padding-left: 10px; padding-top:15px; padding-bottom:15px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
            <div class="col num4" style="display: table-cell;vertical-align: top;max-width: 320px;min-width: 200px;">
              <div style="background-color: transparent; width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:15px; padding-bottom:15px; padding-right: 10px; padding-left: 10px;"><!--<![endif]-->
<div align="right" style="padding-right: 10px; padding-left: 10px; padding-bottom: 10px;" class="">
  <div style="line-height:10px;font-size:1px">&#160;</div>
  <div style="display: table; max-width:156px;">
  <!--[if (mso)|(IE)]><table width="136" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse; padding-right: 10px; padding-left: 10px; padding-bottom: 10px;"  align="right"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:136px;"><tr><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://www.facebook.com/pg/Peopleinfinia-AI-HR-Solutions-356687521570650/posts/" title="Facebook" target="_blank">
          <img src="http://b2b.peopleinfinia.in/assets/img/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      <div style="line-height:5px;font-size:1px">&#160;</div>
      </td></tr>
    </tbody></table>
      <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 5px;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 5px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://twitter.com/InfiniaPeople" title="Twitter" target="_blank">
          <img src="http://b2b.peopleinfinia.in/assets/img/twitter.png" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      <div style="line-height:5px;font-size:1px">&#160;</div>
      </td></tr>
    </tbody></table>
      <!--[if (mso)|(IE)]></td><td width="32" style="width:32px; padding-right: 0;" valign="top"><![endif]-->
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;Margin-right: 0">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="https://www.linkedin.com/company/people-infinia-marketplace-for-top-notch-resources/" title="LinkedIn" target="_blank">
          <img src="http://b2b.peopleinfinia.in/assets/img/linkedin.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      <div style="line-height:5px;font-size:1px">&#160;</div>
      </td></tr>
    </tbody></table>
    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
  </div>
</div>
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
   <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    <!-- footer over -->
		</td>
  </tr>
  </tbody>
  </table>
  <!--[if (mso)|(IE)]></div><![endif]-->
</body>
</html>`,

  /*
	getVerificationMailHtml: function (firstName, email_id) {
		return '<div style="margin: 25px;"><p>Dear ' + firstName + ',<br><br>It is my pleasure to Welcome you to People Infinia, India’s first of its kind AI enabled market place for consultants and one stop shop for all your talent need. Looking forward to fruitful association. Please, click on the link provided below to complete your email verification.</p><h2><a href="http://peopleinfinia.com/user/account_verification/' + email_id + '">Click Here to Activate Account</a></h2><div>Let’s get started with these simple steps:<br><ul><li>Post your requirement</li><li>Shortlist consultants basis the proposals received</li><li>Begin your engagement</li></ul></div></p></div>';
	},
	*/ getApplicantVerificationMailHtml: function(
    firstName,
    _id
  ) {
    return `${this.mailer_header}
		<!-- Main working area starts -->
    <div style="background-color:#f3f3f3;">
      <div style="Margin: 0 auto;min-width: 320px;max-width: 605px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:#f3f3f3;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 605px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
              <!--[if (mso)|(IE)]><td align="center" width="605" style="background-color:#FFFFFF; width:605px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
            <div class="col num12" style="min-width: 320px;max-width: 605px;display: table-cell;vertical-align: top;">
              <div style="background-color: #FFFFFF; width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                  <tbody>
                      <tr style="vertical-align: top">
                          <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 5px;padding-left: 5px;padding-top: 5px;padding-bottom: 5px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                              <table class="divider_content" height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                  <tbody>
                                      <tr style="vertical-align: top">
                                          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                              <span>&#160;</span>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                  </tbody>
              </table>

              <div align="center" class="img-container center fixedwidth" style="padding-right: 0px;  padding-left: 0px;">
              <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
                <img class="center fixedwidth" align="center" border="0" src="https://b2b.peopleinfinia.in/assets/img/logo.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 332.75px" width="332.75">
              <!--[if mso]></td></tr></table><![endif]-->
              </div>
              <div class="">
              	<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 30px; padding-bottom: 5px;"><![endif]-->
              	<div style="color:#134C75;font-family:'Bitter', Georgia, Times, 'Times New Roman', serif;line-height:120%; padding-right: 30px; padding-left: 30px; padding-top: 30px; padding-bottom: 5px;">
              		<div style="font-size:12px;line-height:14px;font-family:Bitter, Georgia, Times, 'Times New Roman', serif;color:#134C75;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px;text-align: center"><span style="font-size: 24px; line-height: 28px;"><strong>Dear ${firstName}</strong></span></p></div>
              	</div>
              	<!--[if mso]></td></tr></table><![endif]-->
              </div>
              <div class="">
              	<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 5px; padding-bottom: 20px;"><![endif]-->
              	<div style="color:#7E7E7E;font-family:'Open Sans', Helvetica, Arial, sans-serif;line-height:150%; padding-right: 30px; padding-left: 30px; padding-top: 5px; padding-bottom: 20px;">
              		<div style="font-size:12px;line-height:18px;color:#7E7E7E;font-family:'Open Sans', Helvetica, Arial, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">It is my pleasure to Welcome you to People Infinia, Indias first of its kind AI enabled market place for consultants and one stop shop for all your talent need. Looking forward to fruitful association. </p></div>
              	</div>
              	<!--[if mso]></td></tr></table><![endif]-->
              </div>

              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                  <tbody>
                      <tr style="vertical-align: top">
                          <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 20px;padding-bottom: 10px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                              <table class="divider_content" height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                  <tbody>
                                      <tr style="vertical-align: top">
                                          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                              <span>&#160;</span>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                  </tbody>
              </table>
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    <!-- Main working area over -->

    <!-- additional starts -->

	<!-- additional over -->
	${this.mailer_footer}
	`;
  },
  getVerificationMailHtml: function(firstName, _id) {
    return `${this.mailer_header}
		<!-- Main working area starts -->
    <div style="background-color:#f3f3f3;">
      <div style="Margin: 0 auto;min-width: 320px;max-width: 605px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:#f3f3f3;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 605px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
              <!--[if (mso)|(IE)]><td align="center" width="605" style="background-color:#FFFFFF; width:605px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
            <div class="col num12" style="min-width: 320px;max-width: 605px;display: table-cell;vertical-align: top;">
              <div style="background-color: #FFFFFF; width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                  <tbody>
                      <tr style="vertical-align: top">
                          <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 5px;padding-left: 5px;padding-top: 5px;padding-bottom: 5px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                              <table class="divider_content" height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                  <tbody>
                                      <tr style="vertical-align: top">
                                          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                              <span>&#160;</span>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                  </tbody>
              </table>
              <div align="center" class="img-container center fixedwidth" style="padding-right: 0px;  padding-left: 0px;">
              <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
                <img class="center fixedwidth" align="center" border="0" src="https://peopleinfinia.in/assets/img/logo.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 332.75px" width="332.75">
              <!--[if mso]></td></tr></table><![endif]-->
              </div>
              <div class="">
              	<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 30px; padding-bottom: 5px;"><![endif]-->
              	<div style="color:#134C75;font-family:'Bitter', Georgia, Times, 'Times New Roman', serif;line-height:120%; padding-right: 30px; padding-left: 30px; padding-top: 30px; padding-bottom: 5px;">
              		<div style="font-size:12px;line-height:14px;font-family:Bitter, Georgia, Times, 'Times New Roman', serif;color:#134C75;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px;text-align: center"><span style="font-size: 24px; line-height: 28px;"><strong>Dear ${firstName}</strong></span></p></div>
              	</div>
              	<!--[if mso]></td></tr></table><![endif]-->
              </div>
              <div class="">
              	<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 5px; padding-bottom: 20px;"><![endif]-->
              	<div style="color:#7E7E7E;font-family:'Open Sans', Helvetica, Arial, sans-serif;line-height:150%; padding-right: 30px; padding-left: 30px; padding-top: 5px; padding-bottom: 20px;">
              		<div style="font-size:12px;line-height:18px;color:#7E7E7E;font-family:'Open Sans', Helvetica, Arial, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">It is our Pleasure to Welcome you to People Infinia, India’s most sophisticated of its kind AI enabled marketplace for Corporates and one stop shop for all your talent need. Looking forward to fruitful association. Please, click on the link provided below to complete your email verification.</p></div>
              	</div>
              	<!--[if mso]></td></tr></table><![endif]-->
              </div>
              <div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;">
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://b2b.peopleinfinia.in/user/account_verification/${_id}" style="height:31pt; v-text-anchor:middle; width:207pt;" arcsize="58%" strokecolor="#49a6e8" fillcolor="#49a6e8"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:16px;"><![endif]-->
                  <a href="http://b2b.peopleinfinia.in/user/account_verification/${_id}" target="_blank" style="display: block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #ffffff; background-color: #49a6e8; border-radius: 24px; -webkit-border-radius: 24px; -moz-border-radius: 24px; max-width: 277px; width: 227px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 5px; padding-right: 25px; padding-bottom: 5px; padding-left: 25px; font-family: 'Open Sans', Helvetica, Arial, sans-serif;mso-border-alt: none">
                    <span style="font-family:'Open Sans', Helvetica, Arial, sans-serif;font-size:16px;line-height:32px;">Click Here to Activate Account</span>
                  </a>
                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
              </div>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                  <tbody>
                      <tr style="vertical-align: top">
                          <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 20px;padding-bottom: 10px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                              <table class="divider_content" height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                  <tbody>
                                      <tr style="vertical-align: top">
                                          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                              <span>&#160;</span>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                  </tbody>
              </table>
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    <br><br>Thanks, and Stay Blessed!<br><br>-Team People Infinia
    <br>
    <br>

    <div>
<p>प्रिय, ${firstName}</p>

<br>
<p>
पीपल इनफिनिया में आपका स्वागत करते हुए मुझे खुशी हो रही है, सलाहकारों के लिए भारत का अपनी तरह का पहला एआई सक्षम मार्केट प्लेस और आपकी सभी प्रतिभाओं की जरूरत के लिए वन स्टॉप शॉप। फलदायी जुड़ाव 
की प्रतीक्षा में। कृपया अपना ईमेल सत्यापन पूरा करने के लिए नीचे दिए गए लिंक पर क्लिक करें।
</p>




<div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;">
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://b2b.peopleinfinia.in/user/account_verification/${_id}" style="height:31pt; v-text-anchor:middle; width:207pt;" arcsize="58%" strokecolor="#49a6e8" fillcolor="#49a6e8"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:16px;"><![endif]-->
  <a href="http://b2b.peopleinfinia.in/user/account_verification/${_id}" target="_blank" style="display: block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #ffffff; background-color: #49a6e8; border-radius: 24px; -webkit-border-radius: 24px; -moz-border-radius: 24px; max-width: 277px; width: 227px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 5px; padding-right: 25px; padding-bottom: 5px; padding-left: 25px; font-family: 'Open Sans', Helvetica, Arial, sans-serif;mso-border-alt: none">
    <span style="font-family:'Open Sans', Helvetica, Arial, sans-serif;font-size:16px;line-height:32px;">Click Here to Activate Account</span>
  </a>
<!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
</div>


<p>धन्यवाद, </p>
<br>
<p>-टीम पीपल इन्फिनिया </p>
</div>
    <!-- Main working area over -->

    <!-- additional starts -->

	<!-- additional over -->
	${this.mailer_footer}
	`;
  },
  getVerificationMailHtmlFree: function(firstName, _id) {
    return `${this.mailer_header}
		<!-- Main working area starts -->
    <div style="background-color:#f3f3f3;">
      <div style="Margin: 0 auto;min-width: 320px;max-width: 605px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:#f3f3f3;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 605px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
              <!--[if (mso)|(IE)]><td align="center" width="605" style="background-color:#FFFFFF; width:605px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
            <div class="col num12" style="min-width: 320px;max-width: 605px;display: table-cell;vertical-align: top;">
              <div style="background-color: #FFFFFF; width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                  <tbody>
                      <tr style="vertical-align: top">
                          <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 5px;padding-left: 5px;padding-top: 5px;padding-bottom: 5px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                              <table class="divider_content" height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                  <tbody>
                                      <tr style="vertical-align: top">
                                          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                              <span>&#160;</span>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                  </tbody>
              </table>
              <div align="center" class="img-container center fixedwidth" style="padding-right: 0px;  padding-left: 0px;">
              <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px;line-height:0px;"><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
                <img class="center fixedwidth" align="center" border="0" src="https://peopleinfinia.in/assets/img/logo.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 332.75px" width="332.75">
              <!--[if mso]></td></tr></table><![endif]-->
              </div>
              <div class="">
              	<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 30px; padding-bottom: 5px;"><![endif]-->
              	<div style="color:#134C75;font-family:'Bitter', Georgia, Times, 'Times New Roman', serif;line-height:120%; padding-right: 30px; padding-left: 30px; padding-top: 30px; padding-bottom: 5px;">
              		<div style="font-size:12px;line-height:14px;font-family:Bitter, Georgia, Times, 'Times New Roman', serif;color:#134C75;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px;text-align: center"><span style="font-size: 24px; line-height: 28px;"><strong>Dear ${firstName}</strong></span></p></div>
              	</div>
              	<!--[if mso]></td></tr></table><![endif]-->
              </div>
              <div class="">
              	<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 5px; padding-bottom: 20px;"><![endif]-->
              	<div style="color:#7E7E7E;font-family:'Open Sans', Helvetica, Arial, sans-serif;line-height:150%; padding-right: 30px; padding-left: 30px; padding-top: 5px; padding-bottom: 20px;">
              		<div style="font-size:12px;line-height:18px;color:#7E7E7E;font-family:'Open Sans', Helvetica, Arial, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center">It is my pleasure to Welcome you to People Infinia, Indias first of its kind AI enabled market place for consultants and one stop shop for all your talent need. Looking forward to fruitful association. Please, click on the link provided below to complete your email verification.</p></div>
              	</div>
              	<!--[if mso]></td></tr></table><![endif]-->
              </div>
              <div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;">
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://b2b.peopleinfinia.in/user/account_verification/${_id}" style="height:31pt; v-text-anchor:middle; width:207pt;" arcsize="58%" strokecolor="#49a6e8" fillcolor="#49a6e8"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:16px;"><![endif]-->
                  <a href="http://b2b.peopleinfinia.in/freelance/account_verification/${_id}" target="_blank" style="display: block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #ffffff; background-color: #49a6e8; border-radius: 24px; -webkit-border-radius: 24px; -moz-border-radius: 24px; max-width: 277px; width: 227px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 5px; padding-right: 25px; padding-bottom: 5px; padding-left: 25px; font-family: 'Open Sans', Helvetica, Arial, sans-serif;mso-border-alt: none">
                    <span style="font-family:'Open Sans', Helvetica, Arial, sans-serif;font-size:16px;line-height:32px;">Click Here to Activate Account</span>
                  </a>
                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
              </div>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                  <tbody>
                      <tr style="vertical-align: top">
                          <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 20px;padding-bottom: 10px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                              <table class="divider_content" height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                  <tbody>
                                      <tr style="vertical-align: top">
                                          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                              <span>&#160;</span>
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                  </tbody>
              </table>
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    <br><br>Thanks, and Stay Blessed!<br><br>-Team People Infinia
    <br>
    <br>

    <div>
<p>प्रिय, ${firstName}</p>

<br>
<p>
पीपल इनफिनिया में आपका स्वागत करते हुए मुझे खुशी हो रही है, सलाहकारों के लिए भारत का अपनी तरह का पहला एआई सक्षम मार्केट प्लेस और आपकी सभी प्रतिभाओं की जरूरत के लिए वन स्टॉप शॉप। फलदायी जुड़ाव 
की प्रतीक्षा में। कृपया अपना ईमेल सत्यापन पूरा करने के लिए नीचे दिए गए लिंक पर क्लिक करें।
</p>




<div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;">
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://b2b.peopleinfinia.in/user/account_verification/${_id}" style="height:31pt; v-text-anchor:middle; width:207pt;" arcsize="58%" strokecolor="#49a6e8" fillcolor="#49a6e8"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:16px;"><![endif]-->
  <a href="http://b2b.peopleinfinia.in/user/account_verification/${_id}" target="_blank" style="display: block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #ffffff; background-color: #49a6e8; border-radius: 24px; -webkit-border-radius: 24px; -moz-border-radius: 24px; max-width: 277px; width: 227px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 5px; padding-right: 25px; padding-bottom: 5px; padding-left: 25px; font-family: 'Open Sans', Helvetica, Arial, sans-serif;mso-border-alt: none">
    <span style="font-family:'Open Sans', Helvetica, Arial, sans-serif;font-size:16px;line-height:32px;">Click Here to Activate Account</span>
  </a>
<!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
</div>


<p>धन्यवाद, </p>
<br>
<p>-टीम पीपल इन्फिनिया </p>
</div>
    <!-- Main working area over -->

    <!-- additional starts -->

	<!-- additional over -->
	${this.mailer_footer}
	`;
  },
  getVerificationMailHtmlCun: function(firstName, _id) {
    return (
      '<p>Hello,' +
      firstName +
      '</p><br><p>It is my pleasure to Welcome you to People Infinia, Indias first of its kind AI enabled market place for Companies & Consultants and one stop shop for all your talent need. Looking forward to fruitful association.  <a href="http://b2b.peopleinfinia.in/user/account_verification/${_id}" target="_blank" style="display: block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #ffffff; background-color: #49a6e8; border-radius: 24px; -webkit-border-radius: 24px; -moz-border-radius: 24px; max-width: 277px; width: 227px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 5px; padding-right: 25px; padding-bottom: 5px; padding-left: 25px;> Please, click on the link provided below to complete your email verification.Thanks,</p><br><p>-Team People Infinia </p>'
    );
  },

  forgetMailHtml: function(firstName, email_id, password) {
    return (
      '<div style="margin: 25px;"><p>Dear ' +
      firstName +
      ',<br><br><p> Thanks for using People Infinia Here is the password of your account <h1>' +
      password +
      '</h1><br><br>Thanks, and Stay Blessed!<br><br>-Team People Infinia' +
      `
      <br>
<br>
<div style="background-color:#fff;">
<p> नमस्ते, ${firstName} </p>
<br>
<p>
पीपुल इनफिनिया का उपयोग करने के लिए धन्यवाद। ये रहा आपके खाते का पासवर्ड
</p>
<h1 >  ${password}  </h1>
<p>  धन्यवाद </p>
<p> -टीम पीपल इन्फिनिया   </p>
</div>
      `
    );
  },

  clientPostHtml: function(firstName, email_id, job_title, vacancy) {
    return (
      '<div style="margin: 25px;"><p>Hey,<br><br><p>' +
      firstName +
      ' has posted a Job Detail for <b>' +
      job_title +
      '</b> and required vacancy is <b>' +
      vacancy +
      ' </b> Please check Full details on People Infinia Admin <br><br>Thanks, and Stay Blessed!<br><br>-Team People Infinia' +

     ` <br> <br> <p>नमस्ते, ${firstName}  </p> <p> अभिवादन!! </p> <p>जेडी अपलोड करने के लिए धन्यवाद। आपको जल्द ही CV’S मिलना शुरू हो जाएगा। </p> <p>धन्यवाद, </p> <p> -टीम पीपल इन्फिनिया </p>  `


    );
  },
sendAdminNotification:function(user_type,name,useremail){
return(
 '<div style="margin: 25px;"><p>Hey,<br><br><p> New user registration on your site <br>   <b>' +'Type : '+
  user_type + '&nbsp;&nbsp; <br> Name :&nbsp;&nbsp; '+   name +  '</b> <br> <b>' + ' Email id : &nbsp;&nbsp; '+ useremail +
  '</b> <br> Activate this account  <br><br>Thanks, and Stay Blessed!<br><br>-Team People Infinia  <br>  '
  

)
},
sendOnboardingUserDetails:function(email,sentMail,mobile,password){
  return(
    '<div style="margin: 25px;"><p>Hey,<br><br><p>  <br>   <b>' +' Mail id: '+
    sentMail + ' Password : '+ password +  '&nbsp;&nbsp; <br> &nbsp;&nbsp; </b> <br> <b>' + '  &nbsp;&nbsp; </b> <br>  <br><br>Thanks, and Stay Blessed!<br><br>-Team People Infinia  <br>  '
     
   
   )
  },
  
  clientreciveJObPostHtml: function(job_title) {
    return (
      '<div style="margin: 25px;"><p>Hey,<br><br><p> Thanks we have received  the JD of position <b>' +
      job_title +
      '</b> you will start receiving the CV’S in next 48 hrs <br><br>Thanks, and Stay Blessed!<br><br>-Team People Infinia'
    );
  },

  slotConfirmedByRecruiter: function(
    candidate_name,
    recruiter,
    job_title,
    interview_date,link
  ) {
    return `<div style="margin: 25px;"><p>Hey,<br/><br/><p>Following interview has been confirmed by recruiter <b>${recruiter.user_name} (${recruiter.user_id}) &nbsp;</b>.<br/><br/>
		<b>Job Title:</b> ${job_title}<br /> <b>Candidate:</b> ${candidate_name}<br /> <b>Interview Date:</b> ${interview_date} ,  the interview will be conducted through ${link}</p>
		<br/><br/>Thanks, and Stay Blessed !<br />- Team People Infinia</p>`;
  },
  CandidateShortlistedforAdmin: function(company_name,job_title,postDate,cv) {
    return ` <table cellpadding="0" cellspacing="0" border="0" width="640px" style="margin: 0px auto;">
    <tbody>
        <tr>
            <td align="center">
            <img class="center fixedwidth" align="center" border="0" src="https://b2b.peopleinfinia.in/assets/img/logo.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 332.75px" width="332.75">

            <!--   <img src="https://b2b.peopleinfinia.in/assets/img/logo.png
https://b2b.peopleinfinia.in/assets/img/logo.png
" width="300px" style="margin: 20px 0px;">  -->
            </td>
        </tr>
        <tr>
            <td align="center"><h3 style="font-size: 28px; padding: 5px 20px; background: #ef4d3e; display: inline-block; color: #fff; border-radius: 5px; margin: 10px 0px;">Hello</h3></td>
        </tr>
        <tr>
            <td align="center"><p style="padding: 10px 20px; font-size: 16px;">Hello,

              ${company_name}
            <br>
              Hope this email finds you in good health.
              <br>
              We have a match for the job vacancy of ${job_title} posted on ${postDate} .
              Please find attached resume of shortlisted candidate.
              For further actions, please login-to your dashboard on People Infinia 
              <br>
              <div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;">
              <a href="${cv}" target="_blank" style="display: block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #ffffff; background-color: #49a6e8; border-radius: 24px; -webkit-border-radius: 24px; -moz-border-radius: 24px; max-width: 277px; width: 227px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 5px; padding-right: 25px; padding-bottom: 5px; padding-left: 25px; font-family: 'Open Sans', Helvetica, Arial, sans-serif;mso-border-alt: none">
                <span style="font-family:'Open Sans', Helvetica, Arial, sans-serif;font-size:16px;line-height:32px;"> View Cv </span>
              </a>
          </div>
              <br>
              <div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;">
                <a href="https://b2b.peopleinfinia.in/main/login/company" target="_blank" style="display: block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #ffffff; background-color: #49a6e8; border-radius: 24px; -webkit-border-radius: 24px; -moz-border-radius: 24px; max-width: 277px; width: 227px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 5px; padding-right: 25px; padding-bottom: 5px; padding-left: 25px; font-family: 'Open Sans', Helvetica, Arial, sans-serif;mso-border-alt: none">
                  <span style="font-family:'Open Sans', Helvetica, Arial, sans-serif;font-size:16px;line-height:32px;"> Company Login </span>
                </a>
            </div>
           
            Best regards,  </p></td>
        </tr>
        <tr>
            <td align="center"><p style="margin: 0px; padding: 10px 0px; font-size: 18px; font-weight: bold; color: #00a859;">Team People Infinia </p></td>
        </tr>
    </tbody>
</table>`;
  },

  slotRequestByClient: function(
    clientID,
    clientName,
    recruiterName,
    recruiter,
    job,
    candidate,
    interview_date
  ) {
    return `<div style="margin: 25px;"><p>Hey,<br/><br/><p>Company ${recruiterName} ${recruiter} has issued rescheduled request the interview of candidate ${candidate} time period between these dates respectively  ${interview_date} for “${job}“ of  ${clientName} ${clientID} <br/><br/></p>
		<br/><br/>Thanks, and Stay Blessed !<br />- Team People Infinia</p>`;
  },
  slotConfirmedByCompany: function(
    clientID,
    clientName,
    recruiterName,
    recruiter,
    job,
    candidate,
    interview_date,
    location,link
  ) {
    return `<div style="margin: 25px;"><p>Hey,<br/><br/><p>Company ${clientName} ${clientID} has scheduled the interview of candidate ${candidate} on ${interview_date} , ${location} location  for “${job}“ of Recruiter  ${recruiterName} ${recruiter} ,  the interview will be conducted through ${link} <br/><br/></p>
		<br/><br/>Thanks, and Stay Blessed !<br />- Team People Infinia</p>
    <br>
    <p>नमस्ते, </p>
    <p> निम्नलिखित विवरण के अनुसार निम्नलिखित उम्मीदवारों को साक्षात्कार के लिए निर्धारित किया गया है: </p>
    
    <!-- <p> स्थान : </p> -->
    <p> साक्षात्कार का स्थान : ${location} </p>
    <!--<p> संपर्क व्यक्ति : ${candidate} </p> -->
    <p> दिनांक :  ${interview_date} </p>
        <p> उम्मीदवार का नाम</p>
        <p>  ${candidate} </p>
        <p>धन्यवाद, </p>
        <p> कंपनी का नाम  : ${clientName} ${clientID} </p>
    
    `;
  },
  slotREConfirmedByCompany: function(
    clientID,
    clientName,
    recruiterName,
    recruiter,
    job,
    candidate,
    interview_date,
    link
  ) {
    return `<div style="margin: 25px;"><p>Hey,<br/><br/><p>Company ${clientName} ${clientID} has rescheduled the interview of candidate ${candidate} on ${interview_date} for “${job}“ of Recruiter  ${recruiterName} ${recruiter} ,  the interview will be conducted through ${link} <br/><br/></p>
		<br/><br/>Thanks, and Stay Blessed !<br />- Team People Infinia</p>
    
    <br>
    <p>नमस्ते, </p>
    <p> निम्नलिखित विवरण के अनुसार निम्नलिखित उम्मीदवारों को साक्षात्कार के लिए निर्धारित किया गया है: </p>
    
    <!-- <p> स्थान : </p> -->
    <p> साक्षात्कार का स्थान : ${location} </p>
    <!--<p> संपर्क व्यक्ति : ${candidate} </p> -->
    <p> दिनांक :  ${interview_date} </p>
        <p> उम्मीदवार का नाम</p>
        <p>  ${candidate} </p>
        <p>धन्यवाद, </p>
        <p> कंपनी का नाम  : ${clientName} ${clientID} </p>
    
    `;
  },
  ShortListedYourCandidate: function(
    candidateName,
    recruiterName,
    recruiterID,
    companyID,
    compnyName,
    jobTitle
  ) {
    return ` <table cellpadding="0" cellspacing="0" border="0" width="640px" style="margin: 0px auto;">
    <tbody>
        <tr>
            <td align="center">
                <img src="http://b2b.peopleinfinia.in/assets/img/logo.png
http://b2b.peopleinfinia.in/assets/img/logo.png
" width="300px" style="margin: 20px 0px;">
            </td>
        </tr>
        <tr>
            <td align="center"><h3 style="font-size: 28px; padding: 5px 20px; background: #ef4d3e; display: inline-block; color: #fff; border-radius: 5px; margin: 10px 0px;">Hello</h3></td>
        </tr>
        <tr>
            <td align="center"><p style="padding: 10px 20px; font-size: 16px;">Hello,

            Congratulations  ${recruiterName} ${recruiterID}!!

            Your CV/s is/are shortlisted for further processing. We will schedule the interview shortly.

            ${candidateName} candidate is shortlisted for Position ${jobTitle} with ${compnyName} ${companyID}

            Thanks,  </p></td>
        </tr>
        <tr>
            <td align="center"><p style="margin: 0px; padding: 10px 0px; font-size: 18px; font-weight: bold; color: #00a859;">-Team People Infinia </p></td>
        </tr>
    </tbody>
</table>
<br>
<br>
<p>नमस्ते,  ${candidateName}</p>
<p> बधाई हो !! </p>
<p> 
आपका CV/s आगे की प्रक्रिया के लिए शॉर्टलिस्ट किया गया है। हम शीघ्र ही साक्षात्कार का समय निर्धारित करेंगे। ${compnyName} ${companyID}

के साथ  ${jobTitle} पद के लिए चुने गए उम्मीदवारों के नाम निम्नलिखित हैं 
</p>
<p>  धन्यवाद ,</p>
<p> -टीम पीपल इन्फिनिया</p>

`;
  },
  ThankForUploadingCV: function(recruiterName, recruiterID, jobTitle) {
    return ` <table cellpadding="0" cellspacing="0" border="0" width="640px" style="margin: 0px auto;">
    <tbody>
        <tr>
            <td align="center">
                <img src="http://b2b.peopleinfinia.in/assets/img/logo.png
http://b2b.peopleinfinia.in/assets/img/logo.png
" width="300px" style="margin: 20px 0px;">
            </td>
        </tr>
        <tr>
            <td align="center"><h3 style="font-size: 28px; padding: 5px 20px; background: #ef4d3e; display: inline-block; color: #fff; border-radius: 5px; margin: 10px 0px;">Hello</h3></td>
        </tr>
        <tr>
            <td align="center"><p style="padding: 10px 20px; font-size: 16px;">Hello,

            Hello,

            Greetings !!

            Thanks ${recruiterName}, ${recruiterID}  for uploading the CV's against the position ${jobTitle}. We will come back to you shortly with the feedback.

            Thanks,

            -Team People Infinia " </p></td>
        </tr>
        <tr>
            <td align="center"><p style="margin: 0px; padding: 10px 0px; font-size: 18px; font-weight: bold; color: #00a859;">-Team People Infinia </p></td>
        </tr>
    </tbody>
</table>`;
  },
  // singleCvSubmitedByRecruiter: function(){

  // }
};
