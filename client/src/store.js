// reducer store
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { bucketReducer } from './Reducers/bucketReducers';
import { 
  pleaCreateReducer, 
  pleaDeleteReducer, 
  pleaDeliverReducer, 
  pleaDetailsReducer, 
  pleaListReducer, 
  pleaMineListReducer, 
  pleaPayReducer, 
  pleaSummaryReducer 
} from './Reducers/pleaReducers';

import { 
  screenCategoryListReducer, 
  screenCreateReducer, 
  screenDetailsReducer, 
  screenListReducer, 
  screenReviewCreateReducer, 
  screentDeleteReducer, 
  screenUpdateReducer 
} from './Reducers/screenReducers';

import { 
  userAddressMapReducer, 
  userDeleteReducer, 
  userDetailsReducer, 
  userListReducer, 
  userTopMasterListReducer, 
  userSigninReducer, 
  userSignupReducer, 
  userUpdateProfileReducer, 
  userUpdateReducer 
} from './Reducers/userReducers';



const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo') 
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  bucket: {
    bucketAsks: localStorage.getItem('bucketAsks')
      ? JSON.parse(localStorage.getItem('bucketAsks'))
      : [],
      completeAddress: localStorage.getItem('completeAddress')
        ? JSON.parse(localStorage.getItem('completeAddress'))
        : {},
        paymentMethod: 'PayPal',
  },
};

const reducer = combineReducers({
  screenList: screenListReducer,
  screenDetails: screenDetailsReducer,
  screenCreate: screenCreateReducer,
  screenUpdate: screenUpdateReducer,
  screenDelete: screentDeleteReducer,
  screenCategoryList: screenCategoryListReducer,
  screenReviewCreate: screenReviewCreateReducer,
  pleaCreate: pleaCreateReducer,
  pleaDetails: pleaDetailsReducer,
  pleaPay: pleaPayReducer,
  pleaMineList: pleaMineListReducer,
  pleaList : pleaListReducer,
  pleaDelete: pleaDeleteReducer,
  pleaDeliver: pleaDeliverReducer,
  pleaSummary: pleaSummaryReducer,
  bucket: bucketReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userTopMastersList: userTopMasterListReducer,
  userAddressMap: userAddressMapReducer,
});


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer, 
  initialState, 
  composeEnhancer(applyMiddleware(thunk))
);

export default store;