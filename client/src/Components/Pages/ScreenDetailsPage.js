import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoadingBox from '../Helpers/LoadingBox';
import MessageBox from '../Helpers/MessageBox';
import Rating from '../Helpers/Rating';
import VideoThumbnails from '../Helpers/VideoThumbnails';
import { createReview, detailsScreen } from '../../Actions/screenActions';
import { SCREEN_REVIEW_CREATE_RESET } from '../../Constants/screenConstants';


function ScreenDetails (props) {

  const dispatch = useDispatch();

  const screenId = props.match.params.id;
  const [slots, setSlots] = useState(1);

  const screenDetails = useSelector((state) => state.screenDetails);
  const { loading, error, screen } =  screenDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const screenReviewCreate = useSelector((state) => state.screenReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = screenReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review submitted successfully');
      setRating('');
      setComment('');
      dispatch({
        type: SCREEN_REVIEW_CREATE_RESET
      })
    }
    dispatch(detailsScreen(screenId));
  }, [dispatch, screenId, successReviewCreate]);

  const addToBucketHandler = () => {
    props.history.push(`/bucket/${screenId}?slots=${slots}`);
  };

  const uploadHandler = () => {
    props.history.push('/uploadVideo')
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if(comment && rating ) {
      dispatch(
        createReview(screenId, { rating, comment, name: userInfo.name})
      );
    } else {
      alert('Please enter comment and rating');
    }
  };
  
  return (
    <div>
      { loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
      <div>
        <Link to='/screens'>Back to Screens</Link>
        <div className='row top'>
          <div className="col-2 card card-body">
            <h3>Playlist</h3>
            <VideoThumbnails />
          </div>
          <div className="col-1">
            <ul>
              <li>
                <h4> Screen details </h4>
                <h1>{screen.name}</h1>
              </li>
              <li>
                <Rating rating={screen.rating} numReviews={screen.numReviews}></Rating>
              </li>
              <li> Cost : INR {screen.costPerSlot} </li>
              <li>Description:
                <p>{screen.description}</p>
              </li>
            </ul>
          </div>
          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                  Master{' '}
                  <h2>
                    <Link to={`/master/${screen.master._id}`}>
                      {screen.master.master.name}
                    </Link>
                  </h2>
                  <Rating
                    rating={screen.master.master.rating}
                    numReviews={screen.master.master.numReviews}
                  ></Rating>
                </li>
                <li>
                  <div className="row">
                    <div>Cost</div>
                    <div className="cost">INR {screen.costPerSlot}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Status</div>
                    <div>
                      {
                        screen.slotsAvailable > 0 ? (
                          <span className="success">Available</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                    </div>
                  </div>
                </li>
                { screen.slotsAvailable > 0 && (
                  <>
                  <li>
                    <div className="row">
                      <div>Slots</div>
                      <div>
                        <select 
                          value={slots}
                          onChange={(e) => setSlots(e.target.value)}
                        >
                          {[...Array(screen.slotsAvailable).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </li>
                  {userInfo && userInfo.isMaster && userInfo.isAdmin ? (
                     <li>
                      <button 
                        onClick={uploadHandler}
                        className="primary block"
                      >Upload Advert</button>
                   </li>
                  ) : userInfo && userInfo.isMaster ? (
                      <li>
                        <button 
                          onClick={uploadHandler}
                          className="primary block"
                        >Upload Advert</button>
                    </li>
                   ) : userInfo ? (
                    <li>
                      <button 
                        onClick={addToBucketHandler}
                        className="primary block"
                      >Ally Plea</button>
                   </li>
                  ):(
                    <h2>Please Signin</h2>
                  )}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h2 id="reviews">Reviews</h2>
          {screen.reviews.length === 0 && (
            <MessageBox>There is no review</MessageBox>
          )}
          <ul>
            {screen.reviews.map((review) => (
              <li key={review._id}>
                <strong>{review.name}</strong>
                <Rating rating={review.rating} caption=" "></Rating>
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </li>
            ))}
            <li>
              {userInfo ? (
                <form className="form" onSubmit={submitHandler}>
                  <div>
                    <h2>Write a review</h2>
                  </div>
                  <div>
                    <label htmlFor="rating">Rating</label>
                    <select
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1- Poor</option>
                      <option value="2">2- Fair</option>
                      <option value="3">3- Good</option>
                      <option value="4">4- Very Good</option>
                      <option value="5">5- Excellent</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="comment">Comment</label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div>
                    <label />
                    <button className="primary" type="submit">Submit</button>
                  </div>
                  <div>
                    {loadingReviewCreate && <LoadingBox></LoadingBox>}
                    {errorReviewCreate && (
                      <MessageBox variant="danger">
                        {errorReviewCreate}
                      </MessageBox>
                    )}
                  </div>
                </form>
              ) : (
                <MessageBox>
                  Please <Link to="/signin">Sign In</Link> to write a review
                </MessageBox>
              )}
            </li>
          </ul>
        </div>
      </div>
    )}
  </div> 
  );
}

export default ScreenDetails;