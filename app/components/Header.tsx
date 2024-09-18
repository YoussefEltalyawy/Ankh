import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="mb-[88px]">
      <header className="bg-[#F3F3F3] text-black  mx-[160px] mt-[54px]">
        <div className="container flex items-center justify-between">
          <div>
            <Link href="/">
              <h2 className="text-h2 font-manrope font-bold">Ankh</h2>
            </Link>
          </div>
          <div>
            <ul className="font-manrope text-p flex w-full gap-[4rem]">
              <li>
                <Link href="/features">Features</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="font-manrope flex items-center">
              <li>
                <Image
                  src="github.svg"
                  alt="github"
                  className="mr-[2rem] w-[38px] h-[38px] "
                  width={38}
                  height={38}
                />
              </li>
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
        <div className="container"></div>
      </header>
    </div>
  );
};

export default Header;
