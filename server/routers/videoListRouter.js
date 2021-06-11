import express from 'express';

import VideoDetails from '../models/VideoDetailsSchema.js';

const videoListRouter = express.Router();


videoListRouter.get('/', (req, res, next) => {
  VideoDetails
    .find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

export default videoListRouter;