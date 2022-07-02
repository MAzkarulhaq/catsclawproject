import React from "react";
import Web3 from "web3";
import abi from "./abi.json";
import bronze from "./assets/bronze.gif";
import silver from "./assets/silver.gif";
import gold from "./assets/gold.gif";
import gift from "./assets/qmark.svg";

import { useEffect, useState } from "react";

require("dotenv").config();
const { REACT_APP_CONTRACT_ADDRESS } = process.env;

const Mint = ({ setconnecctstatus, connecctstatus }) => {
  const [connectedAccount, setConnectedAccount] = useState("Connect Wallet");
  const [contract, setContract] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [supply, setTokenSupply] = useState(null);
  const [silverprice, setsilverPrice] = useState();
  const [bronzeprice, setbronzePrice] = useState();
  const [goldprice, setgoldPrice] = useState();
  const [boxprice, setboxPrice] = useState();

  const [priceInEth, setPriceInEth] = useState(0.06);
  const [quantitybronze, setQuantityBronze] = useState(1);
  const [quantitysilver, setQuantitySilver] = useState(1);
  const [quantitygold, setQuantityGold] = useState(1);
  const [quantitygift, setQuantityGift] = useState(1);

  const [minted, setMinted] = useState(false);
  console.log("C", connecctstatus);

  useEffect(() => {
    loadWeb3();
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      // await window.ethereum.enable();
      const web3 = window.web3;
      // creating contract instance
      const contractaddress = REACT_APP_CONTRACT_ADDRESS;
      const ct = new web3.eth.Contract(abi, contractaddress);
      setContract(ct);
      console.log("ct", ct);
      let silverprice = await ct.methods.silverPrice().call();
      let bronzeprice = await ct.methods.bronzePrice().call();
      let goldprice = await ct.methods.goldPrice().call();
      let boxprice = await ct.methods.boxPrice().call();
      setsilverPrice(silverprice);
      setbronzePrice(bronzeprice);
      setgoldPrice(goldprice);
      setboxPrice(boxprice);

      setContract(ct);
      setPriceInEth(web3.utils.fromWei(silverprice, "ether"));
      const totalSupply = await ct.methods.totalSupply().call();
      setTokenSupply(totalSupply);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }
  async function mintbronze() {
    const web3 = window.web3;
    const _value = bronzeprice * quantitybronze;
    const address = await web3.eth.getAccounts();

    await contract.methods
      .bronzeMint(quantitybronze)
      .send({ from: address.toString(), value: _value });
    setMinted(true);
    const totalSupply = await contract.methods.totalSupply().call();
    setTokenSupply(totalSupply);
  }
  async function mintsilver() {
    const web3 = window.web3;
    const _value = silverprice * quantitysilver;
    const address = await web3.eth.getAccounts();

    await contract.methods
      .silverMint(quantitysilver)
      .send({ from: address.toString(), value: _value });
    setMinted(true);
    const totalSupply = await contract.methods.totalSupply().call();
    setTokenSupply(totalSupply);
  }
  async function mintgold() {
    const web3 = window.web3;
    const _value = goldprice * quantitygold;
    const address = await web3.eth.getAccounts();

    await contract.methods
      .goldMint(quantitygold)
      .send({ from: address.toString(), value: _value });
    setMinted(true);
    const totalSupply = await contract.methods.totalSupply().call();
    setTokenSupply(totalSupply);
  }
  async function mintgift() {
    const web3 = window.web3;
    const _value = boxprice * quantitygold;
    const address = await web3.eth.getAccounts();

    await contract.methods
      .boxMint(quantitygold)
      .send({ from: address.toString(), value: _value });
    setMinted(true);
    const totalSupply = await contract.methods.totalSupply().call();
    setTokenSupply(totalSupply);
  }
  async function connectWallet() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const web3 = window.web3;
      const metaMaskAccount = await web3.eth.getAccounts();
      //   setConnectedstatus(true);
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
      <div className="container">
        <div className="row justify-content-around py-5">
          <div className="col-md-3">
            <img src={bronze} alt="" className="img-fluid rounded" />
            <p className="text-center py-2">
              <div class="btngroup">
                <div
                  class="d-flex rounded btngroup justify-content-center "
                  role="group"
                  aria-label="First group"
                >
                  <button
                    type="button"
                    class="btn bg-dark text-white "
                    onClick={() => {
                      if (quantitybronze > 1) {
                        setQuantityBronze(quantitybronze - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <button type="button" class="btn text-black">
                    {quantitybronze}
                  </button>
                  <button
                    type="button"
                    class="btn bg-dark text-white"
                    onClick={() => {
                      if (quantitybronze < 5) {
                        setQuantityBronze(quantitybronze + 1);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </p>
            <p className="text-center">
              <a
                className="btn btn-sp"
                onClick={async () => {
                  await connectWallet();
                  mintbronze();
                }}
              >
               Mint Bronze
              </a>
            </p>
          </div>
          <div className="col-md-3">
            <img src={silver} alt="" className="img-fluid rounded" />
            <p className="text-center py-2">
              <div class="btngroup">
                <div
                  class="d-flex rounded btngroup justify-content-center "
                  role="group"
                  aria-label="First group"
                >
                  <button
                    type="button"
                    class="btn bg-dark text-white "
                    onClick={() => {
                      if (quantitysilver > 1) {
                        setQuantitySilver(quantitysilver - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <button type="button" class="btn text-black">
                    {quantitysilver}
                  </button>
                  <button
                    type="button"
                    class="btn bg-dark text-white"
                    onClick={() => {
                      if (quantitysilver < 5) {
                        setQuantitySilver(quantitysilver + 1);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </p>
            <p className="text-center">
              <a
                className="btn btn-sp"
                onClick={async () => {
                  await connectWallet();
                  mintsilver();
                }}
              >
                Mint Silver
              </a>
            </p>
          </div>
          <div className="col-md-3">
            <img src={gold} alt="" className="img-fluid rounded" />
            <p className="text-center py-2">
              <div class="btngroup">
                <div
                  class="d-flex rounded btngroup justify-content-center "
                  role="group"
                  aria-label="First group"
                >
                  <button
                    type="button"
                    class="btn bg-dark text-white"
                    onClick={() => {
                      if (quantitygold > 1) {
                        setQuantityGold(quantitygold - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <button type="button" class="btn text-black">
                    {quantitygold}
                  </button>
                  <button
                    type="button"
                    class="btn bg-dark text-white"
                    onClick={() => {
                      if (quantitygold < 5) {
                        setQuantityGold(quantitygold + 1);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </p>
            <p className="text-center">
              <a
                className="btn btn-sp"
                onClick={async () => {
                  await connectWallet();
                  mintgold();
                }}
              >
                Mint Gold
              </a>
            </p>
          </div>
          <div className="col-md-3">
            <img src={gift} alt="" className="img-fluid rounded" />
            <p className="text-center py-2">
              <div class="btngroup">
                <div
                  class="d-flex rounded btngroup justify-content-center "
                  role="group"
                  aria-label="First group"
                >
                  <button
                    type="button"
                    class="btn bg-dark text-white"
                    onClick={() => {
                      if (quantitygift > 1) {
                        setQuantityGift(quantitygift - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <button type="button" class="btn text-black">
                    {quantitygift}
                  </button>
                  <button
                    type="button"
                    class="btn bg-dark text-white"
                    onClick={() => {
                      if (quantitygift < 5) {
                        setQuantityGift(quantitygift + 1);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </p>
            <p className="text-center">
              <a
                className="btn btn-sp"
                onClick={async () => {
                  await connectWallet();
                  mintgift();
                }}
              >
                MINT Gift
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mint;
