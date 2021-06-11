import { spawn } from 'child_process';
import { createWriteStream } from 'fs';

import VideoDetails from '../models/VideoDetailsSchema.js';

const ffmpegPath = '/usr/bin/ffmpeg';
const width = 256;
const height = 144;

const generateThumbnail = (target, title, name, _id) => {
  title = title.replace(/.mkv|.mov|.mpg|.mpeg|.mp4|.wmv|.avi/gi, '');
  let tmpFile = createWriteStream('media/uploads/video_thumbnails/' + title + '.jpg');
  const ffmpeg = spawn(ffmpegPath, [
    '-ss',
    0,
    '-i',
    target,
    '-vf',
    `thumbnail,scale=${width}:${height}`,
    '-qscale:v',
    '2',
    '-frames:v',
    '1',
    '-f',
    'image2',
    '-c:v',
    'mjpeg',
    'pipe:1'
  ]);
  ffmpeg.stdout.pipe(tmpFile);
  const videoDetails = new VideoDetails({
    uploaderId: _id,
    uploader_name: name,
    upload_title: title,
    video_path: target,
    thumbnail_path: 'http://localhost:3333/api/videos/video_thumbnails/' + encodeURIComponent(title + '.jpg')
  });
  videoDetails
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
}

export default generateThumbnail;