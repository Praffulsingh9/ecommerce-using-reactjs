import axios from "axios";
import { USER_SERVER, PRODUCT_SERVER } from "../components/utils/misc";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BY_USER,
  UPDATE_USER_DATA,
  CLEAR_UPDATE_USER_DATA
} from "./types";

export const loginUser = dataToSubmit => {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request
  };
};

export const registerUser = dataToSubmit => {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request
  };
};

export const auth = () => {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request
  };
};

export const logoutUser = () => {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then(response => response.data);

  return {
    type: LOGOUT_USER,
    payload: request
  };
};

export const addToCart = _id => {
  const request = axios
    .post(`${USER_SERVER}/addToCart?productId=${_id}`)
    .then(response => response.data);

  return {
    type: ADD_TO_CART,
    payload: request
  };
};

export const getCartItems = (cartItems, userCart) => {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
    .then(response => {
      userCart.forEach(item => {
        response.data.forEach((k, i) => {
          if (item.id === k._id) {
            response.data[i].quantity = item.quantity;
          }
        });
      });
      return response.data;
    });
  return {
    type: GET_CART_ITEMS_USER,
    payload: request
  };
};

export const removeCartItem = id => {
  const request = axios
    .get(`${USER_SERVER}/removeFromCart?_id=${id}`)
    .then(response => {
      response.data.cart.forEach(item => {
        response.data.cartDetail.forEach((k, i) => {
          if (item.id === k._id) {
            response.data.cartDetail[i].quantity = item.quantity;
          }
        });
      });
      return response.data;
    });

  return {
    type: REMOVE_CART_ITEM,
    payload: request
  };
};

export const onSuccessBuy = data => {
  const request = axios
    .post(`${USER_SERVER}/successBuy`, data)
    .then(response => response.data);
  return {
    type: ON_SUCCESS_BY_USER,
    payload: request
  };
};

export function updateUserData(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/update_profile`, dataToSubmit)
    .then(response => {
      return response.data;
    });

  return {
    type: UPDATE_USER_DATA,
    payload: request
  };
}

export function clearUpdateUser() {
  return {
    type: CLEAR_UPDATE_USER_DATA,
    payload: ""
  };
}
