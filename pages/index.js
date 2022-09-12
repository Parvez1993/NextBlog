import Backend from "../components/Backend";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Footer from "../components/Footer";
import Frontend from "../components/Frontend";
import Tips from "../components/Tips";

export async function getStaticProps() {
  const { URL } = process.env;

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`${URL}/api/blogs/backend`);
  const posts = await res.json();

  const res1 = await fetch(`${URL}/api/blogs/frontend`);
  const posts1 = await res1.json();

  const res2 = await fetch(`${URL}/api/blogs/tips`);
  const posts2 = await res2.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      backendPosts: posts,
      frontendPosts: posts1,
      tipsPosts: posts2,
    },
  };
}

export default function Home({ backendPosts, frontendPosts, tipsPosts }) {
  return (
    <>
      <Banner />
      <Category />
      <Frontend posts={frontendPosts} />
      <Backend posts={backendPosts} />
      <Tips posts={tipsPosts} />
      <Footer />
    </>
  );
}
