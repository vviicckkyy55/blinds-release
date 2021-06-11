import Axios from 'axios';

import { 
  SCREEN_CATEGORY_LIST_FAIL,
  SCREEN_CATEGORY_LIST_REQUEST,
  SCREEN_CATEGORY_LIST_SUCCESS,
  SCREEN_CREATE_FAIL,
  SCREEN_CREATE_REQUEST,
  SCREEN_CREATE_SUCCESS,
  SCREEN_DELETE_FAIL,
  SCREEN_DELETE_REQUEST,
  SCREEN_DELETE_SUCCESS,
  SCREEN_DETAILS_FAIL,
  SCREEN_DETAILS_REQUEST,
  SCREEN_DETAILS_SUCCESS,
  SCREEN_LIST_FAIL, 
  SCREEN_LIST_REQUEST, 
  SCREEN_LIST_SUCCESS, 
  SCREEN_REVIEW_CREATE_FAIL, 
  SCREEN_REVIEW_CREATE_REQUEST, 
  SCREEN_REVIEW_CREATE_SUCCESS, 
  SCREEN_UPDATE_FAIL, 
  SCREEN_UPDATE_REQUEST,
  SCREEN_UPDATE_SUCCESS
} from '../Constants/screenConstants';


export const listScreens = ({
  pageNumber = '',
  master = '',
  name = '',
  category= '',
  request = '',
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
  dispatch ({ 
    type: SCREEN_LIST_REQUEST 
  });
  try {
    const { data } = await Axios.get(
      `/api/screens?pageNumber=${pageNumber}&master=${master}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&request=${request}`);
    dispatch({
      type: SCREEN_LIST_SUCCESS,
      payload: data
    });
  } catch(error) {
    dispatch({
      type: SCREEN_LIST_FAIL,
      payload: error.message
    });
  }
};

export const listScreenCategories = () => async(dispatch) => {
  dispatch({
    type: SCREEN_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get('/api/screens/categories');
    dispatch({
      type: SCREEN_CATEGORY_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SCREEN_CATEGORY_LIST_FAIL,
      payload: error.message
    });
  }
};
 

export const detailsScreen = (screenId) => async(dispatch) => {
  dispatch ({ type: SCREEN_DETAILS_REQUEST, payload: screenId });
  try {
    const { data } = await Axios.get(`/api/screens/${screenId}`);
    dispatch({
      type: SCREEN_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SCREEN_DETAILS_FAIL,
      payload: 
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message, 
    });
  }
};


export const createScreen = () => async(dispatch, getState) => {
  dispatch({
    type: SCREEN_CREATE_REQUEST
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.post('/api/screens', {}, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({
      type: SCREEN_CREATE_SUCCESS,
      payload: data.screen,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SCREEN_CREATE_FAIL,
      payload: message
    });
  }
};


export const updateScreen = (screen) => async (dispatch, getState) => {
  dispatch({ 
    type: SCREEN_UPDATE_REQUEST, 
    payload: screen
   });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.put(`/api/screens/${screen._id}`, screen, {
      headers: { 
        Authorization: `Bearer ${userInfo.token}` 
      },
    });
    dispatch({ 
      type: SCREEN_UPDATE_SUCCESS, 
      payload: data 
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ 
      type: SCREEN_UPDATE_FAIL, 
      error: message 
    });
  }
};


export const deleteScreen = (screenId) => async (dispatch, getState) => {
  dispatch({ 
    type: SCREEN_DELETE_REQUEST, 
    payload: screenId 
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = Axios.delete(`/api/screens/${screenId}`, {
      headers: { 
        Authorization: `Bearer ${userInfo.token}` 
      },
    });
    dispatch({ type: SCREEN_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ 
      type: SCREEN_DELETE_FAIL, 
      payload: message 
    });
  }
};


export const createReview = (screenId, review) => async (dispatch, getState) => {
  dispatch({ 
    type: SCREEN_REVIEW_CREATE_REQUEST 
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.post(`/api/screens/${screenId}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: SCREEN_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ 
      type: SCREEN_REVIEW_CREATE_FAIL,
      payload: message 
    });
  }
};