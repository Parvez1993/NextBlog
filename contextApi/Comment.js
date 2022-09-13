import React, { useContext } from "react";
import { useReducer } from "react";

export const ReviewBlogContext = React.createContext();

const initialState = {
  created_product: [],
  success: false,
  error: null,
  loading: false,
  image: [],
};

function createReviewReducer(state, action) {
  switch (action.type) {
    case "PRODUCT_CREATE_REVIEW_BEGIN":
      return { ...state, loading: true };
    case "PRODUCT_CREATE_REVIEW_SUCCESS":
      return { ...state, loading: false, success: true };
    case "PRODUCT_CREATE_REVIEW_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PRODUCT_CREATE_REVIEW_RESET":
      return {};
    default:
      return state;
  }
}

export const ReviewBlogProvider = ({ children }) => {
  const [createReviewState, createReviewDispatch] = useReducer(
    createReviewReducer,
    initialState
  );

  let value = { createReviewState, createReviewDispatch };

  return (
    <>
      <ReviewBlogContext.Provider value={value}>
        {children}
      </ReviewBlogContext.Provider>
    </>
  );
};

export function useCreateBlog() {
  return useContext(ReviewBlogContext);
}
