import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToBucket, removeFromBucket } from '../../Actions/bucketActions';

import MessageBox from '../Helpers/MessageBox';

export default function BucketPage(props) {
  const screenId = props.match.params.id;
  const slots = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

    const bucket = useSelector((state) => state.bucket);
    const { bucketAsks, error } = bucket;

    const dispatch = useDispatch();
    useEffect(() => {
      if (screenId) {
        dispatch(addToBucket(screenId, slots));
      }
    }, [dispatch, screenId, slots]);

    const removeFromBucketHandler = (id) => {
      dispatch(removeFromBucket(id));
    };

    const checkoutHandler = (id) => {
      props.history.push('/signin?redirect=completeAddress');
    }
    
  return (
    <div className="row top">
      <div className="col-2">
      <h1>Asked Bucket</h1>
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {bucketAsks.length === 0 ? (
        <MessageBox>
          Bucket is empty. <Link to="/screens">Ask Buckets</Link>
        </MessageBox>
      ) : (
        <ul>
          {bucketAsks.map((ask) => (
            <li key={ask.screen}>
              <div className="row">
                <div>
                  <img 
                    src={ask.image}
                    alt={ask.name}
                    className="small"
                  ></img>
                </div>
                <div className="min-30">
                  <Link to={`/screen/${ask.screen}`}>{ask.name}</Link>
                </div>
                <div>
                  <select 
                    value={ask.slots} 
                    onChange={(e) => 
                    dispatch(
                      addToBucket(ask.screen, Number(e.target.value))
                    )}>
                    {[...Array(ask.slotsAvailable).keys()].map(
                    (x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  ${ask.costPerSlot}
                </div>
                <div>
                  <button type="button" 
                    onClick={() => removeFromBucketHandler(ask.screen)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal 
                ({bucketAsks.reduce((a, c) => a + c.slots, 0)} asks)
                : ${bucketAsks.reduce((a, c) => a + c.costPerSlot * c.slots, 0)}
              </h2>
            </li>
            <li>
              <button 
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={bucketAsks.length === 0}
              > Proceed To Checkout </button>
                
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
