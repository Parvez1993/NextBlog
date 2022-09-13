import Image from "next/image";
import Link from "next/link";

function Frontend({ posts }) {
  return (
    <>
      <div className="py-20">
        {" "}
        <h3 className="font-bold text-3xl lg:text-5xl text-center mb-28">
          Frontend
        </h3>
        <div className="flex items-center flex-col lg:flex-row justify-center resposive gap-x-2">
          <div className="relative">
            <Image
              src={posts[0].cloudinary_result}
              layout="intrinsic"
              width={600}
              height={400}
              alt="frontend image"
            />
            <div className="opacity-0 hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-pink-900  p-11 w-4/5 hover:opacity-90 duration-300 ease-linear">
              <h2 className="text-xl text">{posts[0].title}</h2>
              <p className="py-2">{posts[0].metaDesc}</p>
              <Link href={`/frontend/${posts[0]._id}`}>
                <a className="text-yellow-300 inline-flex items-center">
                  Learn More
                </a>
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="relative">
              <Image
                src={posts[1].cloudinary_result}
                layout="intrinsic"
                width={600}
                height={200}
                className="object-cover"
                alt="frontend image"
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
                height={200}
                className="object-cover"
                alt="frontend image"
              />
              <div className="opacity-0 hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-pink-900  p-11 w-full hover:opacity-90 duration-300 ease-linear inline-block">
                <h2 className="text-xl text">{posts[2].title}</h2>
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
      </div>
    </>
  );
}

export default Frontend;
