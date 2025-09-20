'use client'
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <div className="relative z-50">
      <header className="bg-transparent py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div>
              <Link href="/">
                <h2 className="text-2xl md:text-3xl font-manrope font-bold bg-gradient-to-r from-[#C0A062] to-[#DAA520] text-transparent bg-clip-text">Ankh</h2>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <nav>
                <ul className="font-manrope flex items-center space-x-8">
                  <li>
                    <Link href="#features" className="text-black/80 hover:text-[#B8860B] transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#testimonials" className="text-black/80 hover:text-[#B8860B] transition-colors">
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href="https://github.com/YoussefEltalyawy/Ankh" className="text-black/80 hover:text-[#B8860B] transition-colors">
                      GitHub
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : session ? (
                  <div className="flex items-center space-x-3">
                    <Link
                      href="/dashboard"
                      className="font-medium text-sm text-black/70 hover:text-[#B8860B] transition-colors flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      {session.user?.name || "Dashboard"}
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="font-medium text-sm text-red-600 hover:text-red-700 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => signIn()}
                      className="font-medium text-sm text-black/70 hover:text-black transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => signIn()}
                      className="bg-gradient-to-r from-[#C0A062] to-[#DAA520] text-white font-medium text-sm px-4 py-2 rounded-lg hover:shadow-md transition-all"
                    >
                      Sign Up Free
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-black/80 hover:text-[#B8860B] transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute inset-x-0 top-[72px] shadow-lg rounded-b-2xl">
          <div className="px-4 py-6 space-y-4">
            <nav>
              <ul className="font-manrope space-y-4">
                <li>
                  <Link
                    href="#features"
                    className="block text-black/80 hover:text-[#B8860B] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#testimonials"
                    className="block text-black/80 hover:text-[#B8860B] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/YoussefEltalyawy/Ankh"
                    className="block text-black/80 hover:text-[#B8860B] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
              {isLoading ? (
                <div className="flex justify-center">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="font-medium text-center text-black/70 hover:text-[#B8860B] transition-colors flex items-center justify-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    {session.user?.name || "Dashboard"}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="font-medium text-center text-red-600 hover:text-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => signIn()}
                    className="font-medium text-center text-black/70 hover:text-black transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => signIn()}
                    className="bg-gradient-to-r from-[#C0A062] to-[#DAA520] text-center text-white font-medium px-4 py-2 rounded-lg hover:shadow-md transition-all"
                  >
                    Sign Up Free
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
