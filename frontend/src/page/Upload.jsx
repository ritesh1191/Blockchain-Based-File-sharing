import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from "axios";
import UnCloud from "../EthereumF/UnCloud.json";
import { useNavigate } from "react-router-dom";
import { encrypt, createSecret256 } from "../AESEncrDecr/encryptDecrypt";
import { LineWave, ThreeDots } from "react-loader-spinner";

const Upload = () => {
  const navigator = useNavigate();
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [runLoader, setRunLoader] = useState(false);

  const handleUploadClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    // Handle the selected files
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
    // console.log(process.env.REACT_APP_API_Key);
  };

  const removeFile = (index) => {
    // Remove the file from the selectedFiles array
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  //Upload to IPFS
  const UploadToIpfs = async () => {
    try {
      setRunLoader(true);
      // Append each file with a unique key
      for (let i = 0; i < selectedFiles.length; i++) {

        const secretKey = createSecret256();
        const encryptBlobData = await encrypt(selectedFiles[i], secretKey);

        // const encryptFile = new File([encryptBlobData], selectedFiles[i].name);
        const formData = new FormData();
        formData.append("file", encryptBlobData);

        const res = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: "Infinity",
            headers: {
              "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
              pinata_api_key: process.env.REACT_APP_API_Key,
              pinata_secret_api_key: process.env.REACT_APP_API_Secret,
            },
          }
        );

        await uploadToBlockchain(
          res.data.IpfsHash,
          selectedFiles[i].name,
          secretKey
        );
      }

      alert("File Uploaded.");
      setSelectedFiles([]);
      setRunLoader(false);
    } catch (error) {
      console.log(error);
      setRunLoader(false);
      setError(error.message);
    }
  };

  const uploadToBlockchain = async (hashVal, name, secretKey) => {
    const ethers = require("ethers");
    setError("");
    try {
      const Provider = new ethers.BrowserProvider(window.ethereum);
      const Signer = await Provider.getSigner();

      const contractInstance = new ethers.Contract(
        UnCloud.contractAddress,
        UnCloud.abi,
        Signer
      );

      await contractInstance.storeMetaData(hashVal, name, secretKey);
    } catch (error) {
      if (error.code === 4001) {
        //user rejected the transaction
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("MetamaskCredientials")) {
        alert("Connect To metamask");
        navigator("/");
      }
    })();
  }, []);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold gradient-text mb-2">Upload Files</h1>
        <p className="text-gray-600">Securely store your files on the decentralized web</p>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`glass rounded-2xl border-2 border-dashed p-12 transition-all duration-300 ${
          isDragging
            ? "border-blue-500 bg-blue-50/50 scale-105"
            : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/30"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
          multiple
        />

        {selectedFiles.length === 0 ? (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <IoCloudUploadOutline className="text-white text-5xl" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Drag & Drop your files here
            </h3>
            <p className="text-gray-500 mb-6">or</p>
            <Button onClick={handleUploadClick} variant="primary">
              Browse Files
            </Button>
            <p className="text-sm text-gray-400 mt-4">
              Files are encrypted before upload for maximum security
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Selected Files ({selectedFiles.length})
              </h3>
              <Button
                variant="ghost"
                onClick={() => setSelectedFiles([])}
                className="text-sm"
              >
                Clear All
              </Button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto custom-scroll">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="glass p-4 rounded-xl flex items-center justify-between hover-lift animate-slide-up"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IoCloudUploadOutline className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-700 truncate">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <span className="text-xl">&times;</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="secondary"
                onClick={handleUploadClick}
                className="flex-1"
              >
                Add More Files
              </Button>
              {runLoader ? (
                <div className="flex-1 flex items-center justify-center">
                  <ThreeDots
                    visible={true}
                    height="40"
                    width="40"
                    color="#3b82f6"
                    radius="9"
                    ariaLabel="three-dots-loading"
                  />
                </div>
              ) : (
                <Button
                  variant="primary"
                  onClick={UploadToIpfs}
                  className="flex-1"
                >
                  Upload to IPFS
                </Button>
              )}
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
