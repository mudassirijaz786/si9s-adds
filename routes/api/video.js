const { Video, validate } = require("../../models/Video");
const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/verifyJwtToken");
const jwt = require("jsonwebtoken");
const NodeGeocoder = require("node-geocoder");

const AWS = require("aws-sdk");
const Busboy = require("busboy");

const BUCKET_NAME = "si9s-videos";
const IAM_USER_KEY = "AKIAJRP33KBZB2GN4POA";
const IAM_USER_SECRET = "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";
urlofvideo = "";
console.log("global variable urlofvideo", urlofvideo);
function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function() {
    var params = {
      Bucket: BUCKET_NAME,
      Key: file.name["name"],
      Body: file.name["data"]
    };

    console.log("params", params);
    s3bucket.upload(params, function(err, data) {
      if (err) {
        console.log("error in callback");
        console.log(err);
      } else {
        console.log("successfully uploaded aws s3");
        console.log(data.Location);
        urlofvideo = data.Location;
        console.log("url in aws", urlofvideo);
      }
    });
  });
}

// The following is an example of making file upload with additional body
// parameters.
// To make a call with PostMan
// Don't put any headers (content-type)
// Under body:
// check form-data
// Put the body with "element1": "test", "element2": image file

router.post("/upload", verifyToken, async function(req, res, next) {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // This grabs the additional parameters so in this case passing in
  // "element1" with a value.
  // const element1 = req.body.element1;
  // let name = await Video.findOne({ name: req.files.path });
  // console.log(name);
  var busboy = new Busboy({ headers: req.headers });

  // The file upload has completed
  busboy.on("finish", async function() {
    console.log("Upload finished");

    // Your files are stored in req.files. In this case,
    // you only have one and it's req.files.element2:
    // This returns:
    // {
    //    element2: {
    //      data: ...contents of the file...,
    //      name: 'Example.jpg',
    //      encoding: '7bit',
    //      mimetype: 'image/png',
    //      truncated: false,
    //      size: 959480
    //    }
    // }

    // Grabs your file object from the request.

    // Begins the upload to the AWS S3

    uploadToS3(req.files);
    var options = {
      provider: "google",

      // Optional depending on the providers
      httpAdapter: "https", // Default
      apiKey: "AIzaSyBa7nrYn-0UwtGm5QRloCl4ncm0RQDjabw", // for Mapquest, OpenCage, Google Premier
      formatter: null // 'gpx', 'string', ...
    };

    var geocoder = NodeGeocoder(options);

    // Or using Promise
    geocoder
      .geocode(req.body.location)
      .then(function(res) {
        console.log("res location", res);
      })
      .catch(function(err) {
        console.log(err);
      });
  });
  newVideo = new Video({
    description: req.body.description,
    compaignName: req.body.compaignName,
    url: urlofvideo,
    location: req.body.location
  });
  console.log("url in end");
  await newVideo.save();
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "compaign created...",
        newVideo: newVideo,
        customer: authData
      });
    }
  });
  // res.status(200).json({ compaign: newVideo });
  req.pipe(busboy);
});

module.exports = router;

// router.post("/fileupload", function(req, res) {
//   var busboy = new Busboy({ headers: req.headers });
//   busboy.on("file", function(name, file, filename, encoding, mimetype) {
//     var saveTo = path.join(__dirname, "uploads/" + filename);
//     file.pipe(fs.createWriteStream(saveTo));
//   });

//   busboy.on("finish", function() {
//     res.writeHead(200, { Connection: "close" });
//     res.end("That's all folks!");
//   });

//   return req.pipe(busboy);
// });
