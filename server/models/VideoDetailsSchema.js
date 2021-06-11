import mongoose from 'mongoose';

const uploadSchema = mongoose.Schema({
  uploaderId: {type: mongoose.Schema.Types.ObjectId, 
  ref: 'User',
  required: true},
  uploader_name: { type: String, required: true },
  upload_title: { type: String, required: true },
  video_path: { type: String, required: true },
  thumbnail_path: { type: String, required: true }
}, {
  timestamps: true,
});

const Upload = mongoose.model('Upload', uploadSchema);

export default Upload;