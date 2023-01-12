import Swap from "./components/Swap";
import { useState } from "react";

export default function Home() {
  const [myAddress, setMyAddress] = useState("No wallet currently connected.");
  const [scrtBalance, setScrtBalance] = useState("SCRT Balance: ");
  const [scrtScrtBalance, setScrtScrtBalance] = useState("sSCRT Balance: ");
  const [apiKey, setApiKey] = useState("");
  const [secretJs, setSecretJs] = useState(null);
  const [tokenAmount, setTokenAmount] = useState("");

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
        apiKey={apiKey}
        setApiKey={setApiKey}
        tokenAmount={tokenAmount}
        setTokenAmount={setTokenAmount}
      />
    </div>
  );
}
