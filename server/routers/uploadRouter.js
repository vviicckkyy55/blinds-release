import express from 'express';
import multer from 'multer';
import checkAuth from '../helpers/check-auth.js';
import generateThumbnail from '../helpers/videoThumbnail.js';
// import thumbnailGenerator from '../helpers/videoThumbnail';


const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'media/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/ /g, '_'));
  } 
});


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50 //50mb
  }
});


uploadRouter.post(
  '/', 
 checkAuth,
  upload.single('file'),
  (req, res, next) => {
    generateThumbnail(
      'http://localhost:3333/api/videos/' + req.file.filename.replace(/ /g, '_'),
      req.file.filename.replace(/ /g, '_'),
      req.userData.name,
      req.userData._id,
    );
    res.status(200).json({
      message: "video upload sccessful"
    });
});


export default uploadRouter;