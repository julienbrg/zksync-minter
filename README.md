# zkSync Minter

## Motivation

I wanted to provide a tool to create an NFT on zkSync.

## Install

```
yarn
```

## Use

- Add one of your wallets' private key, your own [Infura](https://infura.io/) project ID and a [Web3.Storage](https://web3.storage/tokens/) API token in a `.env` file
- Make sure you have a handful of Goerli ETH in this wallet
- Edit the `thistleMetadata.json` like you want
- Deploy on zkSync testnet:

```
yarn hardhat deploy-zksync
```

## Credits

I mainly used zkSync docs: [https://v2-docs.zksync.io/api/hardhat/getting-started.html](https://v2-docs.zksync.io/api/hardhat/getting-started.html)
