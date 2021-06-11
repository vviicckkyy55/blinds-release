import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../../../node_modules/axios/index';

import LoadingBox from '../Helpers/LoadingBox';
import MessageBox from '../Helpers/MessageBox';
import { detailsScreen, updateScreen } from '../../Actions/screenActions';
import { SCREEN_UPDATE_RESET } from '../../Constants/screenConstants';

export default function ScreenEditPage(props) {

  const screenId = props.match.params.id;

  const [name,setName] = useState('');
  const [costPerSlot,setCostPerSlot] = useState('');
  const [image,setImage] = useState('');
  const [category,setCategory] = useState('');
  const [slotsAvailable,setSlotsAvailable] = useState('');
  const [description,setDescription] = useState('');

  const screenDetails = useSelector((state) => state.screenDetails);
  const {loading, error, screen} = screenDetails;

  const screenUpdate = useSelector((state) => state.screenUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = screenUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/screenlist');
    }
    if (!screen || screen._id !== screenId || successUpdate) {
      dispatch({
        type: SCREEN_UPDATE_RESET
      });
      dispatch(detailsScreen(screenId));
    } else {
      setName(screen.name);
      setCostPerSlot(screen.costPerSlot);
      setImage(screen.image);
      setCategory(screen.category);
      setSlotsAvailable(screen.slotsAvailable);
      setDescription(screen.description);
    }
  }, [screen, dispatch, screenId, successUpdate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateScreen({
        _id: screenId,
        name,
        costPerSlot,
        image,
        category,
        slotsAvailable,
        description,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

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
          <h1>Edit Screen {screenId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
          <div>
            <label htmlFor="name">name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter Owner Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="costPerSlot">Cost/Slot</label>
            <input
              id="costPerSlot"
              type="text"
              placeholder="Enter cost/slot"
              value={costPerSlot}
              onChange={(e) => setCostPerSlot(e.target.value)}
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
            <label htmlFor="category">Category</label>
            <input
              id="category"
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="slotsAvailable">Slots Available</label>
            <input
              id="slotsAvailable"
              type="text"
              placeholder="Enter Slots Available"
              value={slotsAvailable}
              onChange={(e) => setSlotsAvailable(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              row="3"
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          <div>
            <label></label>
            <button className="primary" type="submit">Update</button>
          </div>
          </>
        )}
      </form>
    </div>
  )
}
