import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Comment from "../../components/Comment";
import Ratings from "../../components/Ratings";
import { useAuthStore } from "../../contextApi/UserContext";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { URL } = process.env;
  const res = await fetch(`${URL}/api/blogs/${id}`);
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
}

function SingleBackendBlog({ posts }) {
  const { authState } = useAuthStore();
  const { user } = authState;
  const router = useRouter();
  const { id } = router.query;
  const [refresh, setRefresh] = useState(false);
  const { numReviews } = posts;
  //refresh data
  const refreshData = () => {
    setRefresh(false);
    router.replace(router.asPath);
  };

  useEffect(() => {
    refreshData();
  }, [refresh]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            {posts.title}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            {posts.metaDesc}
          </p>
          <div className="flex justify-center mt-3">
            {posts.tags.map((post) => {
              return (
                <>
                  <div className="bg-red-600 text-white p-2 rounded-lg">
                    {post}
                  </div>
                </>
              );
            })}
          </div>

          <div className="py-32">
            <Image
              src={posts.cloudinary_result}
              layout="intrinsic"
              width={600}
              height={400}
              alt="name"
            />
          </div>
          <div className="lg:w-2/3 mx-auto leading-relaxed text-base text-left">
            <div
              dangerouslySetInnerHTML={{
                __html: posts.content,
              }}
            ></div>
          </div>

          <div className="leading-1 mt-10 ">
            {`Published on ${moment(posts.createdAt).format("MMM Do YY")}`}
          </div>
        </div>

        {/* //ratings */}

        {posts.reviews.length === 0 && (
          <p className="text-xl font-bold mt-2 text-center text-red-200 bg-red-800 w-1/4 mx-auto p-3">
            No Reviews
          </p>
        )}
      </div>

      <h2 className="py-10 text-2xl text-center">Please give us a review</h2>
      <div className="flex justify-center flex-wrap items-start px-5 py-10 gap-x-10">
        <Comment id={id} user={user?.token} setRefresh={setRefresh} />

        <div className="w-3/4 md:w-2/4">
          <h2 className="py-5 font-semibold">Customer Reviews</h2>
          {posts.reviews.length === 0 && (
            <h2 className="py-5 font-semibold">
              No Reviews yet write something !!!!
            </h2>
          )}
          {posts.reviews.map((i) => {
            return (
              <>
                <div className="flex gap-y-2 " key={i._id}>
                  {/* mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 */}

                  <div className="flex-1 w-full border-4 border-grey-600 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed mb-4">
                    <Ratings ratings={i.rating} numberOfRatings={i.rating} />
                    <strong>{i.name}</strong>{" "}
                    <span className="text-xs text-gray-400">
                      {moment(i.createdAt).format("MMM Do YY")}
                    </span>
                    <p className="text-sm">{i.comment}</p>
                    <div className="mt-4 flex items-center">
                      <div className="flex -space-x-2 mr-2"></div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SingleBackendBlog;
