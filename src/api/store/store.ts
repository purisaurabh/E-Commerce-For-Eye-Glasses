import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productApi } from "../productsApi";
import { categoryApi } from "../categoryApi";
import { cartApi } from "../cartApi";
import { searchApi } from "../searchApi";
import { reviewApi } from "../reviewApi";
import { orderApi } from "../orderApi";
import { userApi } from "../userApi";
import authReducer from "./authSlice";
import { colorApi } from "../colorApi";
import { userOperation } from "../userOperationApi";

// Load persisted state from local storage
const persistedState = localStorage.getItem("reduxState");
const initialState = persistedState ? JSON.parse(persistedState) : undefined;

// Extract the preloaded state for the auth reducer
const preloadedAuthState = initialState ? initialState.auth : undefined;

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [colorApi.reducerPath]: colorApi.reducer,
  [userOperation.reducerPath]: userOperation.reducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // initial state of the redux store
  preloadedState: { auth: preloadedAuthState },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      productApi.middleware,
      categoryApi.middleware,
      cartApi.middleware,
      searchApi.middleware,
      reviewApi.middleware,
      orderApi.middleware,
      colorApi.middleware,
      userOperation.middleware
    ),
});

store.subscribe(() => {
  // get the current state of store and extract the auth slice of the state
  // authState contain thhe current authentication status
  const authState = store.getState().auth;
  const state = JSON.stringify({ auth: authState });
  localStorage.setItem("reduxState", state);
});

// Add event listener to save auth state to local storage before page unload
window.addEventListener("beforeunload", () => {
  const authState = store.getState().auth;
  const state = JSON.stringify({ auth: authState });
  localStorage.setItem("reduxState", state);
});

// Function to clear stored state
export const clearStoredState = () => {
  localStorage.removeItem("reduxState");
};

export type RootState = ReturnType<typeof rootReducer>;
export default store;
