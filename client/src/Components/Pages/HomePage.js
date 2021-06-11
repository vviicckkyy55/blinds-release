import React from 'react';
import {Link} from 'react-router-dom';
 import ScreensPage from './ScreensPage';

import VideosPage from './VideosPage';

import './page.css';

function HomePage() {
  return (
    <div className="page">
    <div className="main-page">
      <div className="row center">
        <Link to='/videos' className='menu-bars'>
              <i className="fa fa-file-video-o" ></i>
        </Link>
        <Link to='/screens' className='menu-bars'>
              <i className="fa fa-tv" ></i>
        </Link>
        <Link to='/pleas' className='menu-bars'>
              <i className="fa fa-bullhorn" ></i>
        </Link>
      </div>
      <div>
          <ScreensPage />
      </div>
    </div>
    <div>
        <VideosPage />
    </div>
  </div>
  );
}

export default HomePage;