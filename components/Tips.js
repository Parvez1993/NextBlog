import Image from "next/image";
import Link from "next/link";

function Tips({ posts }) {
  return (
    <>
      <div className="py-20 lg:px-10">
        {" "}
        <h3 className="font-bold text-3xl lg:text-3xl text-center mb-28">
          Tips
        </h3>
        <div className="flex items-center flex-col  lg:flex-row justify-center resposive gap-x-2">
          <div className="relative">
            <Image
              src={posts[0].cloudinary_result}
              layout="intrinsic"
              width={600}
              height={400}
              alt="Blog"
            />
            <div className="opacity-0 hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-pink-900  p-11 w-4/5 hover:opacity-90 duration-300 ease-linear">
              <h2 className="text-2xl text">{posts[0].title}</h2>
              <p className="py-2">{posts[0].metaDesc}</p>
              <Link href={`/tips/${posts[0]._id}`}>
                <a className="text-yellow-300 inline-flex items-center">
                  Learn More
                </a>
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src={posts[1].cloudinary_result}
              layout="intrinsic"
              width={600}
              height={400}
              className="object-cover"
              alt="Blog"
            />
            <div className="opacity-0 hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-pink-900  p-11 w-full hover:opacity-90 duration-300 ease-linear inline-block">
              <h2 className="text-xl text">{posts[1].title}</h2>
              <p className="py-2">{posts[1].metaDesc}</p>
              <Link href={`/frontend/${posts[1]._id}`}>
                <a className="text-yellow-300 inline-flex items-center">
                  Learn More
                </a>
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src={posts[2].cloudinary_result}
              layout="intrinsic"
              width={600}
              height={400}
              className="object-cover"
              alt="Blog"
            />
            <div className="opacity-0 hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-pink-900  p-11 w-full hover:opacity-90 duration-300 ease-linear inline-block">
              <h2 className="text-2xl text">{posts[2].title}</h2>
              <p className="py-2">{posts[2].metaDesc}</p>
              <Link href={`/frontend/${posts[2]._id}`}>
                <a className="text-yellow-300 inline-flex items-center">
                  Learn More
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tips;
