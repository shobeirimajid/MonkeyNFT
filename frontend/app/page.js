import React from "react";
import Image from "next/image";
import banner from "./assets/nftImage.jpeg";

const HomePage = () => {
  return (
    <div className="grid grid-cols-2 gap-5 w-[90%] mx-auto py-[80px] items-center">
      <div>
        <h2 className="text-4xl font-bold">MonkeyNFT- Mint Your Own NFTs</h2>
        <h3 className="text-2xl fond-bold mt-4">
          Create, Own, and Sell Unique Digital Assets
        </h3>
        <button className="text-lg px-6 py-2 bg-purple-700 rounded-xl text-white mt-5 hover:bg-purple-500">
          Mint Now
        </button>
      </div>
      <div>
        <Image className="rounded-lg" src={banner} alt="banner image" />
      </div>
    </div>
  );
};

export default HomePage;
