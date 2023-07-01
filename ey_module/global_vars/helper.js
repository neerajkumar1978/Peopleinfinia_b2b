const fs = require('fs');
const cloudinary = require('cloudinary');

/*
cloudinary.config({
    cloud_name: 'dpijyjulg',
    api_key: '344142488787362',
    api_secret: 'E6textvz7MZkvU4H-zw4L2Ybxmw'
});
*/

cloudinary.config({
  cloud_name: 'dtgvxijvw',
  api_key: '651743287142786',
  api_secret: '9v4R33o5KkDGhcsCSEd_Et4ceKw',
});

let uploadToCloudinary = function(
  resumeFileName,
  resumeFileNameWithPath,
  binaryData
) {
  return new Promise((resolve, reject) => {
    fs.writeFile(resumeFileNameWithPath, binaryData, 'binary', function(err) {
      if (err) {
        console.log("error cloud",err)
        // console.log('fs.writeFile error: ', err);
        reject(new Error('fs.writeFile error'));
      }
      let filePath = resumeFileNameWithPath.replace(
        '/var/www/html/pi/',
        // 'https://cdn.peopleinfinia.com/'
        'http://b2b.peopleinfinia.in:8080/pi/'
      );
      resolve(filePath);

      // As cloudinary version we are using does not support doc and docs format. So we stopped using cloudinary in candidate module.
      /*
          cloudinary.uploader.upload(resumeFileNameWithPath, async function (result) {
            // console.log("result------>> " + JSON.stringify(result));
            resolve(result.url);
          }, { public_id: resumeFileName});
          */
    });
  });
};

module.exports = uploadToCloudinary;
