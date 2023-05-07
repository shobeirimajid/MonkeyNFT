import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-400 py-3">
      <nav className="flex justify-between items-center w-[90%] mx-auto">
        <div>
          <h1 className="font-bold text-2xl">MonkeyNFT</h1>
        </div>
        <div>
          <ul className="flex items-center space-x-14 text-lg">
            <li>
              <Link className="hover:text-red-800" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/marketplace">Marketplace</Link>
            </li>
            <li>
              <Link href="/team">Our Team</Link>
            </li>
          </ul>
        </div>
        <div>
          <button className="text-lg px-5 py-1 rounded-lg border-2 border-black">
            Connect
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
