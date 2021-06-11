import { 
  BUCKET_ADD_ASK, 
  BUCKET_ADD_ASK_FAIL,
  BUCKET_EMPTY, 
  BUCKET_REMOVE_ASK, 
  BUCKET_SAVE_COMPLETE_ADDRESS, 
  BUCKET_SAVE_PAYMENT_METHOD 
} from "../Constants/bucketConstants";


export const bucketReducer = (state = { bucketAsks: [] }, action) => {
  switch (action.type) {
    case BUCKET_ADD_ASK:
      const ask = action.payload;
      const existAsk = state.bucketAsks.find((x) => x.screen === ask.screen)
      if(existAsk) {
        return {
          ...state,
          bucketAsks: state.bucketAsks.map((x) =>
            x.screen === existAsk.screen 
            ? ask 
            : x 
          ),
        };
      } else {
        return {
          ...state,
          bucketAsks: [...state.bucketAsks, ask]
        };
      };

    case BUCKET_REMOVE_ASK:
      return {
        ...state,
        bucketAsks: state.bucketAsks.filter((x) => x.screen !== action.payload)
      };
    case BUCKET_SAVE_COMPLETE_ADDRESS:
      return {
        ...state,
        completeAddress: action.payload
      };
    case BUCKET_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      };
    case BUCKET_ADD_ASK_FAIL:
      return {
        ...state,
        error: action.payload
      };
    case BUCKET_EMPTY:
      return {
        ...state,
        bucketAsks: []
      };
    default:
      return state;
  }
};