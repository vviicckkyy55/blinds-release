// import Axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverPlea, detailsPlea} from '../../Actions/pleaActions';
import LoadingBox from '../Helpers/LoadingBox';
import MessageBox from '../Helpers/MessageBox';
import {
  PLEA_DELIVER_RESET,
  PLEA_PAY_RESET,
} from '../../Constants/pleaConstants';

export default function PleaScreen(props) {
  const pleaId = props.match.params.id;

  const pleaDetails = useSelector((state) => state.pleaDetails);
  const { plea, loading, error } = pleaDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const pleaPay = useSelector((state) => state.pleaPay);
  const {
    success: successPay,
  } = pleaPay;
  const pleaDeliver = useSelector((state) => state.pleaDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = pleaDeliver;
  const dispatch = useDispatch();
  useEffect(() => {

    if (
      !plea ||
      successPay ||
      successDeliver ||
      (plea && plea._id !== pleaId)
    ) {
      dispatch({ type: PLEA_PAY_RESET });
      dispatch({ type: PLEA_DELIVER_RESET });
      dispatch(detailsPlea(pleaId));
    } else {
      if (!plea.isPaid) {

      }
    }
  }, [dispatch, pleaId, successPay, successDeliver, plea]);

  const deliverHandler = () => {
    dispatch(deliverPlea(plea._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Plea{plea._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Complete Address</h2>
                <p>
                  <strong>Name:</strong> {plea.completeAddress.fullName} <br />
                  <strong>Address: </strong> {plea.completeAddress.address},
                  {plea.completeAddress.city},{' '}
                  {plea.completeAddress.pincode},
                  {plea.completeAddress.municipality},
                  {plea.completeAddress.stateUT}, {plea.completeAddress.country}
                </p>
                {plea.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {plea.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {plea.paymentMethod}
                </p>
                {plea.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {plea.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Plea Asks</h2>
                <ul>
                  {plea.pleaAsks.map((ask) => (
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
                          <Link to={`/screen/${ask.screen}`}>
                            {ask.name}
                          </Link>
                        </div>

                        <div>
                          {ask.qty} x ${ask.Cost} = ${ask.qty * ask.Cost}
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
                  <div>Asks</div>
                  <div>${plea.asksCost.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>complete</div>
                  <div>${plea.addressCost.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${plea.taxCost.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Plea Total</strong>
                  </div>
                  <div>
                    <strong>${plea.totalCost.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!plea.isPaid && (
                <li>
                 
                </li>
              )}
              {userInfo.isAdmin && plea.isPaid && !plea.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Deliver Pleas
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
