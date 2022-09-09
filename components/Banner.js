import Image from "next/image";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import cls from "classnames";
import styles from "../styles/components/Banner.module.css";
const Banner = () => {
  return (
    <div className="relative">
      <Image
        src="/images/coverphoto.jpg"
        layout="responsive"
        objectFit="cover"
        alt="cover"
        height="40vh"
        width="100vw"
        className="grayscale -z-10 "
      />

      <div className={cls(styles.insetCenter)}>
        <div className="flex flex-col justify-center items-center">
          <div className="shadow-sm text-center bg-slate-100 opacity-90 p-1">
            <h1 className="font-bold text-sm md:text-xl lg:text-3xl  md:p-3 lg:p-4  line  uppercase tracking-wider leading-10 ">
              Dive into the <span className="text-red-600">hottest</span> tech
              topics, tips <span className="text-red-600">&</span> tricks
            </h1>
            <button
              className="text-sm md:text-md bg-red-600 text-white active:bg-red-200 font-bold uppercase  px-3  py-2  rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150 my-3"
              type="button"
            >
              Read More{" "}
              <BsFillArrowRightSquareFill className="inline-block mb-1 ml-2 text-md" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
