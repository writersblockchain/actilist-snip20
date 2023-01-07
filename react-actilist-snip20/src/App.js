import "./App.css";
import { useState } from "react";
import { SecretNetworkClient } from "secretjs";

function App() {
  const [myAddress, setMyAddress] = useState("");
  const [secretJs, setSecretJs] = useState(null);

  async function connectWallet() {
    const chainId = "pulsar-2";
    const LCD_URL = "https://api.pulsar.scrttestnet.com";

    await window.keplr.enable(chainId);
    const keplrOfflineSigner = window.keplr.getOfflineSignerOnlyAmino(chainId);
    const [{ address }] = await keplrOfflineSigner.getAccounts();

    setSecretJs(
      await new SecretNetworkClient({
        url: LCD_URL,
        chainId: chainId,
        wallet: keplrOfflineSigner,
        walletAddress: address,
      })
    );
    setMyAddress(address);
    console.log("my wallet address: ", address);
  }

  let getBalance = async () => {
    const {
      balance: { amount },
    } = await secretJs.query.bank.balance({
      address: myAddress,
      denom: "uscrt",
    });

    console.log(`I have ${Number(amount) / 1e6} SCRT!`);
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={getBalance}>Get Balance</button>
    </div>
  );
}

export default App;
