import express from 'express';
import multer from 'multer';

import { isAuth } from '../utils.js';

const imageRouter = express.Router();


const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/ /g, '_'));
  } 
});

const upload = multer({ storage });

imageRouter.post(
  '/',
  isAuth,
  upload.single('image'),
  (req, res) => {
    res.send(`/${req.file.path}`);
});

export default imageRouter;