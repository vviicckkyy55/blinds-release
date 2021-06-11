import React from 'react';
import {Link} from 'react-router-dom';
import Upload from '../Helpers/VideoPlayer/Upload';
import FileUpload from '../Helpers/Upload/FileUpload';


export default function UploadVideoPage() {
  return (
    <div>
      <Link to='/videos'>Back to Videos</Link>
      <hr/>
      <Upload />
      <hr />
      <FileUpload />
    </div>
  )
}
