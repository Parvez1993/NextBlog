import Image from "next/image";
import cls from "classnames";
import styles from "../styles/components/Frontend.module.css";

function Frontend() {
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
              src="/images/Blog.jpg"
              layout="intrinsic"
              width={600}
              height={400}
            />
            <div className="opacity-0 hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-pink-900  p-11 w-4/5 hover:opacity-90 duration-300 ease-linear">
              <h2 className="text-2xl text">What is Frontend?</h2>
              <p className="py-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="relative">
              <Image
                src="/images/Blog.jpg"
                layout="intrinsic"
                width={600}
                height={200}
                className="object-cover"
              />
              <div className="opacity-0 hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-pink-900  p-11 w-4/5 hover:opacity-90 duration-300 ease-linear">
                <h2 className="text-xl text">What is Frontend?</h2>
                <p className="py-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/Blog.jpg"
                layout="intrinsic"
                width={600}
                height={200}
                className="object-cover"
              />
              <div className="opacity-0 hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-pink-900  p-11 w-4/5 hover:opacity-90 duration-300 ease-linear">
                <h2 className="text-2xl text">What is Frontend?</h2>
                <p className="py-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Frontend;
