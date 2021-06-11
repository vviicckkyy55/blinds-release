import express from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import Document from '../models/Document.js';
import generateThumbnail from '../helpers/videoThumbnail.js';
import checkAuth from '../helpers/check-auth.js';

const uploadFileRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

uploadFileRouter.route('/').get((req, res, next) => {
  Document.find(
    {},
    null,
    {
      sort: { createdAt: 1 }
    },
    (err, docs) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(docs);
    }
  )
});

uploadFileRouter.route('/:id').get((req, res, next) => {
  Document.findById(req.params.id, (err, go) => {
    if (err) {
      return next(err);
    }
    res.json(go);
  });
});

uploadFileRouter.post('/', checkAuth, upload.single('file'), function (req, res) {
  generateThumbnail(
    'http://localhost:3333/api/videos/' + req.file.originalname.replace(/ /g, '_'),
    req.file.originalname.replace(/ /g, '_'),
    req.userData.name,
    req.userData._id,
  );
  const file = req.file;
  const s3FileURL = process.env.AWS_UPLOADED_FILE_URL_LINK;

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });

  console.log(process.env.AWS_ACCESS_KEY_ID);
  console.log(process.env.AWS_SECRET_ACCESS_KEY);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname.replace(/ /g, '_'),
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  s3bucket.upload(params, function(err, data) {
    if (err) {
      res.status(500).json({ error: true, Message: err });
    } else {
      res.send({ data });
      const newFileUploaded = {
        description: req.body.description,
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
});

uploadFileRouter.route('/edit:id').put((req, res, next) => {
  Document.findByIdAndUpdate(
    req.params.id,
    { $set: { description: Object.keys(req.body)[0] } },
    { new: true },
    (err, updateDoc) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(updateDoc);
    }
  );
});

uploadFileRouter.route('/:id').delete((req, res, next) => {
  Document.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      return next(err);
    }

    let s3bucket = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: result.s3_key
    };

    s3bucket.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          status: '200',
          responseType: 'string',
          response: 'success'
        });
      }
    });
  });
});

export default uploadFileRouter;