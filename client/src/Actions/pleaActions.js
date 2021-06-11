import Axios from 'axios';
import { BUCKET_EMPTY } from '../Constants/bucketConstants';
import {
  PLEA_CREATE_FAIL,
  PLEA_CREATE_REQUEST,
  PLEA_CREATE_SUCCESS,
  PLEA_DELETE_FAIL,
  PLEA_DELETE_REQUEST,
  PLEA_DELETE_SUCCESS,
  PLEA_DELIVER_FAIL,
  PLEA_DELIVER_REQUEST,
  PLEA_DELIVER_SUCCESS,
  PLEA_DETAILS_FAIL,
  PLEA_DETAILS_REQUEST,
  PLEA_DETAILS_SUCCESS,
  PLEA_LIST_FAIL,
  PLEA_LIST_REQUEST,
  PLEA_LIST_SUCCESS,
  PLEA_MINE_LIST_FAIL,
  PLEA_MINE_LIST_REQUEST,
  PLEA_MINE_LIST_SUCCESS,
  PLEA_PAY_FAIL,
  PLEA_PAY_REQUEST,
  PLEA_PAY_SUCCESS,
  PLEA_SUMMARY_REQUEST,
  PLEA_SUMMARY_SUCCESS
} from '../Constants/pleaConstants';


export const createPlea = (plea) => async (dispatch, getState) => {
  dispatch({
    type: PLEA_CREATE_REQUEST,
    payload: plea
  });
  try {
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.post('/api/pleas', plea, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: PLEA_CREATE_SUCCESS,
      payload: data.plea
    });
    dispatch({
      type: BUCKET_EMPTY
    });
    localStorage.removeItem('bucketAsks');
  } catch (error) {
    dispatch({
      type: PLEA_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};




export const detailsPlea = (pleaId) => async (dispatch, getState) => {
  dispatch({
    type: PLEA_DETAILS_REQUEST,
    payload: pleaId
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.get(`/api/pleas/${pleaId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({
      type: PLEA_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PLEA_DETAILS_FAIL,
      payload: message
    });
  }
};



export const payPlea = (plea, paymentResult) => async (dispatch, getState) => {
  dispatch({
    type: PLEA_PAY_REQUEST,
    payload: { plea, paymentResult }
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = Axios.put(`/api/pleas/${plea._id}/pay`, paymentResult, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({
      type: PLEA_PAY_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PLEA_PAY_FAIL,
      payload: message
    });
  }
};




export const listPleaMine = () => async (dispatch, getState) => {
  dispatch({
    type: PLEA_MINE_LIST_REQUEST
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.get('/api/pleas/mine', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: PLEA_MINE_LIST_SUCCESS,
      payload: data, 
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PLEA_MINE_LIST_FAIL,
      payload: message,
    });
  }
};



export const listPleas = ({ master = '' }) => async (dispatch, getState) => {
  dispatch({
    type: PLEA_LIST_REQUEST
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.get(`/api/pleas?master=${master}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({
      type: PLEA_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PLEA_LIST_FAIL,
      payload: message
    });
  }
};
export const deletePlea = (pleaId) => async (dispatch, getState) => {
  dispatch({
    type: PLEA_DELETE_REQUEST,
    payload: pleaId
  });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = Axios.delete(`/api/pleas/${pleaId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({
      type: PLEA_DELETE_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PLEA_DELETE_FAIL,
      payload: message
    });
  }
};

export const deliverPlea = (pleaId) => async (dispatch, getState) => {
  dispatch({ type: PLEA_DELIVER_REQUEST, payload: pleaId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/pleas/${pleaId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: PLEA_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PLEA_DELIVER_FAIL, payload: message });
  }
};

export const summaryPlea = () => async (dispatch, getState) => {
  dispatch({ type: PLEA_SUMMARY_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/pleas/summary', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PLEA_SUMMARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PLEA_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
