import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listScreens } from '../../Actions/screenActions';
import { detailsUser } from '../../Actions/userActions';

import LoadingBox from '../Helpers/LoadingBox';
import MessageBox from '../Helpers/MessageBox';
import Rating from '../Helpers/Rating';
import Screen from '../Helpers/Screen';

export default function MasterPage(props) {

  const masterId = props.match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const screenList = useSelector((state) => state.screenList);
  const {
    loading: loadingScreens,
    error: errorScreens,
    screens,
  } = screenList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsUser(masterId));
    dispatch(listScreens({ master: masterId }));
  }, [dispatch, masterId]);

  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ul className='card card-body'>
            <li>
              <div className="row start">
                <div className="p-1">
                  <img
                    className='small'
                    src={user.master.logo}
                    alt={user.master.name}
                  ></img>
                </div>
                <div className="p-1">
                  <h1>{user.master.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <Rating
                rating={user.master.rating}
                numReviews={user.master.numReviews}
              ></Rating>
            </li>
            <li>
              <a href={`mailto:${user.email}`}>Contact Master</a>
            </li>
            <li>{user.master.description}</li>
          </ul>
        )}
      </div>
      <div className="col-3">
        {loadingScreens ? (
          <LoadingBox></LoadingBox>
        ) : errorScreens ? (
          <MessageBox variant="danger">{errorScreens}</MessageBox>
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
      </div>
    </div>
  );
}
