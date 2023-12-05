import { utils } from "ethers";
import { NftProvider, useNft } from "use-nft";
import Nft from "./Nft";
import { useEffect, useState } from "react";

import axios from "axios";
import {
  Container,
  GridItem,
  SimpleGrid,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import AppBar from "../AppBar";

const Gallery = (props) => {
  const {
    address,
    setAddress,
    errorMessageText,
    nfts,
    showCount,
    setShowCount,
    perPage,
  } = props;
  return (
    <>
      <Container maxWidth={1200}>
        <Text
          fontSize="4xl"
          fontWeight="bold"
          marginBottom="4"
          textAlign="center"
        >
          Nft Gallery
        </Text>
        <FormControl marginBottom={4}>
          <FormLabel fontWeight={700} htmlFor="email">
            Contract-address
          </FormLabel>
          <Input
            id="email"
            type="email"
            value={address}
            onChange={(val) => {
              setAddress(val.target.value);
            }}
          />
        </FormControl>
        {errorMessageText ? (
          <Alert show={errorMessageText} status="error">
            <AlertIcon />
            {errorMessageText}
          </Alert>
        ) : (
          <></>
        )}
        <SimpleGrid columns={[2, null, 3]} gap={6}>
          {nfts && nfts.length > 0
            ? nfts.slice(0, showCount).map((nft, key) => (
                <GridItem key={key}>
                  <Nft
                    title={nft.title}
                    address={nft.contract.address}
                    id={parseInt(nft.id.tokenId, 16)}
                    image={nft.media[0].gateway}
                    data={nft}
                  />
                </GridItem>
              ))
            : null}
        </SimpleGrid>
      </Container>
      <Container marginTop="4" centerContent>
        {nfts && nfts.length > 0 ? (
          <Button
            align="center"
            onClick={() => {
              setShowCount(showCount + perPage);
            }}
          >
            Load more
          </Button>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default Gallery;
