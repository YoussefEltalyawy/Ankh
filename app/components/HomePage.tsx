"use client";

import { CircleCheck, Clock, NotebookPen, LucideIcon, Sparkles, ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";

import Header from "./LandHeader";
import ImageSlideshow from "./ImageSlideshow";
import ThemeShowcase from "./ThemesShowcase";

// Types
interface FeatureCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ActionButtonProps {
  children?: React.ReactNode;
  primary?: boolean;
}

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

interface HomePageProps {
  isUserAuthenticated: boolean;
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

// Testimonials
const TESTIMONIALS = [
  {
    quote: "Ankh has transformed how I organize my day. The Egyptian-inspired themes are both beautiful and functional!",
    author: "Sarah J.",
    role: "Product Manager",
    avatar: "/avatars/avatar1.jpg"
  },
  {
    quote: "My productivity has increased by 30% since using Ankh. The focused task management is exactly what I needed.",
    author: "Michael T.",
    role: "Software Developer",
    avatar: "/avatars/avatar2.jpg"
  },
  {
    quote: "I love how Ankh combines aesthetics with functionality. The stopwatch feature is particularly useful for my workflow.",
    author: "Amira K.",
    role: "UX Researcher",
    avatar: "/avatars/avatar3.jpg"
  }
];

// Components
const ActionButton: React.FC<ActionButtonProps> = ({ primary = true }) => (
  <button className={`${primary
    ? "bg-gradient-to-r from-[#C0A062] via-[#B8860B] to-[#DAA520] text-white"
    : "bg-white text-[#B8860B] border border-[#B8860B]"} 
    w-fit px-6 py-4 md:px-8 md:py-4 mx-auto rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 text-sm md:text-base 
    hover:shadow-xl hover:scale-[1.02] transition-all duration-200`}>
    <p className="font-manrope font-bold">Go to Ankh</p>
    <ArrowRight className="w-4 h-4" />
  </button>
);

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  Icon,
}) => (
  <motion.div
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 relative group"
  >
    <div className="absolute top-6 right-6 md:right-8 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#C0A062] to-[#DAA520] rounded-full text-white transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
      <Icon className="w-6 h-6" />
    </div>
    <h4 className="text-xl md:text-2xl font-manrope leading-tight bg-gradient-to-r from-[#C0A062] to-[#DAA520] text-transparent bg-clip-text mb-3 md:mb-5">
      {title}
    </h4>
    <p className="text-sm md:text-base text-black/70">{description}</p>
    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
      <span className="text-[#B8860B] text-sm font-medium">Learn more</span>
      <ArrowRight className="w-4 h-4 text-[#B8860B]" />
    </div>
  </motion.div>
);

const TestimonialCard = ({ quote, author, role, avatar, index }: { quote: string, author: string, role: string, avatar: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15 }}
    className="bg-white p-8 rounded-xl shadow-md flex flex-col relative z-10 h-full hover:shadow-xl transition-all duration-300"
  >
    <div className="mb-6 text-[#B8860B]">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 11L8 17H5L7 11V7H10V11ZM18 11L16 17H13L15 11V7H18V11Z" fill="currentColor" opacity="0.8" />
      </svg>
    </div>
    <p className="italic text-black/75 mb-6 text-lg">{quote}</p>
    <div className="mt-auto flex items-center">
      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-[#B8860B]/30">
        <Image
          src={avatar}
          alt={author}
          width={48}
          height={48}
          className="object-cover w-full h-full"
        />
      </div>
      <div>
        <p className="font-bold text-[#B8860B]">{author}</p>
        <p className="text-sm text-black/60">{role}</p>
      </div>
    </div>

    <div className="absolute top-2 right-2 opacity-10">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 11L8 17H5L7 11V7H10V11ZM18 11L16 17H13L15 11V7H18V11Z" fill="#B8860B" opacity="0.8" />
      </svg>
    </div>
  </motion.div>
);

