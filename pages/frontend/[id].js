import Image from "next/image";

function SingleFrontendBlog() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Master Cleanse Reliac Heirloom
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them man bun deep.
          </p>

          <div className="py-32">
            <Image
              src="/images/Blog.jpg"
              layout="intrinsic"
              width={600}
              height={400}
              alt="name"
            />
          </div>
          <div className="lg:w-2/3 mx-auto leading-relaxed text-base text-left">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them man bun deep.
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleFrontendBlog;
