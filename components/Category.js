import Image from "next/image";
import Link from "next/link";

function Category() {
  return (
    <>
      <div className="py-20">
        {" "}
        <h3 className="font-bold text-3xl lg:text-5xl text-center mb-28">
          Categories
        </h3>
        <div className="flex justify-center gap-x-20 lg:gap-x-40">
          <Link href="frontend">
            <a>
              <div className="grayscale hover:grayscale-0 transition delay-150 duration-300 cursor-pointer text-red-600 ">
                {" "}
                <Image
                  alt="UX"
                  src="/images/ux.png"
                  layout="intrinsic"
                  width={100}
                  height={100}
                />
                <p className="text-center text-lg font-bold mt-3">Frontend</p>
              </div>
            </a>
          </Link>
          <div className="grayscale hover:grayscale-0 transition delay-150 duration-300 cursor-pointer text-red-600">
            {" "}
            <Image
              alt="backend"
              src="/images/backend.png"
              layout="intrinsic"
              width={100}
              height={100}
            />
            <p className="text-center text-lg font-bold mt-3">Backend</p>
          </div>
          <div className="grayscale hover:grayscale-0 transition delay-150 duration-300 cursor-pointer text-red-600">
            {" "}
            <Image
              alt="tips"
              src="/images/chat.png"
              layout="intrinsic"
              width={100}
              height={100}
            />
            <p className="text-center text-lg font-bold mt-3">Tips</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
