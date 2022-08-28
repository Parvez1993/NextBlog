import React, { useContext } from "react";
import { useReducer } from "react";

export const AdminProductContext = React.createContext();

const initialState = {
  created_product: [],
  success: false,
  error: null,
  loading: false,
  image: [],
};

function createProductReducer(state, action) {
  switch (action.type) {
    case "ADMIN_LOADING":
      return {
        ...state,
        loading: true,
        success: false,
      };
    case "ADMIN_IMAGE_SUCCESS":
      return {
        ...state,
        success: false,
        image: action.payload,
        error: null,
      };

    case "ADMIN_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        created_product: action.payload,
        success: true,
      };

    case "ADMIN_RESET":
      return {
        ...state,
        created_product: [],
        success: false,
        error: null,
        loading: false,
        image: [],
      };

    case "ADMIN_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const AdminProductProvider = ({ children }) => {
  const [createProductState, createProductDispatch] = useReducer(
    createProductReducer,
    initialState
  );

  let value = { createProductState, createProductDispatch };

  return (
    <>
      <AdminProductContext.Provider value={value}>
        {children}
      </AdminProductContext.Provider>
    </>
  );
};

export function useCreateProductStore() {
  return useContext(AdminProductContext);
}
