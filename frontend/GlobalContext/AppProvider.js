"use client";
import { ethers } from "ethers";
import React, { useState, createContext } from "react";
import contractJSON from "./MonkeyNFT.json";

const AppContext = createContext();
const contractAddress = "0x5a28cA966689a878582F60E27401135b26DEdb66";
const contractABI = contractJSON.abi;

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    account: "",
    monkeyNFT: null,
  });

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const provider = await new ethers.providers.Web3Provider(
          window.ethereum
        );
        const signer = await provider.getSigner();
        const monkeyNFT = await new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setState({
          provider,
          signer,
          account,
          monkeyNFT,
        });
      } catch (error) {}
    } else {
      console.log("Please install Metamask");
    }
  };
  return (
    <AppContext.Provider value={{ connectWallet, ...state }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
export { AppContext };
