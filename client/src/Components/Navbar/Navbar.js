import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './navbar.css';
import { IconContext } from 'react-icons';

import { Button } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close'
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../Actions/userActions';


function Navbar() {

  const bucket = useSelector((state) => state.bucket);
  const { bucketAsks } = bucket;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if(offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect (() => {
    window.addEventListener('scroll', handleScroll)
  })

  let navbarClasses = ['navbar'];
  if(scrolled) {
    navbarClasses.push('scrolled')
  }

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);


  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className={navbarClasses.join(" ")}>
        <div className='left'>
          <Link to='#' className='menu-bars' onClick={() => setSidebarIsOpen(true)}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </Link>
        </div>
        <div className='center'>
        </div>
        <div className='right'>
          <div className='navbar-icon'>
            <Link to='/search' className='menu-bars'>
              <i className="fa fa-search" aria-hidden="true"></i>
            </Link>
            <Link to='/screens' className='menu-bars'>
              <i className="fa fa-tv" aria-hidden="true"></i>
            </Link>
            <Link to='/uploadVideo' className='menu-bars'>
              <i className="fa fa-upload" aria-hidden="true"></i>
            </Link>
            <Link to='/bucket' className='menu-bars'>
              <i className="fa fa-bell" aria-hidden="true"></i>
              {bucketAsks.length > 0 && (
                <span className="badge">{bucketAsks.length}</span>
              )}
            </Link>
            
            <div className="navbar-toolbar-button">
              
              {userInfo && userInfo.isMaster && (
                <div className="dropdown">
                  <Link to="#admin">
                    <i className="fa fa-user-secret" aria-hidden="true"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/screenlist/master">Screens</Link>
                    </li>
                    <li>
                      <Link to="/plealist/master">Pleas</Link>
                    </li>
                  </ul>
                </div>
              )}

              {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">
                    <i className="fa fa-universal-access" aria-hidden="true"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/screenlist">Screens</Link>
                    </li>
                    <li>
                      <Link to="/plealist">Pleas</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Users</Link>
                    </li>
                  </ul>
                </div>
              )}
              
              { userInfo ? (
                  <div className="dropdown">
                    <Link to="#">
                      {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                    </Link>
                    <ul className="dropdown-content">
                      <li>
                        <Link to="/userProfile">Profile</Link>
                      </li>
                      <li>
                        <Link to="/pleaHistory">Plea History</Link>
                      </li>
                      <li>
                        <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<GolfCourseIcon />}
                    onClick={() => {
                      window.location.replace("/signin")
                    }}
                  >Get In
                  </Button>
                )}
            </div>
          </div>
        </div>
      </div>
      <aside className={sidebarIsOpen ? 'open' : ''}>
        <ul className="menus">
          <li>
            <img
              className="icon"
              src=""
              alt="Vinciis"
            ></img>
            <strong>Raise the Blinds</strong>
            <Link to="#" onClick={() => setSidebarIsOpen(false)} className='close-sidebar'>
              <CloseIcon />
            </Link>
          </li>
          {
            SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.Name}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </aside>

    </IconContext.Provider>
  );
}

export default Navbar;