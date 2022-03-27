import { configureStore } from '@reduxjs/toolkit';
import dialogReducer from './reducer/DialogReducer';
import userInfoReducer from './reducer/UserInfoReducer';

const store = configureStore(
  {
    reducer   : {
      dialog: dialogReducer,
      userInfo: userInfoReducer,
    }
  }
);

export default store;