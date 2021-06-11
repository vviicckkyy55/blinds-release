import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@material-ui/core';

import LoadingBox from '../Helpers/LoadingBox';
import MessageBox from '../Helpers/MessageBox';
import IntroSteps from '../Helpers/IntroSteps';
import { detailsUser, updateUserProfile } from '../../Actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../Constants/userConstants';

export default function UserBankingDetailsPage() {


  const [bankAccount, setBankAccount] = useState('');
  const [bankAccountHolderName, setBankAccountHolderName] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [upiId, setUpiId] = useState('');
  const [vId, setVId] = useState('');

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
    } 
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ 
      userId: user._id, 
      bankAccount,
      bankAccountHolderName,
      ifsc,
      upiId,
      vId
    }))
  };
  return (
    <div>
      <IntroSteps step1 step2 step3 ></IntroSteps>
        <div className="col-1">
          <form className="form" onSubmit={submitHandler}>
            <div>
              <h1>User Banking Profile</h1>
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
                  <label htmlFor="bankAccount">Bank Account Number..</label>
                  <TextField 
                    type="text"
                    id="bankAccount" 
                    label="Bank Account No." 
                    variant="outlined"
                    defaultValue={bankAccount}
                    onChange={e => setBankAccount(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="bankAccountHolderName">Bank Account Holder Name..</label>
                  <TextField 
                    type="text"
                    id="bankAccountHolderName" 
                    label="Bank Account Holder Name" 
                    variant="outlined"
                    defaultValue={bankAccountHolderName}
                    onChange={e => setBankAccountHolderName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="ifsc">IFSC Code of your Bank:</label>
                  <TextField 
                    type="text"
                    id="ifsc" 
                    label="IFSC CODE" 
                    variant="outlined"
                    defaultValue={ifsc}
                    onChange={e => setIfsc(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="upiId">Your current UPI ID</label>
                  <TextField 
                    type="text"
                    id="upiId" 
                    label="UPI ID" 
                    variant="outlined"
                    defaultValue={upiId}
                    onChange={e => setUpiId(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="vId">Your VID</label>
                  <TextField 
                    type="text"
                    id="vId" 
                    label="VID" 
                    variant="outlined"
                    defaultValue={vId}
                    onChange={e => setVId(e.target.value)}
                  />
                </div>
                <div>
                  <label />
                  <button className="primary" type="submit">
                    Update Banking Info
                  </button>
                </div>
              </>
            )}
          </form>
      </div>
     
    </div>
  )
}
