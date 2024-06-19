import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducer/authSlice";

const authPersistConfig = {
  key: "auth",
  storage: storage,
};

const store = configureStore({
  reducer: combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
  }),
});

export const persistor = persistStore(store);

export default store;
