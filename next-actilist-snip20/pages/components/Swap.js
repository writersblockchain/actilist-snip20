import {
  SecretNetworkClient,
  EncryptionUtilsImpl,
  fromUtf8,
  MsgExecuteContractResponse,
} from "secretjs";
import { useState } from "react";

export default function Form({
  setSecretJs,
  secretJs,
  setMyAddress,
  myAddress,
  setScrtBalance,
  scrtBalance,
  setScrtScrtBalance,
  scrtScrtBalance,
}) {
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
  async function connectWallet() {
    const chainId = "pulsar-2";
    const LCD_URL = "https://api.pulsar.scrttestnet.com";
    // const apiKey1 = "api_key_E5u6/bAGLhYeqZzDSBHr3qyRqkq43VPvloConQZXxE8=";

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
    setScrtBalance(`You have ${Number(amount) / 1e6} SCRT!`);
  };

  return (
    <>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900 ml-2">
                ActiList Token Swap
              </h3>
              <p className="mt-1 text-sm text-gray-600 ml-2">
                Exchange native SCRT tokens for sSCRT.
              </p>
            </div>
          </div>

          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md">
              <button
                onClick={connectWallet}
                className="inline-flex absolute top-4 right-0 rounded-md border border-transparent bg-indigo-600 py-2 px-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 m-4"
              >
                Connect Wallet
              </button>
              <br />
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <button
                      onClick={getBalance}
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      SCRT Balance
                    </button>
                    <div
                      type="text"
                      name="SCRT balance"
                      id="SCRT balance"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      {scrtBalance}
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <button className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      sSCRT Balance
                    </button>
                    <div
                      type="text"
                      name="sSCRT balance"
                      id="sSCRT balance"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      {scrtScrtBalance}
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <input
                      type="text"
                      name="email-address"
                      id="email-address"
                      autoComplete="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street address
                    </label>
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      ZIP / Postal code
                    </label>
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
}
