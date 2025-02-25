import { CircleCheck, Clock, NotebookPen, LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import Header from "./components/LandHeader";
import ImageSlideshow from "./components/ImageSlideshow";
import ThemeShowcase from "./components/ThemesShowcase";

// Types
interface FeatureCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ActionButtonProps {
  children?: React.ReactNode;
}

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

// Constants
const FEATURE_CARDS: FeatureCard[] = [
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

// Components
const ActionButton: React.FC<ActionButtonProps> = () => (
  <button className="bg-gradient-to-r from-[#C0A062] via-[#B8860B] to-[#DAA520] text-white w-fit px-6 py-4 md:px-8 md:py-4 mx-auto rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 text-sm md:text-base hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
    <p className="font-manrope font-bold">Go to Ankh</p>
    <Image
      src="arrow-right.svg"
      alt="arrow navigates to app"
      className="invert w-4 h-4"
      width={16}
      height={16}
      priority
    />
  </button>
);

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  Icon,
}) => (
  <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 relative">
    <Icon className="absolute right-6 md:right-8 text-[#B8860B] opacity-60 w-5 h-5 md:w-6 md:h-6" />
    <h4 className="text-xl md:text-2xl font-manrope leading-tight bg-gradient-to-r from-[#C0A062] to-[#DAA520] text-transparent bg-clip-text mb-3 md:mb-5">
      {title}
    </h4>
    <p className="text-sm md:text-base text-black opacity-75">{description}</p>
  </div>
);

export default async function Home(): Promise<JSX.Element> {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated: boolean = await isAuthenticated();

  return (
    <section className="bg-[#f3f3f3] min-h-screen">
      <Header />
      <main className="px-4 md:px-8 lg:px-16 xl:px-40">
        {/* Hero Section */}
        <div className="flex flex-col gap-6 md:gap-8 text-center items-center justify-center pt-8 md:pt-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-manrope leading-tight px-4">
            <span className="bg-gradient-to-r from-[#C0A062] to-[#DAA520] text-transparent bg-clip-text">
              Pharaoh&apos;s Focus,
            </span>
            <br />
            <span className="bg-gradient-to-b from-black to-[#9C9C9C] text-transparent bg-clip-text">
              Modern Mastery
            </span>
          </h1>
          <p className="text-sm md:text-base font-manrope text-black opacity-70 max-w-xl px-4">
            Craft your daily pyramid of success with smart task prioritization
            and focused time blocks. Inspired by ancient wisdom, powered by
            modern technology.
          </p>
          <div className="z-30">
            {isUserAuthenticated ? (
              <Link href="/dashboard">
                <ActionButton />
              </Link>
            ) : (
              <RegisterLink>
                <ActionButton />
              </RegisterLink>
            )}
          </div>
        </div>

        {/* App Showcase */}
        <div className="flex items-center justify-center mt-8 md:-mt-[150px] mb-32 md:mb-[250px] z-1 px-4">
          <ImageSlideshow />
        </div>

        {/* Features Section */}
        <section id="features" aria-label="Features" className="pt-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-manrope leading-tight bg-gradient-to-b from-black to-[#9C9C9C] text-transparent bg-clip-text mb-3 md:mb-5 px-4">
            Designed to get more done.
          </h2>
          <div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 pb-5 px-4">
              {FEATURE_CARDS.map(({ title, description, icon: Icon }) => (
                <li key={`feature-${title.toLowerCase()}`}>
                  <FeatureCard
                    title={title}
                    description={description}
                    Icon={Icon}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Themes Section */}
        <section className="pt-16 md:pt-24" aria-label="Themes">
          <div className="px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-manrope leading-tight bg-gradient-to-r from-[#C0A062] to-[#DAA520] text-transparent bg-clip-text mb-3 md:mb-5">
              Personalize Your Experience
            </h2>
            <p className="text-sm md:text-base text-black opacity-75 mb-6">
              Discover themes inspired by Egypt&apos;s diverse landscapes, each
              carefully crafted to bring a unique atmosphere to your workspace.
            </p>
          </div>
          <div className="px-4">
            <ThemeShowcase />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 md:mt-24 bg-black text-white py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-manrope font-bold mb-4">Ankh</h3>
              <p className="text-white/75">
                Crafting focus and productivity tools for a balanced digital
                life, inspired by timeless Egyptian wisdom.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-manrope font-bold mb-4">
                Quick Links
              </h4>
              <nav className="flex flex-col gap-2">
                <Link
                  href="#features"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="#themes"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  Themes
                </Link>
              </nav>
            </div>
            <div>
              <h4 className="text-lg font-manrope font-bold mb-4">Contact</h4>
              <a
                href="mailto:talyawy@proton.me"
                className="text-white/75 hover:text-white transition-colors"
              >
                talyawy@proton.me
              </a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
            © {new Date().getFullYear()} Ankh. All rights reserved.
          </div>
        </div>
      </footer>
    </section>
  );
}