const SectionDivider = () => (
  <div className="relative my-16 md:my-24 px-4">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-200"></div>
    </div>
    <div className="relative flex justify-center">
      <div className="bg-[#f9f9f9] px-6">
        <div className="w-2 h-2 rounded-full bg-[#B8860B]/40"></div>
      </div>
    </div>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ isUserAuthenticated }) => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <section className="bg-gradient-to-b from-[#f9f9f9] to-[#f3f3f3] min-h-screen">
      <Header />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-[#C0A062]/5 to-transparent"></div>
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-[url('/hero-pattern.svg')] bg-repeat opacity-5"></div>
          </div>

          <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 pt-20 pb-24 md:pt-28 md:pb-36">
            <div className="flex flex-col gap-6 md:gap-8 text-center items-center justify-center max-w-4xl mx-auto">
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-[#B8860B] shadow-sm mb-2">
                <Sparkles className="w-4 h-4 mr-2" />
                <span>Focus like never before</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-manrope font-bold leading-tight">
                <span className="bg-gradient-to-r from-[#C0A062] to-[#DAA520] text-transparent bg-clip-text">
                  Pharaoh&apos;s Focus,
                </span>
                <br />
                <span className="bg-gradient-to-b from-black to-[#9C9C9C] text-transparent bg-clip-text">
                  Modern Mastery
                </span>
              </h1>

              <p className="text-base md:text-xl font-manrope text-black opacity-70 max-w-2xl leading-relaxed">
                Craft your daily pyramid of success with smart task prioritization
                and focused time blocks. Inspired by ancient wisdom, powered by
                modern technology.
              </p>

              <div className="z-30 flex flex-col md:flex-row gap-4 mt-6">
                {isLoading ? (
                  <div className="w-fit px-6 py-4 md:px-8 md:py-4 mx-auto rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 text-sm md:text-base bg-gray-100 text-gray-500">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    <p className="font-manrope font-bold">Loading...</p>
                  </div>
                ) : isUserAuthenticated ? (
                  <Link href="/dashboard">
                    <ActionButton />
                  </Link>
                ) : (
                  <button onClick={() => signIn()}>
                    <ActionButton />
                  </button>
                )}
              </div>

              <div className="w-full max-w-3xl mt-4 mb-4">
                <p className="text-sm text-black/50 font-medium">Trusted by productivity enthusiasts worldwide</p>
              </div>

              <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center text-black/40 animate-bounce">
                <span className="text-sm font-medium mb-1">Scroll to explore</span>
                <ChevronDown size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* App Showcase */}
        <div className="bg-[#f7f7f7]">
          <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 py-20 md:py-32">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center bg-[#B8860B]/10 px-4 py-2 rounded-full text-sm text-[#B8860B] mb-4">
                <span>Discover the Experience</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-manrope font-bold leading-tight mb-6">
                <span className="bg-gradient-to-b from-black to-[#9C9C9C] text-transparent bg-clip-text">
                  Seamless. Intuitive. Beautiful.
                </span>
              </h2>
              <p className="text-black/70 md:text-lg max-w-xl mx-auto">
                Experience productivity like never before with our intuitive interface
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <ImageSlideshow />
            </div>
          </div>
        </div>

        <SectionDivider />

        {/* Features Section */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <section id="features" aria-label="Features" className="py-20 md:py-32">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center bg-[#B8860B]/10 px-4 py-2 rounded-full text-sm text-[#B8860B] mb-4">
                <span>Powerful Features</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-manrope font-bold leading-tight bg-gradient-to-b from-black to-[#9C9C9C] text-transparent bg-clip-text mb-6">
                Designed to help you get more done
              </h2>
              <p className="text-black/70 max-w-xl mx-auto md:text-lg">
                Our features work seamlessly together to create a productivity ecosystem that adapts to your workflow
              </p>
            </div>

            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#B8860B]/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[#DAA520]/5 rounded-full blur-3xl"></div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
              >
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pb-5">
                  {FEATURE_CARDS.map(({ title, description, icon: Icon }, index) => (
                    <motion.li
                      key={`feature-${title.toLowerCase()}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <FeatureCard
                        title={title}
                        description={description}
                        Icon={Icon}
                      />
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <div className="flex justify-center mt-16">
                <div className="inline-flex bg-white/80 backdrop-blur px-8 py-4 rounded-2xl shadow-sm">
                  <p className="text-center text-sm text-black/60 max-w-md mx-auto">
                    <span className="text-[#B8860B] font-medium">Coming soon:</span> Theme-based focus modes, advanced time analytics, and cross-device synchronization
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <SectionDivider />

        {/* Testimonials Section */}
        <div className="relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B]/5 to-[#DAA520]/5"></div>
            <div className="absolute inset-0 bg-[url('/testimonial-pattern.svg')] bg-repeat opacity-5"></div>
          </div>

          <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
            <section id="testimonials" className="py-20 md:py-32">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center bg-[#B8860B]/10 px-4 py-2 rounded-full text-sm text-[#B8860B] mb-4"
                >
                  <span>User Testimonials</span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl md:text-3xl lg:text-5xl font-manrope font-bold leading-tight bg-gradient-to-r from-[#C0A062] to-[#DAA520] text-transparent bg-clip-text mb-6"
                >
                  What our users say
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-black/70 max-w-xl mx-auto md:text-lg"
                >
                  Join thousands of satisfied users who have transformed their productivity with Ankh
                </motion.p>
              </div>

              {/* Background decorative elements */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute top-1/4 -left-10 w-40 h-40 bg-[#B8860B]/5 rounded-full blur-3xl"
                ></motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-1/4 -right-10 w-60 h-60 bg-[#DAA520]/5 rounded-full blur-3xl"
                ></motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto relative z-10">
                {TESTIMONIALS.map((testimonial, index) => (
                  <TestimonialCard
                    key={`testimonial-${index}`}
                    quote={testimonial.quote}
                    author={testimonial.author}
                    role={testimonial.role}
                    avatar={testimonial.avatar}
                    index={index}
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-16 flex justify-center"
              >
                <div className="inline-block px-6 py-3 border border-[#B8860B]/20 rounded-full bg-white shadow-sm">
                  <p className="text-sm text-[#B8860B]">Read more testimonials on our <span className="font-bold underline cursor-pointer">Trust Pilot</span> page</p>
                </div>
              </motion.div>
            </section>
          </div>
        </div>

        <SectionDivider />

        {/* Themes Section */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <section aria-label="Themes" className="py-20 md:py-32">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center bg-[#B8860B]/10 px-4 py-2 rounded-full text-sm text-[#B8860B] mb-4">
                <span>Beautiful Themes</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-manrope font-bold leading-tight bg-gradient-to-r from-[#C0A062] to-[#DAA520] text-transparent bg-clip-text mb-6">
                Personalize Your Experience
              </h2>
              <p className="text-black/70 max-w-xl mx-auto mb-8 md:text-lg">
                Discover themes inspired by Egypt&apos;s diverse landscapes, each
                carefully crafted to bring a unique atmosphere to your workspace.
              </p>
            </div>

            <ThemeShowcase />
          </section>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 py-16 md:py-24">
          <section className="bg-gradient-to-r from-[#C0A062] to-[#DAA520] rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden shadow-lg">
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <Image
                src="/cta-background.jpg"
                alt=""
                fill
                className="object-cover"
              />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-manrope font-bold mb-6">
                Ready to transform your productivity?
              </h2>
              <p className="text-white/90 mb-10 md:text-xl max-w-2xl mx-auto">
                Join thousands of users who have already discovered the power of Ankh&apos;s focused productivity tools.
              </p>
              <div className="inline-block bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
                {isLoading ? (
                  <div className="inline-flex items-center px-10 py-5 font-bold text-gray-500 text-lg">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-3" />
                    Loading...
                  </div>
                ) : isUserAuthenticated ? (
                  <Link href="/dashboard" className="inline-block px-10 py-5 font-bold text-[#B8860B] text-lg hover:text-[#DAA520] transition-colors">
                    Go to Dashboard
                  </Link>
                ) : (
                  <button
                    onClick={() => signIn()}
                    className="inline-block px-10 py-5 font-bold text-[#B8860B] text-lg hover:text-[#DAA520] transition-colors"
                  >
                    Get Started — It&apos;s Free
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8 mb-12">
            <div className="md:w-1/3">
              <h3 className="text-2xl font-manrope font-bold mb-6 bg-gradient-to-r from-[#C0A062] to-[#DAA520] text-transparent bg-clip-text">Ankh</h3>
              <p className="text-white/75 mb-8">
                Crafting focus and productivity tools for a balanced digital
                life, inspired by timeless Egyptian wisdom.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white/75 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-white/75 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-manrope font-bold mb-4">
                Features
              </h4>
              <nav className="flex flex-col gap-3">
                <Link
                  href="#features"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  Tasks
                </Link>
                <Link
                  href="#features"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  Notes
                </Link>
                <Link
                  href="#features"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  Stopwatch
                </Link>
              </nav>
            </div>
            <div>
              <h4 className="text-lg font-manrope font-bold mb-4">
                Resources
              </h4>
              <nav className="flex flex-col gap-3">
                <Link
                  href="#"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  Themes
                </Link>
                <Link
                  href="https://github.com/YoussefEltalyawy/Ankh"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  GitHub
                </Link>
                <Link
                  href="#"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </nav>
            </div>
            <div>
              <h4 className="text-lg font-manrope font-bold mb-4">Contact</h4>
              <a
                href="mailto:talyawy@proton.me"
                className="text-white/75 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                talyawy@proton.me
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-white/50 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Ankh. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white/70 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default HomePage; 