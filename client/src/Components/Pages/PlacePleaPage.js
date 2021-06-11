import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoadingBox from '../Helpers/LoadingBox';
import MessageBox from '../Helpers/MessageBox';
import { createPlea } from '../../Actions/pleaActions';
import { PLEA_CREATE_RESET } from '../../Constants/pleaConstants';
import CheckoutSteps from '../Helpers/CheckoutSteps'

export default function PlacePleaPage(props) {

  const bucket = useSelector((state) => state.bucket);
  if(!bucket.paymentMethod) {
    props.history.push('/paymentMethod');
  }

  const pleaCreate = useSelector((state) => state.pleaCreate);
  const { loading, success, error, plea } = pleaCreate;
  const toCost = (num) => Number(num.toFixed(2));
  bucket.asksCost = toCost(
    bucket.bucketAsks.reduce((a, c) => a + c.slots * c.costPerSlot, 0)
  );
  bucket.addressCost = bucket.asksCost > 100 ? toCost(0) : toCost(10);
  bucket.taxCost = toCost(0.15 * bucket.asksCost);
  bucket.totalCost = bucket.asksCost + bucket.addressCost + bucket.taxCost;

  const dispatch = useDispatch();
  const placePleaHandler = () => {
    dispatch(createPlea({
      ...bucket,
      pleaAsks: bucket.bucketAsks
    }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/plea/${plea._id}`);
      dispatch({
        type: PLEA_CREATE_RESET
      });
    }
  }, [dispatch, plea, props.history, success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Complete Address</h2>
                <p>
                  <strong>Name:</strong> { bucket.completeAddress.fullName } <br />
                  <strong>Address:</strong> { bucket.completeAddress.address },
                  {bucket.completeAddress.city}, {bucket.completeAddress.municipality},
                  {bucket.completeAddress.pincode} {bucket.completeAddress.stateUT},
                  {bucket.completeAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {bucket.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Plea Asks</h2>
                <ul>
                  {bucket.bucketAsks.map((ask) => (
                    <li key={ask.screen}>
                      <div className="row">
                        <div>
                          <img
                            src={ask.screenImage}
                            alt={ask.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/screen/${ask.screen}`}>
                            {ask.name}
                          </Link>
                        </div>

                        <div>
                          {ask.slots} x ${ask.costPerSlot} = ${ask.slots * ask.costPerSlot}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Plea Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>asks</div>
                  <div>${bucket.asksCost.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Complete Address</div>
                  <div>${bucket.addressCost.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${bucket.taxCost.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Plea Total</strong>
                  </div>
                  <div>
                    <strong>${bucket.totalCost.toFixed(2)}</strong>  
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placePleaHandler}
                  className="primary block"
                  disabled={bucket.bucketAsks.length === 0}
                >Place Plea</button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
