import React, { useEffect, useState } from "react";
import "./App.css";
import CandyMachine from "./CandyMachine";

// Constants
const TWITTER_HANDLE = "htmelvis";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        const response = await solana.connect();
        if (solana.isPhantom) {
          console.log("Phantom Wallet Found!");
          console.log(
            `Currently connecting with Public Key: ${response.publicKey.toString()}`
          );
          // wallet exists and it is phantom so lets set the addy to state
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    checkIfWalletIsConnected();
  };

  const renderNotConnectedContainer = () => (
    <button
      type="button"
      onClick={connectWallet}
      className="cta-button connect-wallet-button"
    >
      Connect Your Phantom Wallet
    </button>
  );

  useEffect(() => {
    console.log(process.env);

    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">Sol-Suckers</p>
          
          {!walletAddress && renderNotConnectedContainer()}
        </div>

        {walletAddress && <CandyMachine walletAddress={window.solana} />}

        <div className="footer-container">
          <p className="footer-text">
            <a href={TWITTER_LINK} target="_blank" rel="noreferrer">
              {`created by @${TWITTER_HANDLE}`}{" "}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
