"use client";
import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import banner from "./assets/nftImage.jpeg";
import { AppContext } from "@/GlobalContext/AppProvider";

const HomePage = () => {
  const { monkeyNFT, account } = useContext(AppContext);
  const [publicQuantity, setPublicQuantity] = useState("1");
  const [whiteListQuantity, setWhiteListQuantity] = useState("1");
  const [totalSupply, setTotalSupply] = useState("-");
  const [yourNFT, setYourNFT] = useState("-");

  useEffect(() => {
    const initialData = async () => {
      try {
        const totalSupply = await monkeyNFT.totalSupply();
        const yourNFT = await monkeyNFT.mintedWallet(account);
        setYourNFT(yourNFT.toString());
        setTotalSupply(totalSupply.toString());
      } catch (error) {
        console.log(error.message);
      }
    };
    account && initialData();
  }, [account, totalSupply, yourNFT]);

  const publicMintNFT = async (e) => {
    e.preventDefault();
    try {
      const value = 0.01 * publicQuantity;
      await monkeyNFT.publicMint(publicQuantity, {
        value: ethers.utils.parseEther(value.toString()),
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const WhiteListMintNFT = async (e) => {
    e.preventDefault();
    try {
      const value = 0.001 * whiteListQuantity;
      await monkeyNFT.whiteListMint(whiteListQuantity, {
        value: ethers.utils.parseEther(value.toString()),
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getWhiteList = async () => {
    try {
      await monkeyNFT.getWhiteList();
      console.log("listed");
    } catch (error) {
      console.log(error.message);
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
          <button
            onClick={getWhiteList}
            className="text-lg px-6 py-2 bg-purple-700 rounded-xl text-white mt-5 hover:bg-purple-500"
          >
            Get WhiteList
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
          <h3 className="text-2xl font-bold mt-3">
            You have minted {yourNFT} NFT's
          </h3>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-center"> Mint your NFT's</h3>
          <div className="flex justify-around my-4">
            <form
              action=""
              className="flex flex-col min-w-[30%]"
              onSubmit={publicMintNFT}
            >
              <label htmlFor="quantity" className="text-lg">
                Quantity
              </label>
              <input
                className="border-2 border-purple-600 px-2 py-1 mt-2 rounded-sm"
                type="number"
                min="1"
                max="3"
                value={publicQuantity}
                onChange={(e) => setPublicQuantity(e.target.value)}
              />
              <button
                type="submit"
                className="text-lg px-6 py-2 bg-purple-700 rounded-md text-white mt-2 hover:bg-purple-500 "
                disabled={account ? false : true}
              >
                Public Mint
              </button>
            </form>
            <form
              action=""
              className="flex flex-col min-w-[30%]"
              onSubmit={WhiteListMintNFT}
            >
              <label htmlFor="quantity" className="text-lg">
                Quantity
              </label>
              <input
                className="border-2 border-purple-600 px-2 py-1 mt-2 rounded-sm"
                type="number"
                min="1"
                max="3"
                value={whiteListQuantity}
                onChange={(e) => setWhiteListQuantity(e.target.value)}
              />
              <button
                type="submit"
                className="text-lg px-6 py-2 bg-purple-700 rounded-md text-white mt-2 hover:bg-purple-500"
                disabled={account ? false : true}
              >
                WhiteList Mint
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
