# Blockchain-Based-File-sharing


# Blockchain-Based Decentralized File Sharing System

UnCloud is a secure, decentralized file sharing platform that leverages blockchain technology and IPFS (InterPlanetary File System) for storing and sharing encrypted files. Built with Ethereum smart contracts, the platform ensures data integrity, transparency, and user-controlled access management.


## 🎯 Overview

UnCloud combines the power of blockchain technology with decentralized storage to create a secure file sharing ecosystem. Unlike traditional cloud storage services, UnCloud:

- **Decentralized Storage**: Files are stored on IPFS (via Pinata gateway), not on centralized servers
- **Blockchain Verification**: File metadata and access permissions are stored on Ethereum blockchain
- **End-to-End Encryption**: Files are encrypted using AES-256 before uploading
- **Access Control**: Smart contracts manage file ownership and sharing permissions
- **Transparent History**: All file interactions are immutably recorded on the blockchain

---

## ✨ Features

### Core Features

- 🔐 **AES-256 Encryption**: Files are encrypted client-side before upload
- 📦 **IPFS Storage**: Decentralized file storage using Pinata IPFS gateway
- 🔗 **Smart Contract Integration**: Ethereum smart contracts for metadata and access control
- 👥 **File Sharing**: Share files with specific Ethereum addresses
- 🔑 **Access Management**: Grant or revoke access permissions for shared files
- 📱 **MetaMask Integration**: Seamless wallet connection for transactions
- 📊 **File Management**: View, manage, and track your uploaded and shared files
- 🎨 **Modern UI**: Built with React and Tailwind CSS for a responsive experience

### Security Features

- **On-chain Access Control**: Only authorized addresses can access shared files
- **Encrypted Storage**: Files are encrypted before storage on IPFS
- **Immutable Records**: All file transactions are recorded on blockchain
- **Owner Verification**: Smart contract ensures only owners can modify permissions

---

## 🛠 Tech Stack

### Frontend
- **React** 18.2.0 - UI framework
- **React Router** 6.21.1 - Client-side routing
- **Tailwind CSS** 3.4.1 - Utility-first CSS framework
- **Ethers.js** 6.11.1 - Ethereum blockchain interaction
- **Axios** 1.6.5 - HTTP client for IPFS requests
- **Crypto-JS** 4.2.0 - AES encryption/decryption
- **React Icons** 4.12.0 - Icon library

### Backend (Smart Contracts)
- **Solidity** ^0.8.0 - Smart contract language
- **Hardhat** 2.19.4 - Development environment
- **OpenZeppelin Contracts** 5.0.1 - ERC721 NFT standard implementation

### Storage & Blockchain
- **IPFS** (via Pinata) - Decentralized file storage
- **Ethereum** - Blockchain network
- **MetaMask** - Web3 wallet provider

---

## 🏗 Architecture

```
┌─────────────────┐
│   React Frontend │
│  (User Interface)│
└────────┬─────────┘
         │
         ├──────────────────┐
         │                  │
         ▼                  ▼
┌─────────────────┐  ┌─────────────────┐
│  MetaMask Wallet│  │  IPFS (Pinata)  │
│  (Transactions) │  │  (File Storage) │
└────────┬────────┘  └─────────────────┘
         │
         ▼
┌─────────────────┐
│ Ethereum Network│
│ (Smart Contracts)│
│  - File Metadata │
│  - Access Control│
└─────────────────┘
```

### Data Flow

1. **File Upload**:
   - User selects file → Client-side AES encryption → Upload to IPFS → Store metadata on blockchain

2. **File Access**:
   - Check blockchain permissions → Fetch encrypted file from IPFS → Decrypt client-side → Display

