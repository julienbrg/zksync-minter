# zkSync Minter

Mints an NFT on zkSync. A tutorial is available [here](https://dev.to/julienbrg/mint-an-nft-on-zksync-20-4bi0).

## Motivation

I wanted to provide a tool to create an NFT on [zkSync 2.0 alpha testnet](https://v2-docs.zksync.io/dev/).

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

See an example NFT here: [https://ato.network/ZkSync/0xccA0521D453cA8C84Cb0b56936A4B764992b2F12/1](https://ato.network/ZkSync/0xccA0521D453cA8C84Cb0b56936A4B764992b2F12/1)

You can view your own NFT using [Āto Scanner](https://ato.network/).

## Credits

I mainly used zkSync docs: [https://v2-docs.zksync.io/api/hardhat/getting-started.html](https://v2-docs.zksync.io/api/hardhat/getting-started.html)
