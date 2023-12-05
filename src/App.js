import { utils } from "ethers";
import { NftProvider, useNft } from "use-nft";
import Nft from "./components/Nft";
import { useEffect, useState } from "react";
import { useSDK } from "@metamask/sdk-react";

import axios from "axios";
import AppBar from "./AppBar";
import Gallery from "./components/Gallery";
import BlogCard from "./components/BlogCard";
import "./css/index.css";
import Community from "./components/Community";

function App() {
  const perPage = 9;
  const [nfts, setNfts] = useState([]);
  const [showCount, setShowCount] = useState(perPage);
  const [address, setAddress] = useState("");
  const [errorMessageText, setErrorMessageText] = useState("");
  const [startToken, setStartToken] = useState("");
  const [location, setLocation] = useState("gallery");

  useEffect(() => {
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_alchemy_api_key}/getNFTsForCollection`;
    const withMetadata = true;
    const perPage = 9;
    if (!utils.isAddress(address) && address != "") {
      setErrorMessageText("Invalid address");
      setNfts(null);
    } else {
      if ((nfts == null || nfts.length < showCount) && address != "") {
        var config = {
          method: "get",
          url: `${baseURL}?contractAddress=${address}&withMetadata=${withMetadata}&startToken=${startToken}`,
          headers: {},
        };
        axios(config)
          .then((response) => {
            setErrorMessageText("");
            setNfts([...nfts, ...response.data.nfts]);
            setStartToken(
              response.data.nfts[response.data.nfts.length - 1].id.tokenId
            );
          })
          .catch((error) => setErrorMessageText(error.message));
      }
    }
  }, [showCount, address]);

  return (
    <>
      <AppBar location={location} setLocation={setLocation} />
      {location === "gallery" && (
        <Gallery
          address={address}
          setAddress={setAddress}
          errorMessageText={errorMessageText}
          nfts={nfts}
          showCount={showCount}
          setShowCount={setShowCount}
          perPage={perPage}
        />
      )}

      {location === "community" && <Community />}

      {location === "about" && <div>About</div>}
    </>
  );
}

export default App;
