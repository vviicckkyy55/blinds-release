import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';

import LoadingBox from '../Helpers/LoadingBox';
import MessageBox from '../Helpers/MessageBox';
import { detailsUser, updateUserProfile } from '../../Actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../Constants/userConstants';

export default function UserProfilePage(props) {

  const [name, setName] = useState('');
  const [masterName, setMasterName] = useState('');
  const [masterLogo, setMasterLogo] = useState('');
  const [masterDescription, setMasterDescription] = useState('');

  const [image,setImage] = useState('');


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
    if (!user) {
      dispatch({
        type: USER_UPDATE_PROFILE_RESET
      });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      if (user.master) {
        setMasterName(user.master.name);
        setMasterLogo(user.master.logo);
        setImage(user.master.image)
        setMasterDescription(user.master.description);
      }
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({
      userId: user._id,
      name,
      masterName,
      masterLogo,
      image,
      masterDescription,
    })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };


  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
          <button
            class="primary"
            type="button"
            onClick={() => props.history.push('/userCredentials')}
          >Change Credentials</button>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">Profile Updated Successfully</MessageBox>
            )}
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
            {user.isMaster && (
              <>
                <h2>Master</h2>
                <div>
                  <label htmlFor="masterName">Master Name</label>
                  <input
                    id="masterName"
                    type="text"
                    placeholder="Enter Master Name"
                    value={masterName}
                    onChange={(e) => setMasterName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="masterLogo">Master Logo</label>
                  <input
                    id="masterLogo"
                    type="text"
                    placeholder="Enter Master Logo"
                    value={masterLogo}
                    onChange={(e) => setMasterLogo(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="image">Screen Image</label>
                  <input
                    id="image"
                    type="text"
                    placeholder="Enter Screen Image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="imageFile">Image File</label>
                  <input
                    id="imageFile"
                    type="file"
                    placeholder="Choose Image"
                    onChange={uploadFileHandler}
                  ></input>
                  {loadingUpload && <LoadingBox></LoadingBox>}
                  {errorUpload && (
                    <MessageBox variant="danger">{errorUpload}</MessageBox>
                  )}
                </div>
                <div>
                  <label htmlFor="masterDescription">Master Description</label>
                  <input
                    id="masterDescription"
                    type="text"
                    placeholder="Enter Master Description"
                    value={masterDescription}
                    onChange={(e) => setMasterDescription(e.target.value)}
                  ></input>
                </div>
              </>
            )}
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
