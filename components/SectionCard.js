import { BsFillCalendarCheckFill } from "react-icons/bs";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

function SectionCard({ posts }) {
  const { blog } = posts;

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-12">
            {blog.map((item) => {
              return (
                <div
                  className="p-12 md:w-1/2 flex flex-col items-start"
                  key={item._id}
                >
                  <div>
                    {" "}
                    {item.tags.map((i, k) => (
                      <span
                        className="inline-block py-1 px-2 rounded bg-red-50 text-red-500 text-xs font-medium tracking-widest"
                        key={k}
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                  <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
                    {item.title}
                  </h2>
                  <div className="my-5">
                    {" "}
                    <Image
                      src={item.cloudinary_result}
                      alt="image"
                      layout="intrinsic"
                      height="100%"
                      width="100%"
                    />
                  </div>
                  <p className="leading-relaxed mb-8">{item.metaDesc}</p>
                  <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                    <Link href={`/frontend/${item._id}`}>
                      <a className="text-red-500 inline-flex items-center">
                        Learn More
                      </a>
                    </Link>
                    <span className="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1">
                      <BsFillCalendarCheckFill className="mr-5" />
                      {moment(item.createdAt).format("MMM Do YY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default SectionCard;
