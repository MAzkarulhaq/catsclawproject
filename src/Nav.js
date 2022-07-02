import React from "react";
import Web3 from "web3";
import { useState, useEffect } from "react";
import logo from "./assets/logo.png";

const Nav = ({ connecctstatus }) => {
  const [connectedAccount, setConnectedAccount] = useState("Connect Wallet");
  useEffect(() => {
    if (connecctstatus) {
      connectWallet();
    }
  });

  async function connectWallet() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const web3 = window.web3;
      const metaMaskAccount = await web3.eth.getAccounts();

      let splitedMetaMaskAddress;
      if (metaMaskAccount) {
        splitedMetaMaskAddress =
          metaMaskAccount[0].substring(0, 6) +
          "......" +
          metaMaskAccount[0].substring(
            metaMaskAccount[0].length - 4,
            metaMaskAccount[0].length
          );
      }
      setConnectedAccount(splitedMetaMaskAddress);
      console.log("CCC", connecctstatus);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  return (
    <>
      <header class="header py-5">
        <nav class="navbar navbar-expand-lg navbar-dark">
          <div class="container">
            <a class="navbar-brand" href="index.html">
              <img width="84" src={logo} alt="" class="img-fluid" />
            </a>
            <a
              target="_blank"
              class="btn btn-sp ms-auto"
              onClick={connectWallet}
            >
              {connectedAccount}
            </a>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Nav;
