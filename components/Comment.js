import axios from "axios";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useCreateBlog } from "../contextApi/Comment";

function Comment({ id, user, setRefresh }) {
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState(0);
  const { createReviewDispatch } = useCreateBlog();

  ratings;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return window.alert("Login in First");
    }
    try {
      createReviewDispatch({ type: "PRODUCT_CREATE_REVIEW_BEGIN" });
      const data = await axios.post(
        `/api/blogs/comment/${id}`,
        { rating: ratings, comment },
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      createReviewDispatch({ type: "PRODUCT_CREATE_REVIEW_SUCCESS" });
      setRefresh(true);
    } catch (error) {
      createReviewDispatch({
        type: "PRODUCT_CREATE_REVIEW_FAIL",
        payload: error?.response?.data,
      });

      return window.alert(error?.response?.data);
    }
  };

  return (
    <>
      <div>
        <div className="py-3 px-4">
          <ReactStars
            count={5}
            onChange={(newRating) => {
              setRatings(newRating);
            }}
            size={24}
            activeColor="#ffd700"
          />
        </div>
        <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
          <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
              Add a new comment
            </h2>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                name="body"
                placeholder="Type Your Comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                required
              ></textarea>
            </div>
            <div className="w-full md:w-full flex items-start  px-3">
              <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                <svg
                  fill="none"
                  className="w-5 h-5 text-gray-600 mr-1"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-xs md:text-sm pt-px">
                  Write Anything you want
                </p>
              </div>
              <div className="-mr-1">
                <button
                  onClick={handleSubmit}
                  className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100 cursor-pointer"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Comment;
