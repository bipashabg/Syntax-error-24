const hre = require("hardhat");

async function main() {
  console.log("Deploying AssetTokenization...");

  const AssetTokenization = await hre.ethers.getContractFactory("AssetTokenization");
  
  // Check if the contract factory is valid
  console.log("Contract Factory:", AssetTokenization);

  try {
    // Deploy the contract and wait for the transaction to be mined
    const assetTokenization = await AssetTokenization.deploy({
      gasLimit: 5000000,
    });

    console.log("Deployment transaction details:", assetTokenization.deployTransaction);

    // Wait for the transaction to be mined
    const txReceipt = await assetTokenization.deployTransaction.wait();

    console.log("Deployment confirmed in block:", txReceipt.blockNumber);
    console.log("AssetTokenization deployed to:", assetTokenization.address);
  } catch (error) {
    console.error("Error during deployment:", error.message);
    if (error.message.includes("out of gas")) {
      console.error("Possible out of gas error. Consider increasing the gas limit.");
    } else if (error.message.includes("invalid sender")) {
      console.error("Check your account's private key and balance.");
    } else if (error.message.includes("transaction failed")) {
      console.error("Transaction failed. Check the contract logic or the network.");
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}

// Error handling
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(1);
  });
