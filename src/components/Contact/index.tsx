"use client";
import { upload } from "@lighthouse-web3/sdk"; // Import 'upload' method correctly
import { useEffect, useState } from "react";
const ethers = require('ethers');
import { AssetTokenizationABI } from '../../abis/AssetTokenizationABI';

const Minter = (props) => {
  // State variables
  const [walletAddress, setWallet] = useState("");
  const [contract, setContract] = useState(null);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState(""); // You might need this state depending on future use.

  const contractAddress = "0xd01661F6f1AC9F5Df7908BeD02F32603AEEc082E";
  const apiKey = "2d49449a.0394a4e240124eb691d00f861ca23d3f";

  useEffect(() => {
    // Connect to Ethereum wallet on component mount
    connectWallet();
  }, []);

  useEffect(() => {
    if (walletAddress && contract) {
      // Listen for NFTMinted event
      contract.on("NFTMinted", (tokenId, tokenURI) => {
        console.log(`NFT Minted! ID: ${tokenId}, URI: ${tokenURI}`);
      });

      // Clean up the event listener on component unmount
      return () => {
        contract.off("NFTMinted");
      };
    }
  }, [walletAddress, contract]);

  const connectWallet = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" }); // Prompt user to connect their wallet
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(); // Get the signer (the user’s wallet)
      const address = await signer.getAddress(); // Get the wallet address
      setWallet(address); // Update your state
      console.log("Connected wallet address:", address);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet. Please check console for details.");
    }
  };

  const AssetForm = () => {
    const [assetName, setAssetName] = useState("");
    const [tokenValue, setTokenValue] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);
    const [additionalInfo, setAdditionalInfo] = useState("");

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const onMintPressed = async (e) => {
      e.preventDefault();

      if (!file || !assetName || !tokenValue || !category) {
        alert("Please fill all required fields and upload a file");
        return;
      }

      console.log('File to upload:', file);

      try {
        // Upload the file to Lighthouse
        const response = await upload([file], apiKey); // Use an array here
        console.log('Upload Response:', response);

        if (response && response.data) {
          const fileUrl = response.data.Hash;

          // Prepare asset data
          const assetData = {
            assetName,
            tokenValue,
            category,
            fileUrl,
            additionalInfo,
          };

          // Connect to Ethereum and interact with your contract
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner(); // Get the signer
          const contract = new ethers.Contract(contractAddress, AssetTokenizationABI, signer); // Create contract instance

          // Call the function to tokenize the asset
          const tx = await contract.tokenizeAsset(assetData); // Replace 'tokenizeAsset' with your actual contract method name
          await tx.wait(); // Wait for the transaction to be mined

          alert("Asset has been tokenized successfully!");
        } else {
          alert("File upload failed. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading file or interacting with contract:", error);
        alert("An error occurred. Please check console for details.");
      }
    };

    return (
      <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
        <div className="container flex justify-center items-center h-screen">
          {/* Centering using Flexbox */}
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
              <div
                className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                data-wow-delay=".15s"
              >
                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                  Time to tokenize
                </h2>
                <p className="mb-12 text-base font-medium text-body-color">
                  Our support team will get back to you ASAP via email.
                </p>
                <form onSubmit={onMintPressed}>
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="assetName"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Asset Name
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={assetName}
                          onChange={(e) => setAssetName(e.target.value)}
                          placeholder="Enter asset name"
                          className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="assetFile"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Upload Asset File
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                        <p className="text-xs text-gray-500">
                          Max file size: 5MB. Allowed types: JPG, PNG.
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="tokenValue"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Asset Token Value
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={tokenValue}
                          onChange={(e) => setTokenValue(e.target.value)}
                          placeholder="Enter asset token value"
                          className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                      <div className="mb-8">
                        <label
                          htmlFor="category"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Asset Category
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        >
                          <option value="">Select a category</option>
                          <option value="real-estate">Real Estate</option>
                          <option value="luxury-goods">Luxury Goods</option>
                          <option value="vehicles">Vehicles</option>
                          <option value="art">Art</option>
                          <option value="collectibles">Collectibles</option>
                          <option value="stocks">Stocks</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label
                          htmlFor="message"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Additional Information
                        </label>
                        <textarea
                          name="message"
                          rows={5}
                          value={additionalInfo}
                          onChange={(e) => setAdditionalInfo(e.target.value)}
                          placeholder="Enter additional information (optional)"
                          className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        ></textarea>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <button
                        type="submit"
                        className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
                      >
                        Tokenize Asset
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div>
      <AssetForm />
    </div>
  );
};

export default Minter;
