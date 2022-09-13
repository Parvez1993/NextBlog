import SectionCard from "../../components/SectionCard";

export async function getStaticProps() {
  const { URL } = process.env;

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`${URL}/api/blogs/category/backend`);
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}

function backend({ posts }) {
  return <SectionCard posts={posts} link="backend" />;
}

export default backend;
