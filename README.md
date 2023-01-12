## ActiList Token Swap

This is a converter dapp that turns native SCRT tokens into sSCRT and vice-versa on Secret Network’s testnet. You can demo the dapp [here](https://actilist-snip20-hmnepakk3-writersblockchain.vercel.app/) or run it locally using the commands below:

1. Install dependencies

```
npm install
```

2. Run the development server:

```
npm run dev
```

3. Connect your keplr wallet (make sure it is connected to Secret Testnet. See config details below)

```
const chainId = "pulsar-2";
const LCD_URL = "https://api.pulsar.scrttestnet.com"
```
