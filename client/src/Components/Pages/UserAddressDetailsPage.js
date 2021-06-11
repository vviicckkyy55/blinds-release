import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@material-ui/core';

import LoadingBox from '../Helpers/LoadingBox';
import MessageBox from '../Helpers/MessageBox';
import IntroSteps from '../Helpers/IntroSteps';
import { detailsUser, updateUserProfile } from '../../Actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../Constants/userConstants';

export default function UserAddressDetailsPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fullName, setFullName] = useState('');
  const [occupation, setOccupation] = useState('')
  const [address, setAddress] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [stateUT, setStateUT] = useState('');
  const [country, setCountry] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if(!user) {
      dispatch({
        type: USER_UPDATE_PROFILE_RESET
      });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      alert('Password and confirm password doesnot match');
    } else {
      dispatch(updateUserProfile({ 
        userId: user._id, 
        name, 
        email, 
        password
       }))
    }
  };
  return (
    <div>
      <IntroSteps step1 step2 ></IntroSteps>
      <div className="row top">
        <div className="col-1">
          <form className="form" onSubmit={submitHandler}>
            <div>
              <h1>User Profile</h1>
            </div>
            {loading ? ( 
              <LoadingBox></LoadingBox>
            ) : error ? ( 
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
              { loadingUpdate && <LoadingBox></LoadingBox> }
              { errorUpdate && (
                  <MessageBox variant="danger">{errorUpdate}</MessageBox>
              )}
              { successUpdate && (
                <MessageBox variant="success">Profile Updated Successfully</MessageBox>
              )}
                <div>
                  <label htmlFor="name">This is your name...</label>
                  <TextField 
                    type="text"
                    id="name" 
                    label="Name" 
                    variant="outlined"
                    defaultValue={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="fullName">That's a nice name...</label>
                  <TextField 
                    type="text"
                    id="fullName" 
                    label="Full Name" 
                    variant="outlined"
                    defaultValue={fullName}
                    onChange={e => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="occupation">You daily work as an:</label>
                  <TextField 
                    type="text"
                    id="occupation" 
                    label="Occupation" 
                    variant="outlined"
                    defaultValue={occupation}
                    onChange={e => setOccupation(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email">This is your verified Email...</label>
                  <TextField 
                    type="email"
                    id="email" 
                    label="Email" 
                    variant="outlined"
                    defaultValue={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password">Enter your new password here...</label>
                  <TextField 
                    type="password"
                    id="password" 
                    label="Password" 
                    variant="outlined"
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="confirmpassword">Confirm your new password here...</label>
                  <TextField 
                    type="password"
                    id="confirmpassword" 
                    label="Confirm Password" 
                    variant="outlined"
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label />
                  <button className="primary" type="submit">
                    Update Profile Info
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
        <div className="col-1">
          <form className="form" onSubmit={submitHandler}>
            <div>
              <h1>User Address</h1>
            </div>
            {loading ? ( 
              <LoadingBox></LoadingBox>
            ) : error ? ( 
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
              { loadingUpdate && <LoadingBox></LoadingBox> }
              { errorUpdate && (
                  <MessageBox variant="danger">{errorUpdate}</MessageBox>
              )}
              { successUpdate && (
                <MessageBox variant="success">Profile Updated Successfully</MessageBox>
              )}
              
                <div>
                  <label htmlFor="address">Please provide your complete address...</label>
                  <TextField 
                    type="text"
                    id="address" 
                    label="Complete Address" 
                    variant="outlined"
                    defaultValue={address}
                    onChange={e => setAddress(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="municipality">Governing Municipality</label>
                  <TextField 
                    type="text"
                    id="municipality" 
                    label="Local Municipal Body" 
                    variant="outlined"
                    defaultValue={municipality}
                    onChange={e => setMunicipality(e.target.value)}
                  />
                </div>  
                <div>
                  <label htmlFor="city">Nearest City or District</label>
                  <TextField 
                    type="text"
                    id="city" 
                    label="City/District" 
                    variant="outlined"
                    defaultValue={city}
                    onChange={e => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="pincode">Your Pincode</label>
                  <TextField 
                    type="number"
                    id="pincode" 
                    label="PIN Code" 
                    variant="outlined"
                    defaultValue={pincode}
                    onChange={e => setPincode(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="stateUT">Wether you're living in state or UT</label>
                  <TextField 
                    type="text"
                    id="stateUT" 
                    label="State/UT" 
                    variant="outlined"
                    defaultValue={stateUT}
                    onChange={e => setStateUT(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="country">And your country is:</label>
                  <TextField 
                    type="text"
                    id="country" 
                    label="Country" 
                    variant="outlined"
                    defaultValue={country}
                    onChange={e => setCountry(e.target.value)}
                  />
                </div>
                <div>
                  <label />
                  <button className="primary" type="submit">
                    Update Address Info
                  </button>
                </div>
              </>
            )}
          </form>
        </div>


      </div>
     
    </div>
  )
}
