import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="mb-[88px]">
      <header className="bg-[#F3F3F3] text-black mx-4 md:mx-[160px] pt-[54px]">
        <div className="container flex items-center justify-between">
          <div>
            <Link href="/">
              <h2 className="text-h2 font-manrope font-bold">Ankh</h2>
            </Link>
          </div>
          {/* Hide on mobile, show on medium screens and up */}
          <div className="hidden md:block">
            <ul className="font-manrope text-p flex w-full gap-[4rem]">
              <li>
                <Link href="#features">Features</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/pricing">Contact</Link>
              </li>
            </ul>
          </div>
          {/* Hide on mobile, show on medium screens and up */}
          <div className="hidden md:block">
            <ul className="font-manrope flex items-center">
              <Link href={"https://github.com/YoussefEltalyawy/Ankh"}>
                <li>
                  <Image
                    src="github.svg"
                    alt="github"
                    className="mr-[2rem] w-[38px] h-[38px]"
                    width={38}
                    height={38}
                  />
                </li>
              </Link>
              <li>
                <Image
                  className="mr-[2rem] w-[38px] h-[38px]"
                  src="discord.svg"
                  alt="discord-logo"
                  width={38}
                  height={38}
                />
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
