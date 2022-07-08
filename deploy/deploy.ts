import { utils, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import * as metadata from "../nft/thistleMetadata.json";
import * as dotenv from 'dotenv';

export default async function (hre: HardhatRuntimeEnvironment) {
  dotenv.config();
  console.log(`Running deploy script for the Thistle contract`);

  // Initialize the wallet.
  const wallet = new Wallet(process.env.PRIVATE_KEY as any);

  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("Thistle");

  // Deposit some funds to L2
  const depositAmount = ethers.utils.parseEther("0.001");
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: depositAmount,
  });
  await depositHandle.wait();

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  const thistleContract = await deployer.deploy(artifact, [metadata]);

  // Show the contract info.
  const contractAddress = thistleContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}