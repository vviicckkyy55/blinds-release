import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../../Actions/userActions';
import { USER_UPDATE_RESET } from '../../Constants/userConstants';

import LoadingBox from '../Helpers/LoadingBox';
import MessageBox from '../Helpers/MessageBox';

export default function UserEditPage(props) {

  const userId = props.match.params.id;

  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[isMaster, setIsMaster] = useState(false);
  const[isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpadate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: USER_UPDATE_RESET
      });
      // props.history.push('/userlist');
      window.location.replace("/userlist");
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      setIsMaster(user.isMaster);
    }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({
      _id: userId,
      name,
      email,
      isMaster,
      isAdmin
    }));
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit User {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpadate && (
            <MessageBox variant="danger">{errorUpadate}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="isMaster">Is Master</label>
            <input
              id="isMaster"
              type="checkbox"
              checked={isMaster}
              onChange={(e) => setIsMaster(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="isAdmin">Is Admin</label>
            <input
              id="isAdmin"
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.value)}
            ></input>
          </div>
          <div>
              <button type="submit" className="primary">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
