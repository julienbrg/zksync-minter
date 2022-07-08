import { Wallet } from "zksync-web3";
// import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import * as metadata from "../nft/thistleMetadata.json";
import * as dotenv from "dotenv";
import { Web3Storage, Blob, File } from "web3.storage";

export default async function (hre: HardhatRuntimeEnvironment) {
  dotenv.config();
  console.log(`Running deploy script for the Thistle contract`);

  // Initialize the wallet.
  const wallet = new Wallet(process.env.PRIVATE_KEY as any);

  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("Thistle");

  // // Deposit some funds to L2
  // const depositAmount = ethers.utils.parseEther("0.001");
  // const depositHandle = await deployer.zkWallet.deposit({
  //   to: deployer.zkWallet.address,
  //   token: utils.ETH_ADDRESS,
  //   amount: depositAmount,
  // });
  // await depositHandle.wait();

  function getAccessToken() {
    console.log("✅ getAccessToken");
    return process.env.WEB3STORAGE_TOKEN;
  }

  function makeStorageClient() {
    console.log("✅ makeStorageClient");
    return new Web3Storage({ token: getAccessToken() } as any);
  }

  function makeFileObjects() {
    console.log("✅ makeFileObjects");

    const blob = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });

    const files = [
      new File(["contents-of-file-1"], "plain-utf8.txt"),
      new File([blob], "metadata.json"),
    ];
    return files;
  }

  async function storeFiles(files) {
    console.log("✅ storeFiles");
    const client = makeStorageClient();
    const cid = await client.put(files);
    console.log("✅ stored files with CID: ", cid, "🎉");
    return cid;
  }

  console.log("👋 Hello! ");
  makeStorageClient();
  const uri = (await storeFiles(makeFileObjects())) + "/metadata.json";
  console.log("✅ uri: ", uri);

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  const thistleContract = await deployer.deploy(artifact, [metadata]);

  // Show the contract info.
  const contractAddress = thistleContract.address;
  console.log("");
  console.log(`${metadata.name} was deployed to ${contractAddress} 🎉 `);
  console.log("");
}
