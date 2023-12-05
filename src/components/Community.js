import BlogCard from "./BlogCard";
import Button from "@mui/joy/Button";
import { useEffect, useState } from "react";
import { TuiEditor } from "./tuiEditor/TuiEditor";
import { useSDK } from "@metamask/sdk-react";
import CommunityApiService from "../apiServices/communityApiService.ts";
import { Image } from "@chakra-ui/react";

const Community = (props) => {
  const [create, setCreate] = useState(false);
  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const sessionSearch = window.sessionStorage.getItem("address");
  const [account, setAccount] = useState(sessionSearch || "");
  const [articles, setArticles] = useState([]);

  const connect = async () => {
    try {
      setCreate(true);
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  useEffect(() => {
    window.sessionStorage.setItem("address", account);
  }, [account]);

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getArticles()
      .then((data) => setArticles(data))
      .catch((err) => console.log(err));
  }, [create]);

  return (
    <div className="community_page">
      <div className="container">
        <div className="flex_end">
          {!create && (
            <Button
              size="md"
              variant={"outlined"}
              color="primary"
              onClick={() => setCreate(true)}
            >
              Create +
            </Button>
          )}
        </div>
        {create ? (
          account ? (
            <TuiEditor setCreate={setCreate} account={account} />
          ) : (
            <>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
                boxSize={"500px"}
                onClick={connect}
                cursor={"pointer"}
              />
            </>
          )
        ) : (
          <div className="wrap">
            {articles.map((article) => {
              return <BlogCard article={article} />;
            })}
            ;
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