3. **File Sharing**:
   - Owner grants permission on blockchain → Shared user can now access file metadata → Decrypt and download

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or v20.x recommended) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package managers
- **MetaMask** Browser Extension - [Install](https://metamask.io/)
- **Git** - Version control

### Optional but Recommended

- **VS Code** or your preferred code editor
- Basic understanding of:
  - React.js
  - Solidity
  - Blockchain/Ethereum concepts
  - IPFS

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ritesh1191/Blockchain-Based-File-sharing.git
cd Blockchain-Based-File-sharing
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuration

### Backend Configuration

The Hardhat configuration is already set up in `Backend/hardhat.config.js`. The default configuration includes:

- **Solidity Version**: 0.8.20
- **Local Network**: Chain ID 1337
- **Localhost URL**: http://127.0.0.1:8545

### Frontend Configuration

1. **Update Contract Address** (After deployment):

   Edit `frontend/src/EthereumF/UnCloud.json`:
   ```json
   {
     "contractName": "UnCloud",
     "contractAddress": "YOUR_DEPLOYED_CONTRACT_ADDRESS",
     ...
   }
   ```

2. **Environment Variables** (Optional - for Appwrite auth):

   Create `frontend/.env` if you plan to use Appwrite authentication:
   ```env
   REACT_APP_APPWRITE_URL=your_appwrite_url
   REACT_APP_APPWRITE_PROJECT_ID=your_project_id
   ```

   **Note**: Currently, the app primarily uses MetaMask for authentication. Appwrite integration is commented out.

---

## 🏁 Getting Started

### Step 1: Start Local Hardhat Node

Open Terminal 1 and run:

```bash
cd Backend
npx hardhat node
```

This starts a local Ethereum node on `http://127.0.0.1:8545` with 20 test accounts pre-funded with ETH.

**Important**: Keep this terminal window open! Closing it will reset the blockchain state.

### Step 2: Deploy Smart Contract

Open Terminal 2 and run:

```bash
cd Backend
npx hardhat run scripts/deploy.js --network localhost
```

**Copy the deployed contract address** from the output (e.g., `0x5FbDB2315678afecb367f032d93F642f64180aa3`)

### Step 3: Update Contract Address in Frontend

Edit `frontend/src/EthereumF/UnCloud.json` and update the `contractAddress` field with your deployed address.

### Step 4: Configure MetaMask

1. Open MetaMask extension
2. Click on network dropdown → "Add Network" → "Add a network manually"
3. Enter the following:
   - **Network Name**: Localhost 8545
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 1337
   - **Currency Symbol**: ETH
4. Save and switch to "Localhost 8545" network

### Step 5: Import Test Account to MetaMask

1. From Terminal 1 (Hardhat node output), copy the **private key** of Account #0
2. In MetaMask: Click account icon → "Import Account" → Paste private key
3. You now have a test account with ETH to use

### Step 6: Start Frontend Development Server

Open Terminal 3 and run:

```bash
cd frontend
npm start
```

The React app will open automatically at `http://localhost:3000`

---

## 📖 Usage Guide

### Connecting Your Wallet

1. Navigate to the application
2. Click "Connect" or "Connect Wallet" in the sidebar
3. Approve MetaMask connection request
4. Your Ethereum address will be displayed

### Uploading Files

1. Navigate to **Upload** page
2. Click "Select Files" or drag and drop files
3. Click "Upload Files"
4. Approve MetaMask transaction (this stores file metadata on blockchain)
5. Wait for confirmation - file is encrypted and uploaded to IPFS

**Note**: Files are automatically encrypted with AES-256 before upload.

### Managing Your Files

1. Navigate to **Manage Files** page
2. View all your uploaded files
3. Click on file icon to download/decrypt
4. Click "Edit" to manage file sharing permissions

### Sharing Files

1. Go to **Manage Files**
2. Click "Edit" on the file you want to share
3. Enter the Ethereum address you want to share with
4. Click "Share"
5. Approve MetaMask transaction

### Accessing Shared Files

1. Navigate to **Received Files** page
2. View all files shared with your address
3. Click on file icon to download and decrypt

### Revoking Access

1. Go to **Manage Files** → Click "Edit"
2. Click on an address to toggle access (grant/revoke)
3. Approve MetaMask transaction

---

## 📁 Project Structure

```
UnCloud/
│
├── Backend/                      # Smart Contracts
│   ├── contracts/
│   │   └── Uncloud.sol          # Main smart contract
│   ├── scripts/
│   │   └── deploy.js            # Deployment script
│   ├── test/
│   │   └── test_Uncloud.js      # Contract tests
│   ├── hardhat.config.js        # Hardhat configuration
│   └── package.json
│
├── frontend/                     # React Application
│   ├── public/
│   │   ├── Images/              # App images
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Button.jsx
│   │   │   ├── File.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── page/                # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Upload.jsx
│   │   │   ├── FileList.jsx
│   │   │   └── ReceivedFiles.jsx
│   │   │
│   │   ├── ContextAPI/
│   │   │   └── Provider.js      # React Context for wallet state
│   │   │
│   │   ├── EthereumF/
│   │   │   └── UnCloud.json     # Contract ABI and address
│   │   │
│   │   ├── AESEncrDecr/
│   │   │   └── encryptDecrypt.js # Encryption utilities
│   │   │
│   │   ├── config/
│   │   │   └── auth.js          # Authentication config (Appwrite)
│   │   │
│   │   ├── App.js               # Main app component
│   │   ├── index.js             # Entry point
│   │   └── index.css            # Global styles
│   │
│   ├── tailwind.config.js       # Tailwind configuration
│   └── package.json
│
└── README.md                     # This file
```

---

## 🔐 Smart Contract Details

### Contract: `UnCloud.sol`

**Standard**: ERC721 (NFT) with URI Storage extension

### Key Functions

#### File Management
- `storeMetaData(tokenURI, name, secretKey)` - Upload file metadata
- `getMyData()` - Get all files owned by caller
- `getMySharedData()` - Get all files shared with caller

#### File Sharing
- `shareDataWith(allowedAddress, tokenId)` - Share file with address
- `getAllAddress(tokenId)` - Get all addresses with access to file
- `editAddressPermissions(account, metaId)` - Grant/revoke access

#### Access Control
- `canAccessMetaData(account, tokenId)` - Check if address can access
- `viewMetaData(tokenId)` - View file metadata (requires permission)

### Events
- Standard ERC721 events: `Transfer`, `Approval`, `ApprovalForAll`
- Metadata update events
