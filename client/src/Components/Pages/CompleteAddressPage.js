import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { saveCompleteAddress } from '../../Actions/bucketActions';
import CheckoutSteps from '../Helpers/CheckoutSteps';

export default function CompleteAddressPage(props) {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const bucket = useSelector(state => state.bucket);
  const { completeAddress } = bucket;

  const [lat, setLat] = useState(completeAddress.lat);
  const [lng, setLng] = useState(completeAddress.lng);
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  if(!userInfo) {
    props.history.push('/signin');
  };

  const [fullName, setFullName] = useState(completeAddress.fullName);
  const [address, setAddress] = useState(completeAddress.address);
  const [city, setCity] = useState(completeAddress.city);
  const [municipality, setMunicipality] = useState(completeAddress.municipality);
  const [pincode, setPincode] = useState(completeAddress.pincode);
  const [stateUT, setStateUT] = useState(completeAddress.stateUT);
  const [country, setCountry] = useState(completeAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if(addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (!newLat|| !newLng) {
      moveOn = window.confirm(
        'You did not set your location on map, Continue?'
      );
    }
    if (moveOn) {
      dispatch(saveCompleteAddress({ 
        fullName, address, city, municipality, pincode, stateUT, country 
      }));
      props.history.push('/paymentMethod');  
    }
  };

  const chooseOnMap = () => {
    dispatch(
      saveCompleteAddress({
        fullName,
        address,
        city,
        municipality,
        pincode,
        stateUT,
        country,
        lat,
        lng,
      })
    );
    props.history.push('/map')
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Complete Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Complete Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter complete address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter City/District/Town Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="municipality">Municipality</label>
          <input
            type="text"
            id="municipality"
            placeholder="Enter Municipality Name"
            value={municipality}
            onChange={(e) => setMunicipality(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="pincode">PIN Code</label>
          <input
            type="number"
            id="pincode"
            placeholder="Enter PIN Code"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="stateUT">State/UT</label>
          <input
            type="text"
            id="stateUT"
            placeholder="Enter State/UT Name"
            value={stateUT}
            onChange={(e) => setStateUT(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter Country Name"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="chooseOnMap">Location</label>
          <button
            type="button"
            onClick={chooseOnMap}
          >Choose On Map</button>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">Continue</button>
        </div>
      </form>
    </div>
  )
};
