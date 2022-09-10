import Backend from "../components/Backend";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Footer from "../components/Footer";
import Frontend from "../components/Frontend";
import Tips from "../components/Tips";

export default function Home() {
  return (
    <>
      <Banner />
      <Category />
      <Frontend />
      <Backend />
      <Tips />
      <Footer />
    </>
  );
}
