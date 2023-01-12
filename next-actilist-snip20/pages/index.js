import Head from "next/head";
import Form from "./components/Form";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import {
  SecretNetworkClient,
  EncryptionUtilsImpl,
  fromUtf8,
  MsgExecuteContractResponse,
} from "secretjs";

export default function Home() {
  const [myAddress, setMyAddress] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [secretJs, setSecretJs] = useState(null);
  const sScrtContractAddress = "secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg";
  const testAddress = "secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03";

  let depositScrt = async () => {
    let handleMsg = {
      deposit: {},
    };
    console.log("Depositing tokens");

    let tx = await secretJs.tx.compute.executeContract(
      {
        sender: myAddress,
        contract_address: sScrtContractAddress,
        msg: handleMsg,
        sent_funds: [{ denom: "uscrt", amount: "1" }],
      },
      {
        gasLimit: 100_000,
      }
    );
  };

  let createViewingKey = async () => {
    const entropy = "Another really random thing";

    let handleMsg = { create_viewing_key: { entropy: entropy } };
    console.log("Creating viewing key");
    let tx = await secretJs.tx.compute.executeContract(
      {
        sender: myAddress,
        contract_address: sScrtContractAddress,
        msg: handleMsg,
        sent_funds: [], // optional
      },
      {
        gasLimit: 100_000,
      }
    );
    const apiKey = JSON.parse(
      fromUtf8(MsgExecuteContractResponse.decode(tx.data[0]).data)
    ).create_viewing_key.key;

    setApiKey(apiKey);
    console.log(apiKey);
  };

  // let transferTokens = async () => {
  //   let handleMsg = {
  //     transfer: {
  //       owner: myAddress,
  //       amount: "100000000",
  //       recipient: testAddress,
  //     },
  //   };
  //   console.log("Transferring tokens");

  //   let tx = await secretJs.tx.compute.executeContract(
  //     {
  //       sender: myAddress,
  //       contract_address: sScrtContractAddress,
  //       msg: handleMsg,
  //     },
  //     {
  //       gasLimit: 100_000,
  //     }
  //   );
  // };

  let query_sScrt_Token_Balance = async () => {
    const balanceQuery = {
      balance: {
        key: apiKey,
        address: myAddress,
      },
    };

    let balance = await secretJs.query.compute.queryContract({
      contract_address: sScrtContractAddress,
      query: balanceQuery,
    });

    console.log("My token balance: ", balance);
  };

  return (
    <div>
      <Form />
      {/* <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={getBalance}>Get Balance</button>
      <button onClick={createViewingKey}>Create Viewing Key</button>
      <button onClick={depositScrt}>Deposit Secret</button>
      <button onClick={query_sScrt_Token_Balance}>Query Balance</button>
      <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
    </div>
  );
}
