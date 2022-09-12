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

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      backendPosts: posts,
      frontendPosts: posts1,
    },
  };
}

export default function Home({ backendPosts, frontendPosts }) {
  return (
    <>
      <Banner />
      <Category />
      <Frontend posts={frontendPosts} />
      <Backend posts={backendPosts} />
      <Tips />
      <Footer />
    </>
  );
}
