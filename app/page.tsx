import Image from "next/image";
import Header from "./components/Header";
export default function Home() {
  return (
    <>
      <Header />
      <div className="mx-[160px]">
        <div className="flex flex-col gap-[32px] text-center itmes-center justify-center">
          <h1 className=" text-h1 font-manrope leading-tight bg-gradient-to-b from-black to-[#9C9C9C] text-transparent bg-clip-text">
            Pharaoh&apos;s Focus,<br></br> Modern Mastery
          </h1>
          <p className="text-p font-manrope black70">
            Craft your daily pyramid of success with smart task <br></br>{" "}
            prioritization and focused time blocks.
          </p>
          <button className="bg-black z-1 text-white w-fit px-[32px] py-[16px] mx-auto rounded-2xl flex items-center gap-[8px]">
            <p className="font-manrope text-p font-bold">Go to Ankh</p>
            <Image
              src="arrow-right.svg"
              alt="arrow navigates to app"
              className="invert w-[16px] h-[16px]"
              width={16}
              height={16}
            />
          </button>
        </div>
        <div className="flex items-center justify-center mt-[-150px]">
          <Image src="blury-circle.svg" alt="" className="relative" width={1184} height={1184} />
          <Image
            src="/showcase.png"
            alt="showcase of ankh app"
            className="absolute w-[1110px]"
            width={1110}
            height={588}
          />
        </div>
      </div>
    </>
  );
}
