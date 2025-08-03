import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contextSlice from "./slices/contextSlice";
import homeSlice from "./slices/homeSlice";
import byeSlice from "./slices/byeSlice";

const persistConfig = {
    key: 'root',
    storage
  };

  const rootReducer = combineReducers({
    context: contextSlice,
    home: homeSlice,
    bye: byeSlice
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer
  });

  const persistor = persistStore(store); 

  export { store, persistor };
