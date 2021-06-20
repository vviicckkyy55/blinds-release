import express from 'express';
import multer from 'multer';
import checkAuth from '../helpers/check-auth.js';
import AWS from 'aws-sdk';
import Document from '../models/Document.js';
// import generateThumbnail from '../helpers/videoThumbnail.js';
// import thumbnailGenerator from '../helpers/videoThumbnail';

import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
ffmpeg.setFfmpegPath(ffmpegPath.path);
import fs from 'fs';
  

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'media/uploads');
  },
  filename: (req, file, cb) => {
    // cb(null, file.originalname.replace(/ /g, '_'));
    cb(null, 'sample.mp4');
  } 
});


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50 //50mb
  }
});

const generateThumbnail=function(req){

  
  //const ffmpeg = require('fluent-ffmpeg');
  
  ffmpeg({ source: './media/uploads/sample.mp4' })
      .on('filenames', (filenames) => {
          console.log('Created file names', filenames);
      })
      .on('end', () => {
          console.log('Job done');

          readAndUploadFileToAWS('./media/uploads/sample.mp4',req);
          let name='thumbnail-'+String(req.file.originalname)
          let desc="This is a thumbnail of "+String(req.file.originalname)
          let thumbnailMeta={
            'file':{
              'mimetype':'image/jpg',
              'originalname':name       // "thumbnail-videoplayback.mp4"
            },
            'body':{
              'description':desc
            }}
            // console.log(thumbnailMeta);
          readAndUploadFileToAWS('example.jpg',thumbnailMeta);
      })
      .on('error', (err) => {
          console.log('Error', err);
      })
      .takeScreenshots({
          filename: 'example.jpg',
          timemarks: [ 0.5 ]
      }, '.');

}


const uploadToAWS=function(file){
  const s3FileURL = process.env.AWS_UPLOADED_FILE_URL_LINK;

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });

  // console.log(process.env.AWS_ACCESS_KEY_ID);
  // console.log(process.env.AWS_SECRET_ACCESS_KEY);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname.replace(/ /g, '_'),
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };
  // console.log(params);
  s3bucket.upload(params, function(err, data) {
    if (err) {
      // res.status(500).json({ error: true, Message: err });
      console.log("--->",err);
    } else {
      // res.send({ data });
      const newFileUploaded = {
        description: file.description,
        fileLink: s3FileURL + file.originalname.replace(/ /g, '_'),
        s3_key: params.Key
      };
      const document = new Document(newFileUploaded);
      document.save(function(error, newFile) {
        if (error) {
          throw error;
        }
      });
    }
  });
}

const readAndUploadFileToAWS = function(path,req){
  fs.readFile(path, (err, data) => {
    if(err)console.log(err);
    else {
      let file={
        'buffer':data,
        'mimetype':req.file.mimetype,
        'originalname':req.file.originalname,
        'description':req.file.originalname
        };
      console.log(file);
      uploadToAWS(file);
    }
  });
}

uploadRouter.post(
  '/', 
 checkAuth,
  upload.single('file'),
  (req, res, next) => {
    // generateThumbnail(
    //   'http://localhost:3333/api/videos/' + req.file.filename.replace(/ /g, '_'),
    //   req.file.filename.replace(/ /g, '_'),
    //   req.userData.name,
    //   req.userData._id,
    // );
    generateThumbnail(req);

    res.status(200).json({
      message: "video upload sccessful"
    });
});


export default uploadRouter;