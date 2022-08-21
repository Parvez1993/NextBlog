import React, { useContext } from "react";
import { useReducer } from "react";

export const BlogContext = React.createContext();

const initialState = {
  blogs: [],
  editBlog: [],
  success: false,
  error: null,
  loading: false,
  image: null,
};

function blogReducer(state, action) {
  switch (action.type) {
    case "BLOG_LOADING":
      return {
        ...state,
        loading: true,
      };

    case "BLOG_IMAGE":
      return {
        ...state,
        loading: false,
        image: action.payload,
      };

    case "BLOG_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        blogs: action.payload,
      };

    case "BLOG_RESET":
      return {
        ...state,
        blogs: [],
        success: false,
        error: null,
        loading: false,
        editBlog: [],
      };

    case "BLOG_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const BlogProvider = ({ children }) => {
  const [blogState, blogDispatch] = useReducer(blogReducer, initialState);

  let value = { blogState, blogDispatch };

  return (
    <>
      <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
    </>
  );
};

export function useBlogStore() {
  return useContext(BlogContext);
}
