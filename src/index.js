import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { MetaMaskProvider } from "@metamask/sdk-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <MetaMaskProvider
    debug={false}
    sdkOptions={{
      checkInstallationImmediately: false,
      dappMetadata: {
        name: "Demo React App",
        url: window.location.host,
      },
    }}
  >
    <CssVarsProvider>
      <ChakraProvider>
        <CssBaseline />
        <App />
      </ChakraProvider>
    </CssVarsProvider>
  </MetaMaskProvider>
);
