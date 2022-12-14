import React, { useContext } from "react";
import { useReducer } from "react";

export const AuthContext = React.createContext();

const initialState = {
  user:
    typeof window !== "undefined"
      ? localStorage.getItem("userBlogInfo")
        ? JSON.parse(localStorage.getItem("userBlogInfo"))
        : ""
      : null,
  loading: false,
  error: null,
  users: [],
};

function authReducer(state, action) {
  switch (action.type) {
    case "AUTH_LOADING":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "AUTH_SUCCESS":
      let userInfo = action.payload;
      return {
        ...state,
        loading: false,
        error: "",
        user: userInfo,
      };

    case "AUTH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "AUTH_LOGOUT":
      return {
        ...state,
        user: "",
        loading: false,
        error: "",
      };

    case "GET_ALL_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: "",
      };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  let value = { authState, authDispatch };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
};

export function useAuthStore() {
  return useContext(AuthContext);
}
