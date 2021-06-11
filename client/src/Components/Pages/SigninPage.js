import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { TextField } from '@material-ui/core';

import LoadingBox from '../Helpers/LoadingBox';
import MessageBox from '../Helpers/MessageBox';
import { signin } from '../../Actions/userActions';

export default function SigninPage(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/'; 

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error} = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if(userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="row">
      <div className="col-2">
        <img className="large"
            src="../../../images/signindoor.jpg"
            alt="../../../images/logo.png"
          />
      </div>
      <div className="col-1">
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Sign In</h1>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div>
          <label htmlFor="email">Please enter your verified email...</label>
          <TextField 
            type="email"
            id="email" 
            label="Email" 
            variant="outlined"
            required
            onChange={e => setEmail(e.target.value)}
          />
          </div>
          <div>
          <label htmlFor="password">Please enter your password...</label>
          <TextField 
            type="password"
            id="password" 
            label="Password" 
            variant="outlined"
            required
            onChange={e => setPassword(e.target.value)}
          />
          </div>
          <div>
            <label />
            <button className="primary block" type="submit">
              Sign In
            </button>
          </div>
          <div>
            <label />
            <div>
              New User? {' '}
              <Link to={`/signup?redirect=${redirect}`}>Create Your Account</Link>
            </div>
          </div>
        </form>
      </div>
      
    </div>
  )
}
