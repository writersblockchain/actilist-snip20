import Swap from "./components/Swap";
import { useState } from "react";

export default function Home() {
  const [myAddress, setMyAddress] = useState("");
  const [scrtBalance, setScrtBalance] = useState("SCRT Balance: ");
  const [scrtScrtBalance, setScrtScrtBalance] = useState("sSCRT Balance: ");
  const [apiKey, setApiKey] = useState("");
  const [secretJs, setSecretJs] = useState(null);

  return (
    <div>
      <Swap
        setSecretJs={setSecretJs}
        setMyAddress={setMyAddress}
        myAddress={myAddress}
        secretJs={secretJs}
        setScrtBalance={setScrtBalance}
        scrtBalance={scrtBalance}
        scrtScrtBalance={scrtScrtBalance}
        setScrtScrtBalance={setScrtScrtBalance}
      />
      {/* <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={getBalance}>Get Balance</button>
      <button onClick={createViewingKey}>Create Viewing Key</button>
      <button onClick={depositScrt}>Deposit Secret</button>
      <button onClick={query_sScrt_Token_Balance}>Query Balance</button>
      */}
    </div>
  );
}
