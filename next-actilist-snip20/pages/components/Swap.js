import React from "react";

export default function Swap() {
  return (
    <>
      <div className="flex h-screen w-screen bg-white border-black border-4 rounded-lg">
        <div className="grid grid-rows-4">
          <div className="flex items-center justify-center">ActiSwap</div>
          <button className="absolute top-0 right-0 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded h-14 m-2 text-sm leading-3 w-24 border-2  ">
            Connect Wallet
          </button>
        </div>
        <div className=" flex m-auto w-6/12 h-4/6 border-4 border-black rounded-lg  "></div>
      </div>
    </>
  );
}
