import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UnCloud from "../EthereumF/UnCloud.json";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { decrypt } from "../AESEncrDecr/encryptDecrypt";

function ReceivedFiles() {
  const ethers = require("ethers");
  const navigator = useNavigate();
  const [runLoader, setRunLoader] = useState(false);
  const [sharedFiles, setSharedFiles] = useState([]);

  const getSharedFiles = async (Signer) => {
    try {
      const contractInstance = new ethers.Contract(
        UnCloud.contractAddress,
        UnCloud.abi,
        Signer
      );

      const result = await contractInstance.getMySharedData();
      setSharedFiles(result);

      console.log(Array.from(result));
    } catch (error) {
      alert("Failed to Upload file...");
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("MetamaskCredientials")) {
        const Provider = new ethers.BrowserProvider(window.ethereum);
        const Signer = await Provider.getSigner();
        getSharedFiles(Signer);
      } else {
        alert("Connect To metamask");
        navigator("/");
      }
    })();

    window.ethereum.on("accountsChanged", async () => {
      const Provider = new ethers.BrowserProvider(window.ethereum);
      const Signer = await Provider.getSigner();
      getSharedFiles(Signer);
    });
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold gradient-text mb-2">Received Files</h1>
        <p className="text-gray-600">Files shared with you by other users</p>
      </div>

      {sharedFiles.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sharedFiles.map((file, i) =>
            file.metaID ? (
              <div
                key={i}
                className="glass rounded-2xl p-6 hover-lift animate-slide-up"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <i className="bx bx-file text-white text-2xl"></i>
                  </div>
                  <button
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
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    disabled={runLoader}
                  >
                    {runLoader ? (
                      <ThreeDots
                        visible={true}
                        height="20"
                        width="20"
                        color="#3b82f6"
                        radius="9"
                      />
                    ) : (
                      <i className="bx bx-download text-xl"></i>
                    )}
                  </button>
                </div>
                <h3 className="font-semibold text-gray-700 mb-2 truncate">{file.name}</h3>
                <div className="text-sm text-gray-500 mb-1">Shared by</div>
                <div className="font-mono text-xs text-gray-600 bg-gray-100 p-2 rounded-lg">
                  {file.owner.substring(0, 6) +
                    "..." +
                    file.owner.substring(file.owner.length - 4)}
                </div>
              </div>
            ) : null
          )}
        </div>
      ) : (
        <div className="glass rounded-2xl p-12 text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="bx bx-inbox text-5xl text-gray-400"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Files Received</h3>
          <p className="text-gray-500">Files shared with you will appear here</p>
        </div>
      )}
    </div>
  );
}

export default ReceivedFiles;
