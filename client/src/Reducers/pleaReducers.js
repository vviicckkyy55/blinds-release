import {
  PLEA_CREATE_FAIL,
  PLEA_CREATE_REQUEST,
  PLEA_CREATE_RESET,
  PLEA_CREATE_SUCCESS,
  PLEA_DETAILS_FAIL,
  PLEA_DETAILS_REQUEST,
  PLEA_DETAILS_SUCCESS,
  PLEA_MINE_LIST_FAIL,
  PLEA_MINE_LIST_REQUEST,
  PLEA_MINE_LIST_SUCCESS,
  PLEA_PAY_FAIL,
  PLEA_PAY_REQUEST,
  PLEA_PAY_RESET,
  PLEA_PAY_SUCCESS,
  PLEA_LIST_REQUEST,
  PLEA_LIST_SUCCESS,
  PLEA_LIST_FAIL,
  PLEA_DELETE_REQUEST,
  PLEA_DELETE_SUCCESS,
  PLEA_DELETE_FAIL,
  PLEA_DELETE_RESET,
  PLEA_DELIVER_REQUEST,
  PLEA_DELIVER_SUCCESS,
  PLEA_DELIVER_FAIL,
  PLEA_DELIVER_RESET,
  PLEA_SUMMARY_REQUEST,
  PLEA_SUMMARY_SUCCESS,
  PLEA_SUMMARY_FAIL,
} from '../Constants/pleaConstants';

export const pleaCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PLEA_CREATE_REQUEST:
      return { loading: true };
    case PLEA_CREATE_SUCCESS:
      return { loading: false, success: true, plea: action.payload };
    case PLEA_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PLEA_CREATE_RESET:
      return {};
    default:
      return state;
  }
};


export const pleaDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PLEA_DETAILS_REQUEST:
      return { loading: true };
    case PLEA_DETAILS_SUCCESS:
      return { loading: false, plea: action.payload };
    case PLEA_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const pleaPayReducer = (state = {}, action) => {
  switch (action.type) {
    case PLEA_PAY_REQUEST:
      return { loading: true };
    case PLEA_PAY_SUCCESS:
      return { loading: false, success: true };
    case PLEA_PAY_FAIL:
      return { loading: false, error: action.payload };
    case PLEA_PAY_RESET:
      return {};
    default:
      return state;
  }
};


export const pleaMineListReducer = (state = { pleas: [] }, action) => {
  switch (action.type) {
    case PLEA_MINE_LIST_REQUEST:
      return { loading: true };
    case PLEA_MINE_LIST_SUCCESS:
      return { loading: false, pleas: action.payload };
    case PLEA_MINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const pleaListReducer = (state = { pleas: [] }, action) => {
  switch (action.type) {
    case PLEA_LIST_REQUEST:
      return { loading: true };
    case PLEA_LIST_SUCCESS:
      return { loading: false, pleas: action.payload };
    case PLEA_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const pleaDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PLEA_DELETE_REQUEST:
      return { loading: true };
    case PLEA_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PLEA_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PLEA_DELETE_RESET:
      return {};
    default:
      return state;
  }
};


export const pleaDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case PLEA_DELIVER_REQUEST:
      return { loading: true };
    case PLEA_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case PLEA_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case PLEA_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};


export const pleaSummaryReducer = (
  state = { loading: true, summary: {} },
  action
) => {
  switch (action.type) {
    case PLEA_SUMMARY_REQUEST:
      return { loading: true };
    case PLEA_SUMMARY_SUCCESS:
      return { loading: false, summary: action.payload };
    case PLEA_SUMMARY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
