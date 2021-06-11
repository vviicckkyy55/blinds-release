import React from 'react';
import { Link } from 'react-router-dom';

import Rating from './Rating';


export default function Screen(props) {

  const { screen } = props;
  return (
    <div key={screen._id} className="card">
      <Link to={`/screen/${screen._id}`}>
        <img className="medium" src={screen.image} alt={screen.name} />
      </Link>
      <div className="card-body">
        <Link to={`/screen/${screen._id}`}>
          <h2>{screen.name}</h2>
        </Link>
        <Rating
          rating={screen.rating}
          numReviews={screen.numReviews}
        ></Rating>
        <div className="row">
          <div className="cost">INR{screen.costPerSlot}</div>
          <div>
            <Link to={`/master/${screen.master._id}`}>
              {screen.master.name}
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  )
};
