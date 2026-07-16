import React, { useEffect, useState } from "react";
import UnCloud from "../EthereumF/UnCloud.json";
import Input from "./Input";
import { decrypt } from "../AESEncrDecr/encryptDecrypt";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function File({ file }) {
  const ethers = require("ethers");

  const [allowedAddress, setAllowedAddress] = useState([]);
  const [shareAddress, setShareAddress] = useState("");

  const [openManageAccess, setopenManageAccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [runLoader, setRunLoader] = useState(false);

  const manageAccess = async (Signer) => {
    // get All Adreess associated with each file
    try {
      const contractInstance = new ethers.Contract(
        UnCloud.contractAddress,
        UnCloud.abi,
        Signer
      );

      const result = await contractInstance.getAllAddress(file.metaID);

      setAllowedAddress(result);
      console.log(Array.from(result));
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async () => {
    try {
      const Provider = new ethers.BrowserProvider(window.ethereum);
      const Signer = await Provider.getSigner();
      manageAccess(Signer);
      const contractInstance = new ethers.Contract(
        UnCloud.contractAddress,
        UnCloud.abi,
        Signer
      );

      await contractInstance.shareDataWith(shareAddress, file.metaID);

      setAllowedAddress([...allowedAddress, ...shareAddress]);
      console.log("Sharing Done...Wait some time to reflect.");
    } catch (error) {
      console.log("error while sharing file");
    }
  };

  const editAccess = async (address) => {
    try {
      const Provider = new ethers.BrowserProvider(window.ethereum);
      const Signer = await Provider.getSigner();
      manageAccess(Signer);
      const contractInstance = new ethers.Contract(
        UnCloud.contractAddress,
        UnCloud.abi,
        Signer
      );

      await contractInstance.editAddressPermissions(address, file.metaID);

      console.log("access modified ...Wait some time to reflect.");
    } catch (error) {
      console.log("error while editing file");
    }
  };

  useEffect(() => {
    (async () => {
      const Provider = new ethers.BrowserProvider(window.ethereum);
      const Signer = await Provider.getSigner();
      manageAccess(Signer);
    })();
  }, []);

  return (
    <>
      <div className="glass rounded-2xl p-6 hover-lift animate-slide-up">
        <div className="flex items-start justify-between mb-4">
          <div
            onClick={async () => {
              setRunLoader(true);
              try {
                const response = await axios.get(
                  `https://gateway.pinata.cloud/ipfs/${file.tokenURI}`
                );
                decrypt(
                  new Blob([response.data]),
                  file.name.split(".")[1],
                  file.secretKey
                );
              } catch (error) {
                console.error("Error downloading file:", error);
              }
              setRunLoader(false);
            }}
            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
          >
            {runLoader ? (
              <ThreeDots
                visible={true}
                height="20"
                width="20"
                color="white"
                radius="9"
              />
            ) : (
              <i className="bx bx-file text-white text-2xl"></i>
            )}
          </div>
          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
            ID: {file.metaID.toString()}
          </div>
        </div>

        <h3 className="font-semibold text-gray-700 mb-2 truncate text-lg">
          {file.name.length > 30 ? file.name.substring(0, 30) + "..." : file.name}
        </h3>

        <button
          className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-medium text-sm"
          onClick={() => {
            setShowModal(true);
            setopenManageAccess(!openManageAccess);
          }}
        >
          Manage Access
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-4">
            <div className="relative w-full max-w-2xl my-6 mx-auto animate-fade-in">
              <div className="glass rounded-2xl shadow-2xl relative flex flex-col w-full outline-none focus:outline-none border border-white/20">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold gradient-text">Access Management</h3>
                  <button
                    className="text-gray-400 hover:text-gray-600 text-3xl leading-none font-semibold outline-none focus:outline-none transition-colors"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block">×</span>
                  </button>
                </div>

                {/* Body */}
                <div className="relative p-6 flex-auto">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Shared With</h4>
                    {allowedAddress.length > 0 ? (
                      <div className="space-y-2 max-h-48 overflow-y-auto custom-scroll">
                        {allowedAddress.map((addr, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between glass p-3 rounded-xl"
                          >
                            <div className="font-mono text-sm text-gray-700 flex-1 truncate">
                              {addr.account}
                            </div>
                            <button
                              onClick={() => editAccess(addr.account)}
                              className={`ml-3 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                addr.access
                                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                                  : "bg-green-100 text-green-700 hover:bg-green-200"
                              }`}
                            >
                              {addr.access ? "Revoke" : "Grant"}
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No addresses have access yet</p>
                    )}
                  </div>

                  <div className="mt-6">
                    <Input
                      type="text"
                      title="Share with address"
                      placeholder="0x..."
                      onChange={(e) => setShareAddress(e.target.value)}
                      value={shareAddress}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 rounded-b">
                  <button
                    className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg"
                    type="button"
                    onClick={() => {
                      handleShare();
                      setShareAddress("");
                    }}
                  >
                    Share File
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-30 fixed inset-0 z-40 bg-black backdrop-blur-sm"></div>
        </>
      )}
    </>
  );
}
