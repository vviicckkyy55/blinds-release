import React from 'react';

import HomeIcon from '@material-ui/icons/Home';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import PostAddIcon from '@material-ui/icons/PostAdd';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import PeopleIcon from '@material-ui/icons/People';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeIcon />,
    Name: 'nav-text'
  },
  {
    title: 'Screens',
    path: '/screens',
    icon: <VideoLabelIcon />,
    Name: 'nav-text'
  },
  {
    title: 'Videos',
    path: '/videos',
    icon: <VideoLibraryIcon />,
    Name: 'nav-text'
  },
  {
    title: 'Pleas',
    path: '/pleas',
    icon: <PostAddIcon />,
    Name: 'nav-text'
  },
  {
    title: 'Admin',
    path: '/admin',
    icon: <AccountBoxIcon />,
    Name: 'nav-text'
  },
  {
    title: 'Municipality',
    path: '/commissioner',
    icon: <PersonPinCircleIcon />,
    Name: 'nav-text'
  },
  {
    title: 'Agencies',
    path: '/master',
    icon: <PersonPinIcon />,
    Name: 'nav-text'
  },
  {
    title: 'Advertisers',
    path: '/ally',
    icon: <NaturePeopleIcon />,
    Name: 'nav-text'
  },
  {
    title: 'Audiences',
    path: '/consumer',
    icon: <PeopleIcon />,
    Name: 'nav-text'
  }
];