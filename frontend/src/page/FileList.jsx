import { useEffect, useState } from "react";
import UnCloud from "../EthereumF/UnCloud.json";
import { useNavigate } from "react-router-dom";
import File from "../components/File";
import Button from "../components/Button";

function FileList() {
  const ethers = require("ethers");
  const navigator = useNavigate();

  const [myFiles, setmyFiles] = useState([]);

  const getMyFiles = async (Signer) => {
    try {
      const contractInstance = new ethers.Contract(
        UnCloud.contractAddress,
        UnCloud.abi,
        Signer
      );

      const result = await contractInstance.getMyData();

      setmyFiles(result);

      console.log(Array.from(result));
    } catch (error) {
      console.log("error while fetching data");
    }
  };

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("MetamaskCredientials")) {
        const Provider = new ethers.BrowserProvider(window.ethereum);
        const Signer = await Provider.getSigner();
        getMyFiles(Signer);
      } else {
        alert("Connect To metamask");
        navigator("/");
      }
    })();

    window.ethereum.on("accountsChanged", async () => {
      const Provider = new ethers.BrowserProvider(window.ethereum);
      const Signer = await Provider.getSigner();
      getMyFiles(Signer);
    });
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold gradient-text mb-2">My Files</h1>
        <p className="text-gray-600">Manage and share your uploaded files</p>
      </div>

      {myFiles.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {myFiles.map((file, i) => (
            <File key={i} file={file} />
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-12 text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="bx bx-folder-open text-5xl text-gray-400"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Files Uploaded</h3>
          <p className="text-gray-500 mb-6">Start uploading files to see them here</p>
          <Button variant="primary" onClick={() => window.location.href = '/upload'}>
            Upload Files
          </Button>
        </div>
      )}
    </div>
  );
}

export default FileList;
