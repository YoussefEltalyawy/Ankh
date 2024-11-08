import Image from "next/image";
import Header from "./components/LandHeader";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { CircleCheck, Clock, NotebookPen } from "lucide-react";
import ImageSlideshow from "./components/ImageSlideshow";
import ThemeShowcase from "./components/ThemesShowcase";

const featureCards = [
  {
    title: "Tasks",
    description:
      "Focus with a streamlined task list, Mark tasks as complete, add quick notes, and track your time with an integrated stopwatch for each task.",
    icon: CircleCheck,
  },
  {
    title: "Notes",
    description:
      "Stay organized with a clean, intuitive notes. Effortlessly edit, or delete notes to keep your thoughts clear and accessible.",
    icon: NotebookPen,
  },
  {
    title: "Stopwatch",
    description:
      "Track your time effortlessly with a minimalist stopwatch that keeps you on task, showing one priority at a time to maintain your focus",
    icon: Clock,
  },
];

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  return (
    <section className="bg-[#f3f3f3] h-full">
      <Header />
      <div className="mx-[160px]">
        <div className="flex flex-col gap-[32px] text-center itmes-center justify-center">
          <h1 className=" text-h1 font-manrope leading-tight bg-gradient-to-b from-black to-[#9C9C9C] text-transparent bg-clip-text">
            Pharaoh&apos;s Focus,<br></br> Modern Mastery
          </h1>
          <p className="text-p font-manrope black70 text-black">
            Craft your daily pyramid of success with smart task <br></br>{" "}
            prioritization and focused time blocks.
          </p>
          {(await isAuthenticated()) ? (
            <div className="z-30">
              <Link href={"/dashboard"}>
                <button className="bg-black z-30 text-white w-fit px-[32px] py-[16px] mx-auto rounded-2xl flex items-center gap-[8px]">
                  <p className="font-manrope text-p font-bold">Go to Ankh</p>
                  <Image
                    src="arrow-right.svg"
                    alt="arrow navigates to app"
                    className="invert w-[16px] h-[16px]"
                    width={16}
                    height={16}
                  />
                </button>
              </Link>
            </div>
          ) : (
            <RegisterLink>
              <button className="bg-black z-30 text-white w-fit px-[32px] py-[16px] mx-auto rounded-2xl flex items-center gap-[8px]">
                <p className="font-manrope text-p font-bold">Go to Ankh</p>
                <Image
                  src="arrow-right.svg"
                  alt="arrow navigates to app"
                  className="invert w-[16px] h-[16px]"
                  width={16}
                  height={16}
                />
              </button>
            </RegisterLink>
          )}
        </div>
        <div className="flex items-center justify-center mt-[-150px] mb-[350px] z-1">
          {/* <Image
            src="/showcase3.png"
            alt="showcase of ankh app"
            className=" w-[1110px]"
            width={1110}
            height={588}
          /> */}
          <ImageSlideshow />
        </div>
        <section>
          <h2 className=" text-h2 font-manrope leading-tight bg-gradient-to-b from-black to-[#9C9C9C] text-transparent bg-clip-text mb-5">
            Designed to get more done.
          </h2>
          <div>
            <ul className="grid grid-cols-3 gap-5 pb-5">
              {featureCards.map((card, index) => (
                <li key={index}>
                  <div className="bg-white p-[2rem] rounded-2xl shadow-md relative">
                    <card.icon className="absolute right-[2rem] text-black opacity-60" />
                    <h4 className="text-h4 font-manrope leading-tight bg-gradient-to-b from-black to-[#9C9C9C] text-transparent bg-clip-text mb-5">
                      {card.title}
                    </h4>
                    <p className="text-p text-black opacity-75">
                      {card.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="pt-[150px]">
          <h2 className=" text-h2 font-manrope leading-tight bg-gradient-to-b from-black to-[#9C9C9C] text-transparent bg-clip-text mb-5">
            Personalize Your Experience.
          </h2>
          <p className="text-lg text-black opacity-75 mb-6">
            Discover themes carefully crafted, brings a unique atmosphere to your
            space, reflecting your mind.
          </p>
          <ThemeShowcase />
        </section>
      </div>
    </section>
  );
}
