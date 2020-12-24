import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./src/redux/reducers";

const persistConfig = {
  version: 1,
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  // Prevent persisting when development
  let persistor =
    process.env.NODE_ENV !== "production"
      ? persistStore(store, {manualPersist: true})
      : persistStore(store);
  return { store, persistor };
};
