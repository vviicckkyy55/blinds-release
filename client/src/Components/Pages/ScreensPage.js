import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import './page.css';

import LoadingBox from '../Helpers/LoadingBox';
import MessageBox from '../Helpers/MessageBox';
import Screen from '../Helpers/Screen';
import { listScreens } from '../../Actions/screenActions';
import { listTopMasters } from '../../Actions/userActions';

export default function Screens() {

  const dispatch = useDispatch();

  const screenList = useSelector(state => state.screenList);
  const { loading, error, screens } = screenList;

  const userTopMastersList = useSelector((state) => state.userTopMastersList);
  const {
    loading: loadingMasters,
    error: errorMasters,
    users: masters,
  } = userTopMastersList;

  useEffect(() => {
    dispatch(listScreens({}));
    dispatch(listTopMasters())
  }, [dispatch]);

  return (
    <div className="page">
      <h1>Screens</h1>
      <hr />
      <h2>Top Masters</h2>
      {loadingMasters ? (
        <LoadingBox></LoadingBox>
      ) : errorMasters ? (
        <MessageBox variant="danger">{errorMasters}</MessageBox>
      ) : (
        <>
        {masters.length === 0 && <MessageBox>No Master Found</MessageBox>}
        <Carousel showArrows autoPlay showThumbs={false}>
          {masters.map((master) => (
            <div key={master._id}>
              <Link to={`/master/${master._id}`}>
                <img 
                  src={master.master.logo}
                  alt={master.master.name}
                />
                <p className="legend">{master.master.name}</p>
              </Link>
            </div>
          ))}
        </Carousel>
        </>
      )}
      <hr />
      <h2>Featured Screens</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <>
        {screens.length === 0 && <MessageBox>No Screen Found</MessageBox>}
        <div className="row center">
          {screens.map((screen) => (
            <Screen key={screen._id} screen={screen}></Screen>
          ))}
        </div>
        </>      
      )}
      <hr />
    </div>
  );
}
