"use client";
import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import banner from "./assets/nftImage.jpeg";
import { AppContext } from "@/GlobalContext/AppProvider";

const HomePage = () => {
  const { monkeyNFT, account } = useContext(AppContext);
  const [quantity, setQuantity] = useState("1");
  const [totalSupply, setTotalSupply] = useState("-");

  useEffect(() => {
    const getTotalSupply = async () => {
      try {
        const totalSupply = await monkeyNFT.totalSupply();
        setTotalSupply(totalSupply.toString());
      } catch (error) {
        console.log(error.message);
      }
    };
    account && getTotalSupply();
  }, [account, totalSupply]);

  const mintNFT = async (e) => {
    e.preventDefault();
    try {
      const value = 0.01 * quantity;
      await monkeyNFT.publicMint(quantity, {
        value: ethers.utils.parseEther(value.toString()),
      });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
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
      <div className="grid grid-cols-2 w-[90%] mx-auto my-8">
        <div>
          <h3 className="text-3xl font-bold">
            Total minted NFT's are {totalSupply}/2000
          </h3>
        </div>
        <div className="w-[50%] mx-auto">
          <h3 className="text-2xl font-bold">MonkeyNFT</h3>
          <form action="" className="flex flex-col" onSubmit={mintNFT}>
            <label htmlFor="quantity" className="text-lg">
              Quantity
            </label>
            <input
              className="border-2 border-purple-600 px-2 py-1 w-[50%] mt-2"
              type="number"
              min="1"
              max="3"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button
              type="submit"
              className="text-lg px-6 py-2 bg-purple-700 rounded-md text-white mt-2 hover:bg-purple-500 w-[50%]"
              disabled={account ? false : true}
            >
              Mint
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HomePage;
