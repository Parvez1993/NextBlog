import { FaStarHalfAlt, FaStar, FaRegStar } from "react-icons/fa";
function Ratings({ ratings, numberOfRatings }) {
  return (
    <>
      <div className="flex gap-4">
        <div className="flex items-center">
          {ratings >= 1 ? (
            <FaStar />
          ) : ratings >= 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}

          {ratings >= 2 ? (
            <FaStar />
          ) : ratings >= 1.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}

          {ratings >= 3 ? (
            <FaStar />
          ) : ratings >= 2.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}

          {ratings >= 4 ? (
            <FaStar />
          ) : ratings >= 3.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}

          {ratings >= 5 ? (
            <FaStar />
          ) : ratings >= 4.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </div>
        <div>
          <p>No of ratings: {numberOfRatings}</p>
        </div>
      </div>
    </>
  );
}

export default Ratings;
