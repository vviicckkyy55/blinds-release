import Axios from 'axios';
import { 
  BUCKET_ADD_ASK, 
  BUCKET_REMOVE_ASK,
  BUCKET_SAVE_COMPLETE_ADDRESS,
  BUCKET_SAVE_PAYMENT_METHOD, 
  BUCKET_ADD_ASK_FAIL
} from '../Constants/bucketConstants';


export const addToBucket = (screenId, slots) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/screens/${screenId}`);
  const { bucket: { bucketAsks } } = getState();
  if(bucketAsks.length > 0 && data.master._id !== bucketAsks[0].master._id) {
    dispatch({
      type: BUCKET_ADD_ASK_FAIL,
      payload: `Can't Add to Bucket. Ask only from ${bucketAsks[0].master.master.name} in this order`,
    });
    } else {
    dispatch({
      type: BUCKET_ADD_ASK,
      payload: {
        name: data.name,
        image: data.image,
        costPerSlot: data.costPerSlot,
        slotsAvailable: data.slotsAvailable,
        screen: data._id,
        master: data.master,
        slots,
      },
    });
    localStorage.setItem('bucketAsks', JSON.stringify(getState().bucket.bucketAsks));
  }
};

export const removeFromBucket = (screenId) => (dispatch, getState) => {
  dispatch({
    type: BUCKET_REMOVE_ASK,
    payload: screenId
  });
  localStorage.setItem('bucketAsks', JSON.stringify(getState().bucket.bucketAsks));
};


export const saveCompleteAddress = (data) => (dispatch) => {
  dispatch({
    type: BUCKET_SAVE_COMPLETE_ADDRESS,
    payload: data
  });
  localStorage.setItem('completeAddress', JSON.stringify(data));
};


export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: BUCKET_SAVE_PAYMENT_METHOD,
    payload: data
  });
};