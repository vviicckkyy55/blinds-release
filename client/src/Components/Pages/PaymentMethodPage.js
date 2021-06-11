import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../Actions/bucketActions';
import CheckoutSteps from '../Helpers/CheckoutSteps';

export default function PaymentMethodPage(props) {

  const bucket = useSelector((state) => state.bucket);
  const { completeAddress } = bucket;
  if (!completeAddress.address) {
    props.history.push('/completeAddress');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placePlea');

  }
  return (
    <div>
      <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paytm"
              value="PayTM"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="payTM">PayTM</label>
          </div>
        </div>
        <div>
          <button className="primary" type="submit">Continue</button>
        </div>
      </form>
    </div>
  )
}
