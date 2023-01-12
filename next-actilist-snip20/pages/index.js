import Swap from "./components/Swap";
import { useState } from "react";

export default function Home() {
  const [myAddress, setMyAddress] = useState("No wallet currently connected.");
  const [scrtBalance, setScrtBalance] = useState("SCRT Balance: ");
  const [scrtScrtBalance, setScrtScrtBalance] = useState("sSCRT Balance: ");
  const [apiKey, setApiKey] = useState(null);
  const [secretJs, setSecretJs] = useState(null);
  const [secretTokenAmount, setSecretTokenAmount] = useState("");
  const [secretSecretTokenAmount, setSecretSecretTokenAmount] = useState("");

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
        secretTokenAmount={secretTokenAmount}
        setSecretTokenAmount={setSecretTokenAmount}
        secretSecretTokenAmount={secretSecretTokenAmount}
        setSecretSecretTokenAmount={setSecretSecretTokenAmount}
      />
    </div>
  );
}
