import moment from "moment";
import Image from "next/image";

export async function getStaticPaths() {
  const { URL } = process.env;
  // Call an external API endpoint to get posts
  const res = await fetch(`${URL}/api/blogs`);
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post._id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { URL } = process.env;

  let id = params.id;
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`${URL}/api/blogs/${id}`);
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}

function SingleTipsBlog({ posts }) {
  console.log(posts);
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

          <div className="leading-1 mt-10">
            {`Published on ${moment(posts.createdAt).format("MMM Do YY")}`}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleTipsBlog;
