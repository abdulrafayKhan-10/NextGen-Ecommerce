import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import cartItemReducer from './slices/cartItemSlice';
import categoryReducer from './slices/categorySlice';
import imageReducer from './slices/imageSlice';
import orderReducer from './slices/orderSlice';

const rootReducer = combineReducers({
  userR: userReducer,
  authR: authReducer,
  productR: productReducer,
  cartR: cartReducer,
  cartItemsR: cartItemReducer,
  categoryR: categoryReducer,
  imageR: imageReducer,
  orderR: orderReducer,
});

export default rootReducer;
