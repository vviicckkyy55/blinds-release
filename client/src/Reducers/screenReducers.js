import { 
  SCREEN_CATEGORY_LIST_FAIL,
  SCREEN_CATEGORY_LIST_REQUEST,
  SCREEN_CATEGORY_LIST_SUCCESS,
  SCREEN_CREATE_FAIL,
  SCREEN_CREATE_REQUEST,
  SCREEN_CREATE_RESET,
  SCREEN_CREATE_SUCCESS,
  SCREEN_DELETE_FAIL,
  SCREEN_DELETE_REQUEST,
  SCREEN_DELETE_RESET,
  SCREEN_DELETE_SUCCESS,
  SCREEN_DETAILS_FAIL, 
  SCREEN_DETAILS_REQUEST, 
  SCREEN_DETAILS_SUCCESS, 
  SCREEN_LIST_FAIL, 
  SCREEN_LIST_REQUEST, 
  SCREEN_LIST_SUCCESS, 
  SCREEN_REVIEW_CREATE_FAIL, 
  SCREEN_REVIEW_CREATE_REQUEST, 
  SCREEN_REVIEW_CREATE_RESET, 
  SCREEN_REVIEW_CREATE_SUCCESS, 
  SCREEN_UPDATE_FAIL, 
  SCREEN_UPDATE_REQUEST, 
  SCREEN_UPDATE_RESET,
  SCREEN_UPDATE_SUCCESS
} from "../Constants/screenConstants";

export const screenListReducer = (state = { loading: true, screens: [] }, action) => {
  switch(action.type) {
    case SCREEN_LIST_REQUEST:
      return { loading: true };
    case SCREEN_LIST_SUCCESS:
      return { 
        loading: false, 
        screens: action.payload.screens, 
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case SCREEN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const screenCategoryListReducer = (state = {loading: true, screens: [] }, action) => {
  switch(action.type) {
    case SCREEN_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case SCREEN_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case SCREEN_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const screenDetailsReducer = (state = { loading: true }, action) => {
  switch(action.type) {
    case SCREEN_DETAILS_REQUEST:
      return { loading: true };
    case SCREEN_DETAILS_SUCCESS:
      return { loading: false, screen: action.payload };
    case SCREEN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const screenCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SCREEN_CREATE_REQUEST:
      return { loading: true };
    case SCREEN_CREATE_SUCCESS:
      return { loading: false, success: true, screen: action.payload };
    case SCREEN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SCREEN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const screenUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SCREEN_UPDATE_REQUEST:
      return { loading: true };
    case SCREEN_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case SCREEN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SCREEN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const screentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SCREEN_DELETE_REQUEST:
      return { loading: true };
    case SCREEN_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SCREEN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case SCREEN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const screenReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SCREEN_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case SCREEN_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case SCREEN_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SCREEN_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};