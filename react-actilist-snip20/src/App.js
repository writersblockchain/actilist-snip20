import "./App.css";
import { useState } from "react";
import {
  SecretNetworkClient,
  EncryptionUtilsImpl,
  fromUtf8,
  MsgExecuteContractResponse,
} from "secretjs";

function App() {
  const [myAddress, setMyAddress] = useState("");
  const [secretJs, setSecretJs] = useState(null);
  const sScrtContractAddress = "secret1umwqjum7f4zmp9alr2kpmq4y5j4hyxlam896r3";
  const testAddress = "secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03";

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

  let transferTokens = async () => {};

  // let transferTokens = async () => {
  //   // Entropy: Secure implementation is left to the client, but it is recommended to use base-64 encoded random bytes and not predictable inputs.
  //   const entropy = "Another really random thing";

  //   let handleMsg = { create_viewing_key: { entropy: entropy } };
  //   console.log("Creating viewing key");
  //   let tx = await secretJs.tx.compute.executeContract(
  //     {
  //       sender: myAddress,
  //       contract_address: sScrtContractAddress,
  //       msg: handleMsg,
  //       sent_funds: ["1000"], // optional
  //     },
  //     {
  //       gasLimit: 100_000,
  //     }
  //   );

  //   // Convert the UTF8 bytes to String, before parsing the JSON for the api key.
  //   const apiKey = JSON.parse(
  //     fromUtf8(MsgExecuteContractResponse.decode(tx.data[0]).data)
  //   ).create_viewing_key.key;

  //   // Query balance with the api key
  //   const balanceQuery = {
  //     balance: {
  //       key: apiKey,
  //       address: myAddress,
  //     },
  //   };

  //   let balance = await secretJs.query.compute.queryContract({
  //     contract_address: sScrtContractAddress,
  //     query: balanceQuery,
  //   });

  //   console.log("My token balance: ", balance);
  // };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={getBalance}>Get Balance</button>
      <button onClick={transferTokens}>Transfer Tokens</button>
    </div>
  );
}

export default App;
