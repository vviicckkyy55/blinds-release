import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { TextField } from '@material-ui/core';

import LoadingBox from '../Helpers/LoadingBox';
import MessageBox from '../Helpers/MessageBox';
import { signup } from '../../Actions/userActions';

export default function SignupPage(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignup = useSelector((state) => state.userSignup);
  const { userInfo, loading, error } = userSignup;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password donot match')
    } else {
      dispatch(signup(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="card row">
      <div className="col-2">
        <img className="large"
          src="../../../images/signupdoor.jpg"
          alt="../../../images/logo.png"
        />
      </div>
      <div className="col-1">
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h2>Advertising, as never before...</h2>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div>
          <label htmlFor="name">Enter a cool name here...</label>
          <TextField 
            type="text"
            id="name" 
            label="Name" 
            variant="outlined"
            required
            onChange={e => setName(e.target.value)}
          />
          </div>
          <div>
          <label htmlFor="email">Enter your valid Email Id here...</label>
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
          <label htmlFor="password">Choose a secure password...</label>
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
          <label htmlFor="confirm password">Enter the same password...</label>
          <TextField 
            type="password"
            id="confirmpassword" 
            label="Confirm Password" 
            variant="outlined"
            required
            onChange={e => setConfirmPassword(e.target.value)}
          />
          </div>
          <div>
            <label />
            <button className="primary block" type="submit">
              Sign Up
            </button>
          </div>
          <div>
            <label />
            <div>
              Already a User? {' '}
              <Link to={`/signin?redirect=${redirect}`}>Signin</Link>
            </div>
          </div>
        </form>
      </div>
      
    </div>
  )
}
