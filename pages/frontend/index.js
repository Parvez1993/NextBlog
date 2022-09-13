import SectionCard from "../../components/SectionCard";

export async function getStaticProps() {
  const { URL } = process.env;

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`${URL}/api/blogs/category/frontend`);
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}

function frontend({ posts }) {
  return <SectionCard posts={posts} link="frontend" />;
}

export default frontend;
