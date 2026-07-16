import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { IoCloudUploadOutline, IoDocumentTextOutline, IoDownloadOutline } from "react-icons/io5";
import Button from "./Button";
import { CloudContext } from "../ContextAPI/Provider";

const Sidebar = () => {
  const ethers = require("ethers");
  const location = useLocation();
  const [UserName, setUserName] = useState("");
  const { address, setAddress, hasMeta } = useContext(CloudContext);

  const handleConnection = async () => {
    try {
      const Provider = new ethers.BrowserProvider(window.ethereum);
      const Signer = await Provider.getSigner();
      setAddress(Signer.address);
      localStorage.setItem("MetamaskCredientials", true);
    } catch (error) {
      alert("Failed to connect to Metamask\nTry again");
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("MetamaskCredientials");
    setAddress("");
  };

  const isActive = (path) => location.pathname.includes(path);

  const navItems = [
    { path: "upload", label: "Upload File", icon: IoCloudUploadOutline },
    { path: "managefiles", label: "My Files", icon: IoDocumentTextOutline },
    { path: "recievedfile", label: "Received Files", icon: IoDownloadOutline },
  ];

  return (
    <div
      className="flex flex-col justify-between h-screen w-64 glass-dark shadow-2xl border-r border-gray-700/30 p-6"
      id="switchMenu"
    >
      {/* Logo/Brand */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold gradient-text mb-2">UnCloud</h1>
        <p className="text-gray-400 text-sm">Decentralized File Storage</p>
      </div>

      {/* Wallet Connection */}
      <div className="mb-6">
        {address === "" ? (
          hasMeta ? (
            <Button
              onClick={handleConnection}
              className="w-full"
              variant="primary"
            >
              <span className="text-lg">🔗</span>
              Connect Wallet
            </Button>
          ) : (
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full" variant="secondary">
                Install MetaMask
              </Button>
            </a>
          )
        ) : (
          <div className="glass p-4 rounded-xl border border-gray-700/50 animate-fade-in">
            <div className="text-xs text-gray-400 mb-2 font-medium">Connected Wallet</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <a
                  href={`https://sepolia.etherscan.io/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-mono text-sm hover:text-blue-400 transition-colors"
                >
                  {address.substring(0, 6) + "..." + address.substring(address.length - 4)}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      {hasMeta ? (
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                    }`}
                  >
                    <Icon className="text-xl" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <p className="text-sm font-medium mb-1">Install MetaMask</p>
            <p className="text-xs">to start using UnCloud</p>
          </div>
        </div>
      )}

      {/* Logout Button */}
      {address && (
        <Button
          variant="ghost"
          className="w-full text-gray-400 hover:text-white hover:bg-gray-800/50 border border-gray-700/50"
          onClick={handleLogout}
        >
          <CiLogout className="text-xl" />
          Disconnect
        </Button>
      )}
    </div>
  );
};

export default Sidebar;
